<template>
  <div id="blog-editor">
    <h2 style="color: orange">Require: Authenticaed!</h2>
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
          <button class="btn" @click="createNewDoc()">Create New</button>
        </div>
      </transition>
    </div>

    <div id="editor">
      <input id="blog-title" v-model="newBlogTitle" placeholder="Title">
      <quill-editor v-model="newBlogContent" ref="myQuillEditor" />
    </div>

  </div>
</template>

<script>
import {docRef, getUserID} from '@/utils/firestoreUtils'
docRef

export default {
  data() {
    return {
      collectionName: 'apps',
      docID: 'blog',

      newBlogTitle: '',
      newBlogContent: '',

      // docDate: this.$root.firebase.firestore.Timestamp.fromDate(new Date),
      isPublished: false,
      
      mainStateMsg: ''
    }
  },
  methods: {
    saveDoc() {
      this.userRef.collection(this.docID).doc(this.docDate.toMillis().toString()).set({
        title: this.newBlogTitle,
        content: this.newBlogContent,
        date: this.docDate,
        isPublished: this.isPublished
      }).then( ()=> {
        let end = this.isPublished ? 'and published.' : '.'
        this.mainStateMsg = "The document succefully saved " + end 
      }).catch(error => {
        this.mainStateMsg = `Error! ${error}`
      })
    },
    createNewDoc() {
      this.newBlogTitle = ''
      this.newBlogContent = ''
    }
  },
  computed: {
    userRef() {
      return this.$root.db.collection('users').doc(this.getUserID)
    },
    getUserID,

    docDate() {
      return this.$root.firebase.firestore.Timestamp.fromDate(new Date)
    }
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
</style>