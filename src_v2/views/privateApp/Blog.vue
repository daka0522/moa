<template>
  <div>
    <header-unit header-title="Blog">
      <p>Write your article and share it with people</p>
    </header-unit>

    <state-msger v-if="!this.$root.account.currentUser" state="warning">
      <p>Require: Authenticated!</p>
      <router-link :to="{name: 'signin'}">
        Sign In
      </router-link>
    </state-msger>

    <state-msger v-else :state="mainState.state">
      {{mainState.msg}}
    </state-msger>

    <div id="blog-editor">
      <transition name="button-effect">
        <div id="tool-btns">
          <button class="btn" @click="createNewDoc">
            Create New
          </button>
          <div v-show="mode.write" id="tool-write">
            <button class="btn" @click="mode.write = false; readDoc()">
              Back
            </button>

            <div v-show="newBlogTitle && newBlogContent" id="newDocTools">
              <div>
                <label for="publishing">Publishing</label>
                <input id="publishing" v-model="isPublished" type="checkbox" name="publishing">
              </div>
              <button class="btn" @click="saveDoc">
                Save
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Create new document -->
      <div v-if="mode.write" id="writeDoc">
        <div class="editor">
          <input id="editor-title" v-model="newBlogTitle" placeholder="Title">
          <quill-editor ref="myQuillEditor" v-model="newBlogContent" :content="content" />
        </div>
      </div>

      <!-- Read and list my documents -->
      <div v-else id="readDoc">
        <div v-for="doc in myDoc" class="docList" :key="doc.id">
          <article class="panel">
            <div class="docInfo">
              <span class="docPublish" :class="{published: doc.data.isPublished}">
                <fa-i v-if="doc.data.isPublished" icon="lock-open" title="Published" />
                <fa-i v-else icon="lock" title="Privated" />
              </span>
              <span class="docDate">{{ new Date(doc.data.date.toDate()).toLocaleString() }}</span>
              <button class="docEdit btn-basic" @click="doc.edit = !doc.edit">{{ doc.edit ? 'Back' : 'Edit'}}</button>
            </div>
            <div v-if="doc.edit">
              <div class="edit-tools">
                <label for="publishing">Publishing</label>
                <input id="publishing" v-model="doc.data.isPublished" type="checkbox" name="publishing">
                <button class="btn-basic btn-update" @click="updateDoc(doc)" title="update document">Update</button>
                <button class="docDelete btn-basic" title="delete document" @click="deleteDoc(doc.id)">
                  <fa-i icon="trash"></fa-i>
                </button>
              </div>
              <div class="editor">
                <input class="editor-title" v-model="doc.data.title" placeholder="Title">
                <quill-editor ref="myQuillEditor" v-model="doc.data.content" :content="content" />
              </div>
            </div>
            <div v-else>
              <h4>{{ doc.data.title }}</h4>
              <div v-html="doc.data.content" />
            </div>

          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    colRef,
    getUserID
  } from '@/utils/firestoreUtils'
  import 'quill/dist/quill.snow.css'
  import {
    quillEditor
  } from "vue-quill-editor"

  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        appName: 'blog',

        newBlogTitle: '',
        newBlogContent: '',

        isPublished: false,

        mainState: {
          msg: '',
          class: null
        },

        mode: {
          write: false,
          read: true,
        },

        myDoc: [],
        content: ''
      }
    },
    computed: {
      colRef,
      getUserID,

      docDate() {
        return this.$root.firebase.firestore.Timestamp.fromDate(new Date)
      },
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    },
    mounted() {
      if (this.$root.account.currentUser) {
        this.readDoc()
      }
    },
    methods: {
      saveDoc() {
        if (!this.$root.account.currentUser) {
          this.stateMsger("The document will not saved. Please sign in firstly.", 'error')
        } else {
          this.colRef.doc(this.docDate.toMillis().toString()).set({
            title: this.newBlogTitle,
            content: this.newBlogContent,
            date: this.docDate,
            isPublished: this.isPublished,
            author: this.$root.account.currentUser.displayName
          }).then(() => {
            let end = this.isPublished ? 'and published.' : '.'
            this.stateMsger("The document is succefully saved " + end, 'success')
          }).catch(error => {
            this.stateMsger(`Error! ${error.message}`, 'error')
          })
        }
      },
      createNewDoc() {
        this.mode.write = true

        this.newBlogTitle = ''
        this.newBlogContent = ''
      },
      readDoc() {
        this.myDoc = []
        const docRef = this.$root.db.collection('user').doc(this.$root.account.currentUser.uid)
        docRef.collection('blog').get()
          .then(docs => {
            docs.empty ? false : docs.forEach(doc => {
              let cont = {}
              cont.id = doc.id
              cont.data = doc.data()
              cont.edit = false
              this.myDoc.push(cont)
            })
          })
      },
      deleteDoc(docID) {
        const docRef = this.$root.db.collection('user').doc(this.$root.account.currentUser.uid)
        docRef.collection('blog').doc(docID).delete().then(() => {
          this.stateMsger("This document is succesfully deleted.", "success")
          const index = this.myDoc.findIndex(e => e.id === docID)
          this.myDoc.pop(index)
        }).catch(error => {
          this.stateMsger(`Error whilte deleting the document! ${error.message}`, 'error')
        })
      },
      updateDoc(doc) {
        const docRef = this.$root.db.collection('user').doc(this.$root.account.currentUser.uid)
        docRef.collection('blog').doc(doc.id).update({
          title: doc.data.title,
          content: doc.data.content,
          updatedDate: [this.docDate],
          isPublished: doc.data.isPublished
        }).then( () => {
          this.stateMsger('This document is successfully updated.', 'success')
          doc.edit = false
        }).catch(error => {
          this.stateMsger(`Error whilte updating the document! ${error.message}`, 'error')
        })
      },
      stateMsger(msg, state) {
        this.mainState.msg = msg
        this.mainState.state = state
        setTimeout(() => {
          this.mainState.msg = ''
          this.mainState.state = null
        }, 10000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #blog-editor {
    display: flex;
    flex-direction: column;

    .editor-title {
      border-style: none;
      border-radius: unset;
      border: 1px solid rgba(0, 0, 0, .2);
      border-bottom: unset;
      padding: 12px 15px 12px 15px;
      background-color: transparent;

      font-size: 1rem;
      color: inherit;
    }

    .editor {
      margin: 1rem 0;
      display: grid;
    }
  }

  .btn {
    transition: display 3s ease;
  }

  .button-effect-enter,
  .button-effect-leave-to {
    opacity: 0;
  }

  .button-effect-enter-active,
  .button-effect-leave-active {
    transition: opacity 1s;
  }


  #readDoc {
    width: 70vw;
    margin: auto;
  }

  .docList {
    margin: 1.6em 0;

    .panel {
      padding: 4.24vh 2.62vw 6.85vh 2.62vw;
    }

    .docInfo {
      font-size: small;
      ;
      color: gray;
      text-align: right;

      .docPublish {
        color: indianred;

        &.published {
          color: green;
        }
      }
      .docDate {
        margin: 1em;
      }
    }
  }

  .edit-tools {
    text-align: right;
    font-size: small;

    .btn-update {
      margin: 0 1rem;
    }
    .docDelete {
      font-size: small;
      background-color: rgba(205, 92, 92, 0.75);
      color: white;
    }
  }

  #tool-btns {
    display: inline-flex;

    #tool-write {
      display: inline-flex;

      #newDocTools {
        display: flex;
        align-items: center;
      }
    }
  }
</style>