// 1. Write update // 2. Write news

<template>
  <div>
    <header-unit header-title="Development Writer">
      <p>Write about the site. For example, update, news...</p>
    </header-unit>

    <state-msger :state="msger.state">
      {{ msger.msg }}
    </state-msger>
    <!-- <state-msger state="error">{{ msger.msg }}</state-msger> -->

    <section>
      <label for="title">Title</label>
      <input
        id="title"
        v-model="newUpdate.title"
        type="text"
        name="title"
        class="input-part"
      >

      <label for="isPublished">Published?</label>
      <input
        id="isPublished"
        v-model="newUpdate.isPublished"
        type="checkbox"
        name="isPublished"
      >
      <quill-editor v-model="newUpdate.content" />

      <button
        class="btn-save"
        @click="writeUpdate"
      >
        Save
      </button>
    </section>
  </div>
</template>

<script>
  import "quill/dist/quill.snow.css"
  import { quillEditor } from "vue-quill-editor"

  export default {
    components: {
      quillEditor,
    },
    data() {
      return {
        newUpdate: {
          title: "",
          content: "",
          isPublished: false,
        },
        msger: {
          msg: null,
          state: null,
        },
      }
    },
    mounted() {
      if (!this.$root.account.currentUser) {
        this.msger.msg = "Require development account"
        this.msger.state = "error"
      }
    },
    methods: {
      writeUpdate() {
        let now = new Date()
        let data = {
          author: this.$root.account.currentUser.uid,
          title: this.newUpdate.title,
          content: this.newUpdate.content,
          date: now,
          isPublished: this.newUpdate.isPublished,
        }

        this.$root.db
          .collection("dev/document/update")
          .doc(now.getTime().toString())
          .set(data)
          .then(() => {
            this.msger.msg = "Successfully written!"
            this.msger.state = "success"
            ;(this.newUpdate.title = ""), (this.newUpdate.content = "")
          })
          .catch((error) => {
            this.msger.msg = error.message
            this.msger.state = "error"
          })
      },
    },
  }
</script>
