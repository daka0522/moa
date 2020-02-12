<template>
  <div id="todo">
    <transition name="fade">
      <span id="mainStatePanel" class="noticeMsg">{{mainStateMsg}}</span>
    </transition>

    <transition name="fade">
      <form class="todo-input panel">
        <input class="content-area input-part" type="text" v-model="newDoc.content"
          placeholder="Please write down things to do here!" v-on:keyup.enter="saveNewDoc(); newDoc.content=''">
        <button class="btn" v-show="newDoc.content" type="submit" @click.prevent="saveNewDoc(); newDoc.content=''"><i
            class="fas fa-save"></i><span>Save</span></button>
      </form>
    </transition>

    <div id="todo-main-options" class="sub-panel" v-show="docs.length">
      <span>Options</span>
      <button id="btn-deleteAll" class="btn" @click="deleteAll()">Delete All!</button>
    </div>

    <transition-group name="list" class="todo-list">
      <ol class="panel todo-card" v-for="doc in docs" :key="doc.id">
        <span class="subInfo">{{doc.fields.date.toDate().toLocaleString()}}</span>
        <div class="content-area">
          <li v-if="!doc.fields.editable" :class="{isDone: doc.fields.isDone, todoContent: true}">{{doc.fields.content}}
          </li>
          <textarea v-else v-model="doc.fields.content" autofocus></textarea>
        </div>
        <span id="statePanel" class="noticeMsg" v-show="doc.stateMsg">{{doc.stateMsg}}</span>
        <div class="btns">
          <button class="btn" :class="{toggle: doc.fields.isDone}" v-show="!doc.fields.editable"
            @click="doneButton(doc)"><i class="fas fa-check"></i><span>Done</span></button>
          <button class="btn edit-btns" v-show="!doc.fields.editable"
            @click="doc.fields.editable = !doc.fields.editable"><i
              class="fas fa-pencil-alt"></i><span>Edit</span></button>
          <div class="edit-btns" v-show="doc.fields.editable" style=": right;">
            <button class="btn" @click="doc.fields.editable = !doc.fields.editable"><i
                class="fas fa-undo "></i></button>
            <button class="btn deleteBtn" @click="deleteDoc(doc)">
              <i class="fas fa-trash "></i><span>Delete</span></button>
            <button class="btn" @click.prevent="editSaveButton(doc)"><i
                class="fas fa-save"></i><span>Save</span></button>
          </div>
        </div>
      </ol>
    </transition-group>

  </div>
</template>

<script>
import {colRef, getUserID} from '@/utils/firestoreUtils'

