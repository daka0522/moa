<template>
  <div id="todo-view">
    <header-unit header-title="Todo">
      <p>
        This app is a simple todo list manage app. You can add todo list and
        clear it.
      </p>
    </header-unit>

    <state-msger v-if="user" state="warning">
      <h2>Demo version.</h2>
      <span> Data will not saved if you are not logined.</span>
      <p>If you want to use this app and save your list. Please sign in.</p>
      <router-link to="/signin"> Sign in </router-link>
    </state-msger>

    <div id="todo">
      <transition name="fade">
        <span id="mainStateMsg" class="msg">{{ mainStateMsg }}</span>
      </transition>

      <!-- Todo input  -->
      <transition name="fade">
        <form class="todo-input panel">
          <input
            v-model="newDoc.content"
            class="content-area input-part"
            type="text"
            placeholder="Please write down things to do here!"
            @keyup.enter="saveNewDoc"
          />
          <button class="btn" type="submit" @click.prevent="saveNewDoc">
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
          Clear All!
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
            v-show="doc.state"
            class="todo-card-msg noticeMsg statePanel"
            >{{ doc.state }}</span
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
                <span>Undo</span>
              </button>
              <button class="btn-delete" @click="deleteDoc(doc)">
                <IconPicker icon="trash" />
                <span>Delete</span>
              </button>
              <button class="btn" @click.prevent="editSaveButton(doc)">
                <IconPicker icon="save" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </li>
        
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { colRef } from "../../utils/firestoreUtils"
import { computed, defineComponent, onMounted, ref, watch } from "vue"
import { useStore } from "vuex"
import firebase from "firebase/app"

type Doc = {
  id: string
  fields: {
    content: string
    // date: firebase.default.firestore.Timestamp
    date: any
    isDone: boolean
    editable?: boolean
  }
  state?: string
}

export default defineComponent({
  setup() {
    const store = useStore()
    const appName = "todo"
    const mainStateMsg = ref("")
    const docs = ref([] as Doc[])
    const newDoc = ref({
      content: "",
      isDone: false,
    })

    const user = computed( () => store.state.currentUser)

    onMounted( () => {
      if (user.value) {
        listAllDoc()
      }      
    })
    // return { mainStateMsg, docs, newDoc, appName }

    watch(mainStateMsg, () => {
      setTimeout(() => {
        mainStateMsg.value = ""
      }, 10000)
    })

    const pushDoc = (doc:Doc | any) => {
      doc.stateMsg =  ""

      if (doc.data) {
        doc.fields = doc.data()
      } 
      doc.fields.editable = false 
      docs.value.push(doc)
    }

    const setDocState = (doc: Doc, state: string) => {
      doc.state = state 
      setTimeout( () => doc.state = "", 5000)
    }

    /* CRUD (Create, Read, Update, Delete) */
    /* 1.Create */
    const saveNewDoc = () => {
      if (newDoc.value.content.length <= 0) {
        // mainStateMsg.value = "The content is empty. This document is not saved."
        return 
      }
      else {
        const date = firebase.firestore.Timestamp.fromDate(new Date())
        const doc: Doc = {
          id: date.toMillis().toString(),
          fields: {
            content: newDoc.value.content,
            date: date,
            isDone: newDoc.value.isDone,
          },
        }

        // If there's user logined, then the data will save in the web db.
        if (user.value && colRef(appName)) {
          colRef(appName)!
          .doc(doc.id)
          .set(doc.fields)
          .then( () => {
            mainStateMsg.value = "Document successfully written!"
            pushDoc(doc)
          })
          .catch( error => {
            mainStateMsg.value = `Error while writing document: ${error}`
          })
        } else {
          // Else data will not saved. Just on memory.
          mainStateMsg.value = "The data will not saved. Just list doc."
          pushDoc(doc)
        }
      }
      newDoc.value.content = ""
    }

    // 2. Read 
    const listAllDoc = () => {
      colRef(appName)!.get()
      .then((snapshot) => {
        let subject = ""
        snapshot.size > 1
          ? (subject = "Document's are")
          : (subject = "Document is")
        snapshot.forEach((doc) => {
          pushDoc(doc)
          mainStateMsg.value = `${subject} successfully downloaded.`
        })
      })
      .catch((err: Error) => {
        mainStateMsg.value = `Error getting documents. ${err}`
      })
    }

    // 3. Update 
    const updateDoc = (doc: Doc) => {
      // Update edited date.
      // doc.fields.date = this.$root.firebase.firestore.Timestamp.fromDate(new Date)
      let data = {
        content: doc.fields.content,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        isDone: doc.fields.isDone,
      }
      // Post update doc to firestore
      // If the user is logined.
      if (user.value && colRef(appName)) {
        colRef(appName)!
          .doc(doc.id)
          .update(data)
          .then(() => {
            setDocState(doc, "This is successfully updated.")
          })
          .catch((error) => {
            setDocState(
              doc,
              `Error while updating the doc. ${error.message}`
            )
          })
      } else {
        Object.assign(doc.fields, data)
        setDocState(doc, "This is successfully updated.")
      }
    }

    /**
     * 4. Delete
     */
    const deleteDoc = (doc: Doc) => {      
      const index = docs.value.findIndex((item: Doc) => item.id === doc.id)

      // If user logined
      if (user.value) {
        colRef(appName)!.doc(doc.id).delete()
        .then( () => {
          docs.value.splice(index, 1)
          setDocState(doc, "This document is successfully deleted!")
        })
        .catch(error => {
          setDocState(doc, `Error removing document: ${error.message}`)
        })
      } else { 
        docs.value.splice(index, 1)
        setDocState(doc, "This document is successfully deleted!")
      }
    }

    const deleteAll = () => {
      if (user.value) {
        
        docs.value.forEach( (doc: Doc) => {
          deleteDoc(doc)
        })
      } else { 
        docs.value = []
      }
    }

    const doneButton = (doc: Doc) => {
      let state = ""
      doc.fields.isDone ? state = "I am done!!" : state = "I am not done :("
      setDocState(doc, state)

      doc.fields.isDone = !doc.fields.isDone 
      updateDoc(doc)
    }

    const editSaveButton = (doc: Doc) => {
      updateDoc(doc) 
      doc.fields.editable = false 
    }


    return {
      mainStateMsg,
      docs, 
      newDoc,
      saveNewDoc,
      listAllDoc,
      updateDoc,
      deleteAll,
      deleteDoc,
      doneButton,
      editSaveButton,
      user

    }
  },
})
</script>

<style lang="scss" scoped>

#mainStateMsg {
  color: inherit;
}
/* A. Todo input */
.todo-input {
  margin: 4.8em 0 4.8em 0;
  display: flex;

  input {
    width: 100%;
    font-size: 1rem;
    background: inherit;
    color: inherit;
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
      margin: 6.85vh 0;

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
        // color: rgba(0, 0, 0, 0.75);
        color: inherit;
        text-decoration: line-through;
        font-weight: lighter;
        font-style: italic;

        &::before {
          content: " \2713 ";
          display: inline-block;
          color: rgb(20, 140, 0);
          font-size: 1.6em;
          margin-right: 0.5em;
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
