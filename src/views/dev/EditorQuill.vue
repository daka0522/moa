<template>
  <div id="editor-quill">
    <form id="firestoreDB">
      <!-- Collection -->
      <div>
        <label for="collection">Collection Name</label>
        <select
          id="collection"
          v-model="collectionName"
        >
          <option
            disabled
            value=""
          >
            Please select one
          </option>
          <option
            v-for="item in this.$root.collections.list"
            :key="item"
          >
            {{ item }}
          </option>
          <option value="createNew">
            + Create New Collection
          </option>
        </select>
        <input
          v-if="collectionName === 'createNew'"
          placeholder="Collection Name"
        >
      </div>
      <!-- Document ID  -->
      <div>
        <label for="docID">Document ID</label>
        <select
          id="docID"
          v-model="docID"
        >
          <option
            disabled
            value=""
          >
            Please select one
          </option>
          <option
            v-for="item in docs"
            :key="item"
            :value="item"
          >
            {{ item }}
          </option>
          <option value="createNew">
            + Create New
          </option>
        </select>
        <input
          v-if="docID === 'createNew' | !''"
          v-model="docID"
          placeholder="Doument ID"
        >
      </div>
      <!-- Doc data fields -->
      <div>
        <label for="docField">Document Fields</label>
        <select
          id="docField"
          v-model="docField"
        >
          <option
            disabled
            value=""
          >
            Please select one
          </option>
          <option
            v-for="item in Object.keys(docData)"
            :key="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div v-if="docField.length > 0">
        <label for="docTitle">Document Title</label>
        <select
          id="docTitle"
          v-model="docTitle"
        >
          <option
            disabled
            value=""
          >
            Please select one
          </option>
          <option
            v-for="item in docData[docField]"
            :key="item.title"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
      <!-- <input v-model="docData.additional" placeholder="Additional"> -->
    </form>

    <!-- Doc title and buttons -->
    <div class="doc-panel-title">
      <div class="doc-title">
        <!-- <label>Document Title</label> -->
        <input
          v-model="docTitle"
          placeholder="Document Title"
        >
      </div>
      <div class="btns">
        <button
          class="btn"
          type="submit"
          @click.prevent="saveDoc()"
        >
          <i class="fas fa-save" />Save
        </button>
        <button
          v-if="!isDeletable"
          class="btn"
          @click.prevent="isDeletable = true"
        >
          <i class="fas fa-trash" />Delete
        </button>
        <div v-else>
          <button
            class="btn"
            :class="{deleteBtn: isDeletable}"
            type="submit"
            @click.prevent="deleteDoc()"
          >
            Yes
          </button>
          <button
            class="btn"
            @click.prevent="isDeletable = false"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <span class="noticeMsg">{{ stateMsg }}</span>
    <div id="docViewer">
      <div
        id="docRender"
        class="panel"
        :class="{themeDark: isDarkTheme}"
      >
        <div>
          <span>Document HTML Render</span>
          <button
            class="btn"
            style="float: right;"
            @click="isDarkTheme = !isDarkTheme"
          >
            Theme
          </button>
        </div>
        <h1>{{ docTitle }}</h1>
        <article v-html="docContent" />
      </div>

      <quill-editor
        ref="myQuillEditor"
        v-model="docContent"
        :options="editorOption"
      />
      
      
      <div class="panel">
        <span>Doc content</span>
        <textarea v-model="docContent" />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      firestore: this.$root.firebase.firestore,
      db: this.$root.firebase.firestore(),
      editorOption: {
        placeholder: "Please write down the content.",
      },

      collectionName: "",
      docID: '',
      docField: '',
      docTitle: "",
      docContent: '',
      
      docs: [],
      docData: new Object,
      
      stateMsg: '',
      isDeletable: false,

      currentDoc: new Object,

      isDarkTheme: false
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },

    
  },
  
  watch: {
    docID(newValue) {
      newValue
      if (this.docs.includes(newValue)) {
        this.getDoc(this.collectionName, newValue)
      }
      
    },

    docTitle(newValue) {
      this.currentDoc = this.docData[this.docField].find(elem => elem.title === newValue)
      this.docContent = this.currentDoc.content
    },
    collectionName(newValue) {
      this.listAllDoc(newValue)

    },

    $event(nv, ov) {
      // console.log(ov);
      // console.log(nv);
      
    }
  },
  mounted() {
  },
  methods: {
    saveDoc() {
      if (this.docTitle && this.docContent) {
        const docRef = this.db.collection(this.collectionName).doc(this.docID)


        docRef.get().then(snapshot => {
            // If there's alreay doc exists update doc.
            if (snapshot.exists) {
              let currentDoc = new Object
              currentDoc.title = this.docTitle
              currentDoc.content = this.docContent
              let data = new Object
              data[this.docField] = this.firestore.FieldValue.arrayUnion(currentDoc)

              docRef.update(data).then(() => {
                // this.stateMsg = "Doc is successfully updated."
              })
            } /* else {
              // Else create new doc.
              docRef.set({
                
              }).then(() => {
                this.stateMsg = "Doc is successfully created."
              })
            } */
          })
          .then(function () {
            // console.log("Document successfully written!")
            this.stateMsg = "Document successfully written!"
          })
          .catch(function (err) {
            // console.error("Error writing document: ", err)
          })
      } else {
        // console.warn("The title and content is empty. This document is not saved.")
      }
    },
    

    deleteDoc() {
      // const docIndex = this.docs.findIndex(item => item.id === this.docID)

      const docRef = this.db.collection(this.collectionName).doc(this.docID)

      let data = new Object 
      data[this.docField] = this.firestore.FieldValue.arrayRemove(this.currentDoc)

      docRef.update(
        data
      )

      /* .delete().then(() => {
        this.docs.splice(docIndex, 1)
        // console.log(this.docID, "Document successfully deleted!")
        // this.stateMsg = "Document successfully deleted!"

      }).catch(error => {
        // this.stateMsg = "Error removing document: "
        // console.log("Error removing document: ", error)
      }) */

    },


    listAllDoc(collectionName) {
      if (collectionName) {
        this.docs = []
        this.db.collection(collectionName).get().then(
            snapshot => {
              snapshot.forEach(doc => {
                // console.log("read successfully");
                
                this.docs.push(doc.id)
              });


            }
          )
          .catch(err => {
            // console.log('Error getting documents', err);
          })
      }
    },
    listDoc(collectionName) {
      if (collectionName) {
        const container = new Object
        container[collectionName] = new Object

        this.db.collection(collectionName).get().then(
          snapshot => {
            snapshot.forEach(doc => {
              container[collectionName][doc.id] = doc.data() 
              // container[collectionName].docData = doc.data()
              this.dataLists.push(container)
              // console.log("List Doc")
            })
          }
        )
      }
    },


    getDoc(collectionName, docID) {
      if (collectionName && docID) {
        this.db.collection(collectionName).doc(docID).get().then(
          doc => {
            if (doc.exists) {
              this.docData = doc.data()
              // console.log("document data:", doc.data())
            } else {
              // console.log("No such document!")
            }
          }
        ).catch(err => {
          // console.log("Error getting document:", err);
        })
      }
    },

    /* readDoc(collectionName, docID) {
      this.dataLists.find(elem => elem[collectionName])

    } */


  },



}
</script>

<style scoped>

textarea {
  width: 100%;
  height: 15em;
}

section {
  box-shadow: 0 0 .5em .1em rgb(202, 202, 202);
  padding: 1em;
  min-height: 10em;
}

.title-input {
  width: 97%;
  padding: 12px 15px 12px 15px;
  margin-bottom: 1em;
}

.data-model {
  margin-bottom: 1em;
  display: flex;
  justify-content:space-around;
}

#docViewer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em ,1fr));
  column-gap: 1.6em;
}

select {
  width: 90%;
}

#firestoreDB {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  column-gap: 1.6em;
  /* place-items: center; */
  
}

.deleteBtn {
  background-color: red;
  color: white;
}

.btns{
  display: flex;
  flex-wrap: wrap;
}

.doc-panel-title {

  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-items: center;
  align-items: center;
}
.doc-title {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.doc-title input {
  width: 100%;
}

.themeDark {
  background-color: rgba(0, 0, 0, .7);
  color: white;
}

#editor-quill {
  display: block;
  width: 90%;
  margin: auto;
}
</style>
