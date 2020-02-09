<template>
  <div id="blog-editor">
    <h2 style="color: orange">Require: Authenticaed!</h2>
    <div>
      <p>Write new blog</p>
        <button class="btn">Create New</button>
      <transition name="button-effect">
        <button class="btn" v-show="newBlogTitle && newBlogContent" @click="saveDoc()">Save</button>
      </transition>
      <transition name="button-effect">
        <button class="btn" v-show="newBlogTitle && newBlogContent">Delete</button>
      </transition>
      <div>
        <label for="publishing">Publishing</label>
        <input type="checkbox" name="publishing" id="publishing" v-model="isPublished">
      </div>

    </div>

    <div >
      <input id="blog-title" v-model="newBlogTitle"  placeholder="Title">
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

      docDate: this.$root.firebase.firestore.Timestamp.fromDate(new Date),
      isPublished: false,
      
    }
  },
  methods: {
    saveDoc() {
      this.userRef.collection(this.docID).doc(this.docDate.toMillis().toString()).set({
        title: this.newBlogTitle,
        content: this.newBlogContent,
        date: this.docDate,
        isPublished: this.isPublished
      })
    },
    
  },
  computed: {
    userRef() {
      return this.$root.db.collection('users').doc(this.getUserID)
    },
    getUserID
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
    width: 100%;
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
</style>