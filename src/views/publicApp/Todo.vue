<template>
  <div id="todo-view">
    <header-unit header-title="Todo">
      <p>
        This app is a simple todo list manage app. You can add todo list and
        clear it.
      </p>
    </header-unit>

    <state-msger v-if="!$store.state.currentUser" state="warning">
      <h2>Demo version.</h2>
      <span> Data will not saved if you are not logined.</span>
      <p>If you want to use this app and save your list. Please sign in.</p>
      <router-link to="/signin"> Sign in </router-link>
    </state-msger>

    <div id="todo">
      <transition name="fade">
        <span id="mainStatePanel" class="msg">{{ mainStateMsg }}</span>
      </transition>

      <!-- Todo input  -->
      <transition name="fade">
        <form class="todo-input panel">
          <input
            v-model="newDoc.content"
            class="content-area input-part"
            type="text"
            placeholder="Please write down things to do here!"
            @keyup.enter="saveNewDoc()"
          />
          <button class="btn" type="submit" @click.prevent="saveNewDoc()">
            <IconPicker icon="save" />
            <span>Save</span>
          </button>
        </form>
      </transition>

      <!-- Todo list options -->
      <div v-show="docs.length" id="todo-options" class="panel-sub">
        <span>Options</span>
        <button class="btn-delete" @click="deleteAll()">
          <IconPicker icon="trash" />
          Delete All!
        </button>
      </div>

      <!-- Main todo list  -->
      <transition-group tag="ol" name="list" class="todo-list">
        <li v-for="doc in docs" :key="doc.id" class="todo-card panel">
          <!-- 1. Date -->
          <span class="todo-card-date">{{
            doc.fields.date.toDate().toLocaleString()
          }}</span>

          <!-- 2. Content -->
          <div class="todo-card-content">
            <p
              v-if="!doc.fields.editable"
              :class="{ isDone: doc.fields.isDone, contentText: true }"
            >
              {{ doc.fields.content }}
            </p>
            <textarea v-else v-model="doc.fields.content" class="input-part" />
          </div>

          <!-- 3. State  -->
          <span
            v-show="doc.stateMsg"
            class="todo-card-msg noticeMsg statePanel"
            >{{ doc.stateMsg }}</span
          >

          <!-- 4. Buttons  -->
          <div class="todo-card-btns">
            <button
              v-show="!doc.fields.editable"
              class="btn"
              :class="{ toggle: doc.fields.isDone }"
              @click="doneButton(doc)"
            >
              <IconPicker icon="check" /><span>Done</span>
            </button>

            <button
              v-show="!doc.fields.editable"
              class="btn edit-btns"
              @click="doc.fields.editable = !doc.fields.editable"
            >
              <IconPicker icon="pencil-alt" />
              <span>Edit</span>
            </button>

            <div v-show="doc.fields.editable" class="edit-btns" style=":right ">
              <button
                class="btn"
                @click="doc.fields.editable = !doc.fields.editable"
              >
                <IconPicker icon="undo" />
              </button>
              <button class="btn-delete" @click="deleteDoc(doc)">
                <IconPicker icon="trash" /><span>Delete</span>
              </button>
              <button class="btn" @click.prevent="editSaveButton(doc)">
                <IconPicker icon="save" /><span>Save</span>
              </button>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { getUserID } from "../../utils/firestoreUtils"
import { defineComponent, getCurrentInstance, ref } from "vue"
import { useStore } from "vuex"

type Doc = {
  id: string
  fields: {
    content: string
    // date: firebase.default.firestore.Timestamp
    date: any
    isDone: boolean
    editable?: boolean
  }
  stateMsg?: string
}

