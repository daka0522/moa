<template>
  <section>
    <header-unit header-title="Community Board">
      <p>This page is to share published articles from users</p>
    </header-unit>
    <!-- <button class="btn" @click="listPublished">List</button> -->
    <div class="content-wrapper">
      <!-- Documents -->
      <article
        v-for="doc in docs"
        :key="doc.id"
        class="content"
      >
        <!-- 1. Document date and sub info  -->
        <aside class="content-top">
          <span class="date">{{ doc.data.date.toDate().toLocaleString() }}</span>
          <span class="published">{{ doc.data.isPublished ? "Published" : "Not published" }}</span>
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

<script>
  export default {
    data() {
      return {
        docIds: [],
        docs: []
      }
    },
    mounted() {
      this.listPublished()
    },
    methods: {
      listPublished() {
        let indexRef = this.$root.db.collectionGroup('blog').where('isPublished', '==', true).orderBy('date', 'desc')
        indexRef.get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let cont = {}
              cont.id = doc.id
              cont.data = doc.data()
              // Guard if there's already the doc existed 
              if (this.docIds.includes(doc.id)) {
                return
              }
              if (this.docs.includes(cont)) {
                return
              }
              this.docIds.push(doc.id)
              this.docs.push(cont)
            })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
  }


  .content {
    border: 1px solid rgba(128, 128, 128, 0.295);
    border-radius: .5em;
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