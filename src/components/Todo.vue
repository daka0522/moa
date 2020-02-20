<template>
  <div id="todo">
    <transition name="fade">
      <span id="mainStatePanel" class="msg">{{ mainStateMsg }}</span>
    </transition>

    <!-- Todo input  -->
    <transition name="fade">
      <form class="todo-input panel">
        <input v-model="newDoc.content" class="content-area input-part" type="text" placeholder="Please write down things to do here!" @keyup.enter="saveNewDoc(); newDoc.content=''">
        <button v-show="newDoc.content" class="btn" type="submit" @click.prevent="saveNewDoc(); newDoc.content=''">
          <fa-i icon="save" /><span>Save</span>
        </button>
      </form>
    </transition>

    <!-- Todo list options -->
    <div v-show="docs.length" id="todo-options" class="panel-sub">
      <span>Options</span>
      <button class="btn-delete" @click="deleteAll()">
        <fa-i icon="trash" />
        Delete All!
      </button>
    </div>

    <!-- Main todo list  -->
    <transition-group tag="ol" name="list" class="todo-list">
      <li class="todo-card panel" v-for="doc in docs" :key="doc.id">
        <!-- 1. Date -->
        <span class="todo-card-date">{{ doc.fields.date.toDate().toLocaleString() }}</span>

        <!-- 2. Content -->
        <div class="todo-card-content">
          <p v-if="!doc.fields.editable" :class="{isDone: doc.fields.isDone, contentText: true}">
            {{ doc.fields.content }}
          </p>
          <textarea v-else v-model="doc.fields.content" class="input-part" />
          </div>

          <!-- 3. State  -->
          <!-- <span
            v-show="doc.stateMsg"
            class="todo-card-msg noticeMsg statePanel"
          >{{ doc.stateMsg }}</span> -->

          <!-- 4. Buttons  -->
          <div class="todo-card-btns">
            <button
              v-show="!doc.fields.editable"
              class="btn"
              :class="{toggle: doc.fields.isDone}"
              @click="doneButton(doc)"
            >
              <fa-i icon="check" /><span>Done</span>
            </button>

            <button
              v-show="!doc.fields.editable"
              class="btn edit-btns"
              @click="doc.fields.editable = !doc.fields.editable"
            >
              <fa-i icon="pencil-alt" /><span>Edit</span>
            </button>

            <div
              v-show="doc.fields.editable"
              class="edit-btns"
              style=": right;"
            >
              <button
                class="btn"
                @click="doc.fields.editable = !doc.fields.editable"
              >
                <fa-i icon="undo" />
              </button>
              <button
                class="btn-delete"
                @click="deleteDoc(doc)"
              >
                <fa-i icon="trash" /><span>Delete</span>
              </button>
              <button
                class="btn"
                @click.prevent="editSaveButton(doc)"
              >
                <fa-i icon="save" /><span>Save</span>
              </button>
            </div>
          </div>
        </li>
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
  computed: {
    // # Imported utils
    colRef,
    getUserID,
  },

  watch: {
    mainStateMsg() {
      setTimeout( () => {this.mainStateMsg = ''}, 5000)
    },
  },
  mounted() {
    if (this.$root.account.currentUser) {
      this.listAllDoc()
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

  }
}
</script>

<style scoped lang="scss">
/* A. Todo input */
.todo-input {
  margin: 4.8em 0 4.8em 0;
  display: flex;

  input {
    width: 100%;
    font-size: 1rem;
  }
}

/* B. Todo Options */
#todo-options {
  text-align: right;
  font-size: small;
  border-radius: .5em;
}

/* C. Todo list */
.todo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  grid-gap: 1.6em;
  list-style: none;
  padding: 0;

  .todo-card {
    display: grid;
    grid-template-rows: .25fr 1.5fr .5fr;
    grid-row-gap: 1rem;

    // 1. Date
    &-date {
      color: rgba(0, 0, 0, .5);
      font-size: .9em;
      font-weight: lighter;
      text-align: right;
    }

    // 2. Content 
    &-content {

      display: flex;
      flex-wrap: wrap;
      width: 100%;
      // margin: 6.85vh 0;
      // height: 100%;

      textarea {
        width: 100%;
        font-size: 1rem;
        resize: none;
      }
      .contentText {
        font-weight: bold;
        font-size: 1.6em;
      }
      /* Action & events  */
      .isDone {
        color: rgba(0, 0, 0, .75);
        text-decoration: line-through;
        font-weight: lighter;

        &::before {
          content: "\2713";
          display: inline-block;
          color: rgb(20, 140, 0);
          font-size: 1.6em;
          margin-right: .2em;
        }
      }
    }
    // 3. Buttons
    &-btns {
    }
  }


}
/* Buttons */
.btns {
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
}

.toggle {
  background: rgba(100, 100, 100, .1);
  color: rgba(0, 0, 0, .25);
  box-shadow: 0 0 .5em .1em rgba(128, 128, 128, 0.466) inset;
}

.btn span::before {
  content: '  ';
  white-space: pre;
}


/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active below version 2.1.8 */
  {
  opacity: 0;
  transform: translateY(30px);
}

/* Todo Main Options */
#todo-main-options {
  justify-content: flex-end;
  align-items: center;
}
</style>