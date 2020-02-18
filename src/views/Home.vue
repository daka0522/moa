<template>
    <div id="home">

      <section>
        <h1>Update</h1>
      </section>


      <section>
        <h1>New Blogs</h1>
        <article v-for="doc in docs" :key="doc.id">
          <div id="headline" @click="doc.show = !doc.show">
            <h4>{{doc.data.title}}</h4>
            <span>{{doc.data.author}}</span>
          </div>
          <div id="fullcontent" v-show="doc.show">
            <div v-html="doc.data.content" id="mainContent">
            </div>
            <span id="date">{{doc.data.date.toDate()}}</span>
          </div>
        </article>
      </section>

    </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      docIds: [],
      docs: [],
    }
  },
  methods: {
    listPublished() {
      let indexRef = this.$root.db.collectionGroup('blog').where('isPublished', '==', true)
      indexRef.get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let cont = {}
            cont.id = doc.id
            cont.data = doc.data()
            cont.show = false
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
    
  },
  mounted() {
    this.listPublished()
  }
}

</script>

<style scoped lang="scss">
$test-first: hsla(270, 100, 30, .5);
$test-second: hsla(90, 100, 30, .5);

#home {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

section {
  display: grid;
  grid-gap: .6rem;
  h1 {
    text-align: center;
    background: linear-gradient(23.5deg, rgba($test-first, 1) 0%, rgba($test-second, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

}
article {
  
  padding: 1.6vh 1.6vw;

  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
  display: flex;
  flex-direction: column;
  
  h4 {
    margin: 0;
  }

  span {
    color: gray;
  }

  #headline {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    
  }

  #fullcontent {
    #mainContent{
      margin: 5vh 0;
    }

    #date {
      font-size: .9rem;
    }

  }
}
</style>