<template>
  <div>
    <header-unit header-title="Welcome to Moa">
      <p>This is a functional and useful app collection</p>  
      <img src="../assets/moa.svg" alt="moa-logo"  id="home-logo">
    </header-unit>

    <div id="home">
      <section>
        <h1>Update</h1>
        <div class="container">
          <article v-for="doc in update.docs" :key="doc.id">
            <div class="headline" @click="doc.show = !doc.show">
              <h4>{{ doc.data.title }}</h4>
              <span class="date">{{ new Date(doc.data.date.toDate()).toLocaleString() }}</span>
            </div>
            <div v-show="doc.show" class="fullcontent">
              <div class="main" v-html="doc.data.content"></div>
            </div>
          </article>
        </div>
      </section>


      <section>
        <h1>New Posts</h1>
        <div class="container">
          <article v-for="doc in docs" :key="doc.id">
            <div class="headline" @click="doc.show = !doc.show">
              <h4>{{ doc.data.title }}</h4>
              <span>{{ doc.data.author }}</span>
            </div>
            <div v-show="doc.show" class="fullcontent">
              <div class="main" v-html="doc.data.content" />
              <span class="date">{{ new Date(doc.data.date.toDate()).toLocaleString() }}</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  metaInfo: {
    title: 'Home'
  },
  data() {
    return {
      docIds: [],
      docs: [],

      update: {
        docIds: [],
        docs: []
      }
    }
  },
  mounted() {
    this.listPublished()
    this.readUpdate()
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
    readUpdate() {
      let indexRef = this.$root.db.collectionGroup('update').where('isPublished', '==', true)
      indexRef.get()
      .then( snapshot => {
        snapshot.forEach( doc => {
          let cont = {}
          cont.id = doc.id 
          cont.data = doc.data()
          cont.show = false
          
          this.update.docs.push(cont)
        })
      })
    }
    
  }
}

</script>

<style scoped lang="scss">
$test-first: hsla(270, 100, 30, .5);
$test-second: hsla(90, 100, 30, .5);

#home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  grid-gap: 1vmax;
}

section {
  font-size: small;

  border-right: 1px solid rgba(128, 128, 128, 0.25);
  border-left: 1px solid rgba(128, 128, 128, 0.25);
  padding: 1.6vh 1.6vw;

  .container {
    display: grid;
    grid-gap: .6rem;
  }

  h1 {
    text-align: center;
    background: linear-gradient(23.5deg, rgba($test-first, 1) 0%, rgba($test-second, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

}
article {
  
  padding: .62vh .62vw;

  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
  display: flex;
  flex-direction: column;
  
  h4 {
    margin: 0;
  }

  span {
    color: rgb(73, 73, 73);
  }

  .headline {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fullcontent {
    background-color: rgba(navajowhite, .25);
    border-radius: .5em;
    padding: 1rem 0;
    margin: 1rem 0;

    .main {
      margin: 1rem 0;
      padding: 1rem;
    }

    .date {
      font-size: .9rem;
      float: right;
      margin-right: 1rem;
    }

  }
}

#home-logo {
  margin-top: 1.6em;
  border-radius: .5em;
  box-shadow: 0 0 .5em .1em rgba(128, 128, 128, 0.55);
}
</style>