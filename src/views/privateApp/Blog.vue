<template>
  <div id="blog-editor">
    <div class="msg-warning">
      <p>Require: Authenticaed!</p>
      <router-link :to="{name: 'signin'}">Sign In</router-link>
    </div>
    <transition name="button-effect">
    <div id="tool-btns">
      <button class="btn" @click="createNewDoc">Create New</button>
      <div v-show="mode.write" id="tool-write">
        <button class="btn" @click="mode.write = false">Back</button>
        
        <div id="newDocTools" v-show="newBlogTitle && newBlogContent">
          <div >
            <label for="publishing">Publishing</label>
            <input type="checkbox" name="publishing" id="publishing" v-model="isPublished">
          </div>
          <button class="btn" @click="saveDoc">Save</button>
        </div>
      </div>
    </div>
    </transition>


    <!-- Create new document -->
    <div id="writeDoc" v-if="mode.write">
      <div>
        <p id="mainStateMsg" :class="mainState.class">{{mainState.msg}}</p>


      </div>

      <div>
        <input id="editor-title" v-model="newBlogTitle" placeholder="Title">
        <quill-editor id="editor" v-model="newBlogContent" :content="content" ref="myQuillEditor" />
      </div>
    </div>

    <!-- Read and list my documents -->
    <div id="readDoc" v-else>
      <div v-for="doc in myDoc" :key="doc.date.seconds" id="docList">
        <article class="panel">
          <div id="docInfo">
            <span id="docPublish" :class="{published: doc.isPublished}">{{doc.isPublished ? 'Published' : "Privated"}}</span>
            <span id="docDate">{{doc.date.toDate()}}</span>
          </div>
          <h4>{{doc.title}}</h4>
          <div v-html="doc.content"></div>
        </article>
      </div>

    </div>

  </div>
</template>

<script>
import {colRef, getUserID} from '@/utils/firestoreUtils'
import 'quill/dist/quill.snow.css'
import {quillEditor} from "vue-quill-editor"

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      appName: 'blog',
      docID: 'blog',

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
  methods: {
    saveDoc() {
      if (!this.$root.account.currentUser) {
        this.stateMsger("The document will not saved. Please sign in firstly." , 'error')
      } else {      
      this.colRef.doc(this.docDate.toMillis().toString()).set({
        title: this.newBlogTitle,
        content: this.newBlogContent,
        date: this.docDate,
        isPublished: this.isPublished,
        author: this.$root.account.currentUser.email
      }).then( ()=> {
        let end = this.isPublished ? 'and published.' : '.'
        this.stateMsger("The document succefully saved " + end , 'success')
      }).catch(error => {
        this.stateMsger(`Error! ${error.message}` , 'error')
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
      .then( docs => {
        docs.empty ? false : docs.forEach( doc => {
          this.myDoc.push(doc.data())
        })
      })
    },
    stateMsger(msg, state) {
      this.mainState.msg = msg 
      this.mainState.class = 'msg-' + state
      setTimeout(() => {
        this.mainState.msg = ''
        this.mainState.class= null
      }, 10000)
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
  }
  
}
</script>

<style lang="scss" scoped>

#blog-editor {
  display: flex;
  flex-direction: column;

  #editor-title {
    border-style: none;
    border: 1px solid rgba(0, 0, 0, .2);
    padding: 12px 15px 12px 15px;

    font-size: 1rem;
    width: 100%;
  }

  #editor {
    font-size: 1rem;
  }


}

.btn {
  transition: display 3s ease;
}

.button-effect-enter, .button-effect-leave-to {
  opacity: 0;
}
.button-effect-enter-active, .button-effect-leave-active {
  transition: opacity 1s;
}



#docInfo {
  color: gray;
  text-align: right;
  & * {
    margin-left: 1.6rem;
  }

  #docPublish {
    color:indianred;

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
  display:inline-flex;

  #tool-write {
    display:inline-flex;

    #newDocTools {
      display: flex;
      align-items: center;
    }
  }
}
</style>