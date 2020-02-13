<template>
  <div>
    <h2>Profile</h2>
    <div  v-if="this.currentUser">
      <section id="profile" class="panel">
        <div id="user-profile">

          <div id="user-email">
            <h4>ID</h4>
            <p>{{this.currentUser.email}}</p>
          </div>
          
          <div id="user-name">
            <h4>Name</h4>
            <p>{{currentUser.displayName}}</p>
            <input v-if="isEditable" v-model="userEdit.name">
          </div>

          <div id="user-photo">
            <h4>Photo</h4>
            <img :src="this.$root.account.currentUser.photoURL" width="64px" :alt="currentUser.displayName + '\'s profile photo'">
            <div v-if="isEditable">
              <input v-if="isEditable" type="file" id="photoFile" value="upload" class="input-part">
              <input type="submit" class="btn" @click="uploadPhoto()">

              <button class="btn" @click="isRP = !isRP">Random Painter</button>

              <random-painter v-if="isRP" class="panel"></random-painter>

            </div>
          </div>

          <div id="user-history">
            <p>Creation Time: {{currentUser.metadata.creationTime}}</p>
            <p>Last Sign In Time: {{currentUser.metadata.lastSignInTime}}</p>
          </div>

          <div id="user-state">
            <span>Verified:</span>
            <div v-if="currentUser.emailVerified">
              <span style="color: green">True</span>
            </div>
            <span v-else>None</span>
          </div>

          <div id="user-etc">
            <p>Using Apps</p>
          </div>
        </div>

        <div id="user-eidt">
          <button id="user-edit-btn" class="btn" @click="isEditable = !isEditable">Edit</button>
          <div id="user-edit-tools" v-if="isEditable">
            <button class="btn" @click="saveUserEdit()">Save</button>
            <button class="btn">Delete</button>
          </div>
        </div>

        <button class="btn" @click="createUserData(currentUser)">Create User Data</button>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  components: {
    'random-painter': () => import('@/components/painter/RandomPainter.vue')
  },
  data() {
    return {
      confirmed: {
        color: 'green'
      },
      fields: '',
      isEditable: false, 
      userEdit: {
        name: '',
        photoURL: null,
      },
      
      // Show random painter
      isRP: false,
    }
  },
  computed:{
    currentUser() {
      return this.$root.account.currentUser
    },


  },
  methods: {
    saveUserEdit(){
      if (this.userEdit.name) {
        this.currentUser.updateProfile({
          displayName: this.userEdit.name 
        })
      }
      /* if (this.userEdit.photoURL) {
        this.currentUser.photoURL = this.userEdit.photoURL
      } */
      
      
    },

    uploadPhoto(){
      // Get elements
      let fileButton = document.getElementById('photoFile')

      // Listen for file selection
      fileButton.addEventListener('change', function(e) {
        // Get file 
        let file = e.target.files[0]
        file
        // Create storage ref 
        this.$root.firebase.storage().ref('user')


      })
    },
    createUserData(user) {
      let data = {
        userdata: {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          class: null, 
          created: user.metadata.creationTime 
        }
      }

      this.$root.db.collection('user').doc(user.uid).set(data).then(
        () => {
          console.log('create User data! success.')
        }
      )
    }

  },
  beforeCreate() {

    this.currentUser
  },
  
}
</script>

<style lang="scss" scoped>
.confirm {
  font-size: 1.6em;
}

#profile {
  display: grid;
}

#user-profile {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(5em, 1fr));
  grid-gap: 1.6em;

}

</style>