export default defineComponent({
  setup() {
    const store = useStore()
    const appName = "todo"
    const mainStateMsg = ref("")
    const docs = ref([])
    const newDoc = ref({
      content: "",
      isDone: false,
    })

    const insternalInstance = getCurrentInstance()
    console.log("insternalInstance: ", insternalInstance)
    console.log("this: ", this)

    // return { mainStateMsg, docs, newDoc, appName }
  },
  data() {
    return {
      // Database Refrence of this app
      appName: "todo",
      // docID: 'todo',

      mainStateMsg: "",

      docs: [] as Doc[],

      newDoc: {
        content: "",
        isDone: false,
      },
    }
  },
  computed: {
    // # Imported utils
    colRef() {
      if (this.$store.state.currentUser) {
        return this.$db
          .collection("user")
          .doc(this.getUserID)
          .collection(this.appName)
      } else {
        return null
      }
    },
    getUserID,
  },
  watch: {
    mainStateMsg() {
      setTimeout(() => {
        this.mainStateMsg = ""
      }, 5000)
    },
  },
  mounted() {
    console.log("user Id from todo: ", getUserID())

    // if (this.$root.account.currentUser) {
    //   this.listAllDoc()
    // }
  },
  methods: {
    // CRUD (Create, Read, Update, Delete)
    // 1. Create
    saveNewDoc() {
      // Create new document.
      if (this.newDoc.content) {
        // Construct datas to save.
        // Date is saved as a firestore timestamp object
        const date = this.$firebase.firestore.Timestamp.fromDate(new Date())
        // Document name will saved as a milliseconds
        let doc: Doc = {
          id: date.toMillis().toString(),
          fields: {
            content: this.newDoc.content,
            date: date,
            isDone: this.newDoc.isDone,
          },
        }

        // Check if the user is signed in and save in web DB.
        if (this.$store.state.currentUser && this.colRef) {
          this.colRef
            .doc(doc.id)
            .set(doc.fields)
            .then(() => {
              this.mainStateMsg = "Document successfully written!"
              this.pushDoc(doc)
            })
            .catch((error: Error) => {
              this.mainStateMsg = `Error writing document: ${error}`
            })
        }
        // Else data will not saved. Just list doc.
        else {
          this.mainStateMsg = "The data will not saved. Just list doc."
          this.pushDoc(doc)
        }
      } else {
        this.mainStateMsg = "The content is empty. This document is not saved."
      }
      this.newDoc.content = ""
    },

    // 2. Read
    // Initial function when the instance is mounted call lists from firestore.
    // Require: Authenticated
    listAllDoc() {
      if (this.colRef)
        this.colRef
          .get()
          .then((snapshot) => {
            let subject = ""
            snapshot.size > 1
              ? (subject = "Document's are")
              : (subject = "Document is")
            snapshot.forEach((doc) => {
              this.pushDoc(doc)
              this.mainStateMsg = `${subject} successfully downloaded.`
            })
          })
          .catch((err: Error) => {
            // this.mainStateMsg = `Error getting documents. ${err.message}`
            this.mainStateMsg = `Error getting documents. ${err}`
          })
    },
    // Request list an individual existing doc.
    // Require: Authenticated
    listDoc(docID: Doc["id"]) {
      if (this.colRef)
        this.colRef
          .doc(docID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.mainStateMsg = "Listed document successfully!"
              this.pushDoc(doc)
            } else {
              this.mainStateMsg = "No such document!"
            }
          })
          .catch((err) => {
            this.mainStateMsg = `Error getting document: ${err.message}`
          })
    },

    // 3. Update
    updateDoc(doc: Doc) {
      // Update edited date.
      // doc.fields.date = this.$root.firebase.firestore.Timestamp.fromDate(new Date)
      let data = {
        content: doc.fields.content,
        date: this.$firebase.firestore.Timestamp.fromDate(new Date()),
        isDone: doc.fields.isDone,
      }
      // Post update doc to firestore
      // If the user is logined.
      if (this.$store.state.currentUser && this.colRef) {
        this.colRef
          .doc(doc.id)
          .update(data)
          .then(() => {
            this.docStateMsg(doc, "This is successfully updated.")
          })
          .catch((error) => {
            this.docStateMsg(
              doc,
              `Error while updating the doc. ${error.message}`
            )
          })
      } else {
        Object.assign(doc.fields, data)
        this.docStateMsg(doc, "This is successfully updated.")
      }
    },

    // 4. Delete
    // Delete the selected doc.
    deleteDoc(doc: Doc) {
      const docIndex = this.docs.findIndex((item: Doc) => item.id === doc.id)
      // If the user is logined.
      if (this.$store.state.currentUser && this.colRef) {
        this.colRef
          .doc(doc.id)
          .delete()
          .then(() => {
            this.docStateMsg(doc, "This document is successfully deleted!")
            this.docs.splice(docIndex, 1)
          })
          .catch((error) => {
            this.docStateMsg(doc, `Error removing document: ${error.message}`)
          })
      } else {
        // Else user is none.
        this.docs.splice(docIndex, 1)
        this.docStateMsg(doc, "This document is successfully deleted!")
      }
    },
    deleteAll() {
      if (this.$store.state.currentUser) {
        this.docs.forEach((doc: Doc) => {
          if (this.colRef)
            this.colRef
              .doc(doc.id)
              .delete()
              .then(() => {
                this.docs = []
              })
        })
      } else {
        this.docs = []
      }
    },

    // Helper function to store docs in an object.
    pushDoc(
      doc:
        | Doc
        // | firebase.default.firestore.DocumentSnapshot<firebase.default.firestore.DocumentData>
        | any
    ) {
      let cont: Doc = {
        id: doc.id,
        fields: {},
        stateMsg: "",
      }
      // Check if the doc is from web database or local memory.
      if (doc.data) {
        cont["fields"] = doc.data()
      } else {
        cont["fields"] = doc.fields
      }
      cont["fields"]["editable"] = false
      this.docs.push(cont)
    },
    doneButton(doc: Doc) {
      doc.fields.isDone = !doc.fields.isDone
      this.updateDoc(doc)
      this.docStateMsg(doc, "I am done!!")
    },
    editSaveButton(doc: Doc) {
      this.updateDoc(doc)
      doc.fields.editable = false
    },
    docStateMsg(doc: Doc, msg: string) {
      doc.stateMsg = msg
      setTimeout(() => {
        doc.stateMsg = ""
      }, 5000)
    },
  },
})
</script>

<style lang="scss" scoped>
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
  border-radius: 0.5em;
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
    grid-template-rows: 0.25fr 1.5fr 0.5fr;
    grid-row-gap: 1rem;

    // 1. Date
    &-date {
      // color: rgba(0, 0, 0, 0.5);
      font-size: 0.9em;
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
        color: rgba(0, 0, 0, 0.75);
        text-decoration: line-through;
        font-weight: lighter;

        &::before {
          content: "\2713";
          display: inline-block;
          color: rgb(20, 140, 0);
          font-size: 1.6em;
          margin-right: 0.2em;
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
  background: rgba(100, 100, 100, 0.1);
  color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0.5em 0.1em rgba(128, 128, 128, 0.466) inset;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

/* Todo Main Options */
#todo-main-options {
  justify-content: flex-end;
  align-items: center;
}
</style>
