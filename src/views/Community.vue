<template>
  <div>
    <h2 style="color: purple">Public</h2>
    <h2>MOA</h2>

    <button class="btn" @click="listPublished()">List</button>
    <div class="content">
      <section v-for="doc in docs" :key="doc.id" class="panel">
        <div class="noticeMsg" style="display: flex; justify-content: space-between;">
          <span>{{doc.data.date.toDate().toLocaleString()}}</span>
          <span style="color: green">{{doc.data.isPublished ? "Published" : "Not published"}}</span>
        </div>
        <h4>{{doc.data.title}}</h4>
        <article v-html="doc.data.content"></article>
        <div v-if="doc.data.author" id="author" @click="showUserProfile(doc.data.author)">
          <p>{{doc.data.author}}</p>
          <div id="author-profile" :style="{thinProfile: false}" class="thin-profile">
            <p>Profile</p>
            
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docIds: [],
      docs: []
    }
  },
  methods: {
    listPublished() {
      let indexRef = this.$root.db.collectionGroup('blog').where('isPublished', '==', true)
      indexRef.get().then(querySnapshot => {

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
    showUserProfile(author) {
      console.log(author);

    }
  },


}
</script>

<style lang="scss" scoped>
.panel {
  flex-direction: column;
}
.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1.6em;
}

#author {
  cursor: pointer;
  background-color: antiquewhite;

  &:hover {
    .thin-profile {
      display: block;
    }
  }

  .thin-profile {
    background-color: azure;
    box-shadow: 0 0 .5em .1em gray;
    position: absolute;
    width: 30%;

    display: none;
  }
}
</style>