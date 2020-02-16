<template>
  <div>
    <h2 style="color: purple">Public</h2>
    <h2>MOA</h2>

    <button class="btn" @click="listPublished()">List</button>
    <div class="content">
      <section v-for="doc in docs" :key="doc.id" class="panel">

        <!-- Document date and sub info  -->
        <div class="noticeMsg" style="display: flex; justify-content: space-between;">
          <span>{{doc.data.date.toDate().toLocaleString()}}</span>
          <span style="color: green">{{doc.data.isPublished ? "Published" : "Not published"}}</span>
        </div>

        <!-- Document main contents -->
        <h4>{{doc.data.title}}</h4>
        <article v-html="doc.data.content"></article>

        <div id="author">
          <span>{{doc.data.author}}</span>
        </div>

        <!-- userdata -->
        <div  id="userdata" @click="showUserProfile(doc.data.userdata)">
          <!-- <p>{{userData(doc) ? doc.data.userdata.name : "NONENAME"}}</p> -->
          <!-- <image src="doc.data.userdata.photoURL" /> -->

          <div id="userdata-profile" :style="{thinProfile: false}" class="thin-profile" >

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
      indexRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {

          let cont = {}
          cont.id = doc.id
          cont.data = doc.data()

/* 
          // User data
          let userid = doc.ref.parent.parent.id

          this.$root.db.collection('user').doc(userid).get()
          .then( (result) => {
            let userdata = result.data().userdata
            cont.data.userdata = userdata
            console.log('userdata');
          })
          .catch(error => {
            console.error(error);
          })
 */

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
  computed: {
    
  }


}
</script>

<style lang="scss" scoped>
.panel {
  flex-direction: column;
  // align-content: space-between;
}
.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}

#author {
  cursor: pointer;
  // background-color: antiquewhite;
  text-align: right;
  color: gray;

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

#userdata{
  background-color: red;
  // align-self: flex-end;
  // justify-self: flex-end;
  // bottom: 0;
}
</style>