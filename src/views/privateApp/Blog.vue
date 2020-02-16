<template>
  <div id="blog-editor">
    <p class="msg-warning">Require: Authenticaed!</p>
    <div>
      <button class="btn" @click="createNewDoc()">Create New</button>
      <!-- <button class="btn" @click="readDoc()">Read</button> -->
    </div>


    <!-- Create new document -->
    <div id="writeDoc" v-if="mode.write">
      <button class="btn" @click="mode.write = false">Back</button>

      <div>
        <div id="mainState-blog">
          <div class="noticeMsg">
            <p id="mainStateMsg">{{mainStateMsg}}</p>
          </div>
        </div>
        <transition name="button-effect">
          <div id="newDocTools" v-show="newBlogTitle && newBlogContent">
            <div>
              <label for="publishing">Publishing</label>
              <input type="checkbox" name="publishing" id="publishing" v-model="isPublished" >
            </div>
            <button class="btn" @click="saveDoc()">Save</button>
          </div>
        </transition>
      </div>

      <div id="editor">
        <input id="blog-title" v-model="newBlogTitle" placeholder="Title">
        <quill-editor v-model="newBlogContent" ref="myQuillEditor" />
      </div>
    </div>

    <!-- Read and list my documents -->
    <div id="readDoc" v-else>
      <div v-for="doc in myDoc" :key="doc.date.seconds" id="docList">
        <article class="panel">
          <div id="docInfo">
            <span id="docDate">{{doc.date.toDate()}}</span>
            <span id="docPublish" :class="{published: doc.isPublished}">{{doc.isPublished ? 'Published' : "Privated"}}</span>
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
colRef
export default {
  data() {
    return {
      appName: 'blog',
      docID: 'blog',

      newBlogTitle: '',
      newBlogContent: '',

      isPublished: false,
      
      mainStateMsg: '',

      mode: {
        write: false,
        read: true 
      },

      myDoc: []
    }
  },
  methods: {
    saveDoc() {
      this.colRef.doc(this.docDate.toMillis().toString()).set({
        title: this.newBlogTitle,
        content: this.newBlogContent,
        date: this.docDate,
        isPublished: this.isPublished,
        author: this.$root.account.currentUser.email
      }).then( ()=> {
        let end = this.isPublished ? 'and published.' : '.'
        this.mainStateMsg = "The document succefully saved " + end 
      }).catch(error => {
        this.mainStateMsg = `Error! ${error}`
      })
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
    }
  },
  computed: {
    colRef,
    getUserID,

    docDate() {
      return this.$root.firebase.firestore.Timestamp.fromDate(new Date)
    }
  },
  mounted() {
    this.readDoc()
  }
  
}
</script>

<style lang="scss" scoped>
#blog-editor {
  display: flex;
  flex-direction: column;

  #blog-title {
    border-style: none;
    border: 1px solid rgba(0, 0, 0, .2);
    padding: 12px 15px 12px 15px;
    // width: 100%;
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

#newDocTools {
  display: flex;
  align-items: center;
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
</style>