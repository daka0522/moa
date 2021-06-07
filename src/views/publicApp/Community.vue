<template>
  <section>
    <header-unit header-title="Community Board">
      <p>This page is to share published articles from users</p>
    </header-unit>
    <!-- <button class="btn" @click="loadPublished">List</button> -->
    <div class="content-wrapper">
      <!-- Documents -->
      <article v-for="doc in docs" :key="doc.id" class="content">
        <!-- 1. Document date and sub info  -->
        <aside class="content-top">
          <span class="date">{{
            doc.data.date.toDate().toLocaleString()
          }}</span>
          <span class="published">{{
            doc.data.isPublished ? "Published" : "Not published"
          }}</span>
        </aside>

        <!-- 2. Document main contents, Article-->
        <section class="content-main">
          <h1>{{ doc.data.title }}</h1>
          <div class="doc-content" v-html="doc.data.content" />
        </section>

        <!-- 3. userdata -->
        <aside class="content-bottom">
          <span id="author">{{ doc.data.author }}</span>
        </aside>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  data() {
    return {
      docIds: [],
      docs: [] as Record<string, unknown>[],
    }
  },
  mounted() {
    this.loadPublished()
    console.log(this.$store)
  },
  methods: {
    loadPublished() {
      let indexRef = this.$db
        .collectionGroup("blog")
        .where("isPublished", "==", true)
        .orderBy("date", "desc")
      indexRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Guard if the doc already loaded
          if (this.docs.find((e) => e.id == doc.id)) {
            return
          }
          const cont = {
            id: doc.id,
            data: doc.data(),
          }
          this.docs.push(cont)
        })
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}

.content {
  border: 1px solid rgba(128, 128, 128, 0.295);
  border-radius: 0.5em;
  padding: 3.2vh 3.2vw;

  &-top {
    display: flex;
    justify-content: space-between;

    .date {
      color: gray;
    }
    .published {
      color: green;
    }
  }
  &-main {
    min-height: 200px;
  }
  &-bottom {
    #author {
      cursor: pointer;
      float: right;
      color: gray;
    }
  }
}
</style>