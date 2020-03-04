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
            <button class="btn" @click="mode.write = false">
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
        <div id="editor">
          <input id="editor-title" v-model="newBlogTitle" placeholder="Title">
          <quill-editor ref="myQuillEditor" v-model="newBlogContent" :content="content" />
        </div>
      </div>

      <!-- Read and list my documents -->
      <div v-else id="readDoc">
        <div v-for="doc in myDoc" id="docList" :key="doc.date.seconds">
          <article class="panel">
            <div id="docInfo">
              <span id="docPublish" :class="{published: doc.isPublished}">{{ doc.isPublished ? 'Published' : "Privated" }}</span>
              <span id="docDate">{{ doc.date.toDate() }}</span>
            </div>
            <h4>{{ doc.title }}</h4>
            <div v-html="doc.content" />
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
          read: true
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
            author: this.$root.account.currentUser.email
          }).then(() => {
            let end = this.isPublished ? 'and published.' : '.'
            this.stateMsger("The document succefully saved " + end, 'success')
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
        let docRef = this.$root.firebase.firestore().collection('user').doc(this.$root.account.currentUser.uid)
        docRef.collection('blog').get()
          .then(docs => {
            docs.empty ? false : docs.forEach(doc => {
              this.myDoc.push(doc.data())
            })
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

    #editor-title {
      border-style: none;
      border-radius: unset;
      border: 1px solid rgba(0, 0, 0, .2);
      border-bottom: unset;
      padding: 12px 15px 12px 15px;
      background-color: transparent;

      font-size: 1rem;
      color: inherit;
    }

    #editor {
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



  #docInfo {
    color: gray;
    text-align: right;

    & * {
      margin-left: 1.6rem;
    }

    #docPublish {
      color: indianred;

      &.published {
        color: green;
      }
    }
  }

  #docList {
    margin: 1.6em 0;
  }

  .msg {

    &-success {
      color: green;
    }

    &-error {
      color: red;
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