export default {
  data() {
    return {
      // Database Refrence of this app
      appName: 'todo',
      // docID: 'todo',

      mainStateMsg: '',

      docs: [],

      newDoc: {
        content: '',
        isDone: false
      }
    }
  },
  methods: {

    // CRUD (Create, Read, Update, Delete)    
    // 1. Create
    saveNewDoc() {
      // Create new document.
      if (this.newDoc.content) {

        // Construct datas to save.
        let doc = new Object 
        // Date is saved as a firestore timestamp object 
        const date = this.$root.firebase.firestore.Timestamp.fromDate(new Date)
        // Document name will saved as a milliseconds
        doc.id = date.toMillis().toString()
        doc.fields = {
          content: this.newDoc.content,
          date: date,
          isDone: this.newDoc.isDone
        }

        // Check if the user is signed in and save in web DB.
        if (this.$root.account.currentUser) {
          this.colRef.doc(doc.id).set(doc.fields)
            .then(() => {
              this.mainStateMsg = "Document successfully written!"
              this.pushDoc(doc)
            })
            .catch(function (error) {
              this.mainStateMsg = `Error writing document: ${error}`
            })
        }
        // Else data will not saved. Just list doc.
        else {
          this.mainStateMsg = 'The data will not saved. Just list doc.'
          this.pushDoc(doc)
        }
      } else {
        this.mainStateMsg = "The content is empty. This document is not saved."
      }
    },

    // 2. Read
    // Initial function when the instance is mounted call lists from firestore.
    // Require: Authenticated
    listAllDoc() {
      this.colRef.get().then(
          snapshot => {
            let subject = ''
            snapshot.size > 1 ? subject = "Document's are" : subject = "Document is"
            snapshot.forEach(doc => {
              this.pushDoc(doc)
              this.mainStateMsg = `${subject} successfully downloaded.`
            });
          }
        )
        .catch(err => {
          // this.mainStateMsg = `Error getting documents. ${err.message}`
          this.mainStateMsg = `Error getting documents. ${err}`
        })
    },
    // Request list an individual existing doc.
    // Require: Authenticated
    listDoc(docID) {
      this.colRef.doc(docID).get().then(
        doc => {
          if (doc.exists) {
            this.stateMsg = "Listed document successfully!"
            this.pushDoc(doc)
          } else {
            this.stateMsg = "No such document!"
          }
        }
      ).catch(err => {
        this.stateMsg =`Error getting document: ${err.message}` 
      })
    },

    // 3. Update
    updateDoc(doc) {
      // Update edited date.
      // doc.fields.date = this.$root.firebase.firestore.Timestamp.fromDate(new Date)
      let data = {
          content: doc.fields.content,
          date: this.$root.firebase.firestore.Timestamp.fromDate(new Date),
          isDone: doc.fields.isDone
      }
      // Post update doc to firestore
      // If the user is logined.
      if (this.$root.account.currentUser) {
        this.colRef.doc(doc.id).update(data).then(() => {
            this.docStateMsg(doc, "This is successfully updated.")
          }).catch(error => {
            this.docStateMsg(doc, `Error while updating the doc. ${error.message}`)
          })
      } else {
        Object.assign(doc.fields, data)
        this.docStateMsg(doc, "This is successfully updated.")
      }
    },

    // 4. Delete
    // Delete the selected doc.
    deleteDoc(doc) {
      const docIndex = this.docs.findIndex(item => item.id === doc.id)
      // If the user is logined.
      if (this.$root.account.currentUser) {
        this.colRef.doc(doc.id).delete().then(() => {
          this.docStateMsg(doc, "This document is successfully deleted!")
          this.docs.splice(docIndex, 1)
        }).catch(error => {
          this.docStateMsg(doc, `Error removing document: ${error.message}`)
        })
      } else {
        // Else user is none.
        this.docs.splice(docIndex, 1)
        this.docStateMsg(doc, "This document is successfully deleted!")
      }
    },
    deleteAll() {
      if (this.$root.account.currentUser) {
        this.docs.forEach( doc => {
          this.colRef.doc(doc.id).delete().then( () => {
            this.docs = []
          })
        })   
      } else {
        this.docs = []
      }
    },
  

    // Helper function to store docs in an object.
    pushDoc(doc) {
      let cont = new Object
      cont["id"] = doc.id
      // Check if the doc is from web database or local memory.
      if (doc.data) {
        cont["fields"] = doc.data() 
      } else {
        cont['fields'] = doc.fields
      }
      cont['fields']['editable'] = false
      cont['stateMsg'] = ''
      this.docs.push(cont)
    },
    doneButton(doc) {
      doc.fields.isDone = !doc.fields.isDone
      this.updateDoc(doc)
      this.docStateMsg(doc, "I am done!!")
    },
    editSaveButton(doc) {
      this.updateDoc(doc)
      doc.fields.editable = false
    },
    docStateMsg(doc, msg) {
      doc.stateMsg = msg
      setTimeout(() => {
        doc.stateMsg = null
      }, 5000)
    }

  },
  computed: {
    // # Imported utils
    colRef,
    getUserID,
  },
  mounted() {
    if (this.$root.account.currentUser) {
      this.listAllDoc()
    }
  },

  watch: {
    mainStateMsg() {
      setTimeout( () => {this.mainStateMsg = ''}, 5000)
    },
  }
}
</script>

<style scoped lang="scss">
/* Common css */
input {
    width: 100%;
}
.subInfo {
    color:   rgba(0, 0, 0, .5);
    font-size: .9em;
    font-weight: lighter;
    text-align: right;
}



/* Panels design */
.todo-input {
    margin: 4.8em 0 4.8em 0;
}

.todo-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
    grid-gap: 1.6em;
}

/* Todo list */
.todo-list .todo-card {
    display: grid;
    grid-template-rows: .25fr 2fr .5fr;
    grid-row-gap: 1.6em;
}

.content-area {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

}
.content-area textarea {
    width: 100%;
    /* height: auto; */
    font-size: 1.6em;
    resize: none;
}

.content-area li {
    font-weight: bold;
    font-size: 1.6em;
}

/* Action & events  */
.content-area .isDone {
    color:   rgba(0, 0, 0, .75);
    text-decoration: line-through;
    font-weight: lighter;
}
.isDone::before {
    content: "\2713";
    display:inline-block;
    color: rgb(20, 140, 0);
    font-size: 1.6em;
    margin-right: .2em;
}

/* Buttons */

.btns {
    display: flex;
    flex-wrap: wrap;
    align-self: flex-end;
}

.btn:active {
    background-color: rgb(20, 140, 0);
    color: white;
}

.toggle {
    background:rgba(100, 100, 100, .1);
    color: rgba(0, 0, 0, .5);
}

#btn-deleteAll, .deleteBtn {
    background-color: red;
    color: white;
}

.btn span::before {
    content: '  ' ;
    white-space: pre;
}


/* Transitions */
.fade-enter-active, .fade-leave-active{
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

/* Todo Main Options */
#todo-main-options {
  justify-content: flex-end;
  align-items: center;
}
</style>