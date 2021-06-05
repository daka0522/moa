<template>
  <section
    v-if="this.currentUser"
    id="user"
    class="panel"
  >
    <h1>Profile</h1>

    <div id="user-profile">
      <div id="user-email" class="profile-item">
        <h3>ID</h3>
        <p>{{ this.currentUser.email }}</p>
      </div>
      
      <div id="user-name" class="profile-item">
        <h3>Name</h3>
        <p v-if="!isEditable">{{ currentUser.displayName }}</p>
        <input
          v-else
          v-model="userEdit.name"
          class="input-part-basic"
          placeholder="Edit your name here"
        >
      </div>

      <div id="user-photo" class="profile-item">
        <h3>Photo</h3>
        <img
          :src="this.$root.account.currentUser.photoURL"
          width="150px" height="150px"
          :alt="currentUser.displayName + '\'s profile photo'"
        >
        <div v-if="isEditable">
          <input
            v-if="isEditable"
            id="photoFile"
            type="file"
            value="upload"
            class="input-part"
          >
          <button
            class="btn"
            @click="isRP = !isRP"
          >
            Random Painter
          </button>
          <input
            type="submit"
            class="btn"
            value="Update Photo"
            @click="uploadPhoto()"
            ref="uploadPhoto"
          >
          <random-painter
            v-if="isRP"
            ref="randomPainter"
            class="panel"
          />
        </div>
      </div>

      <div id="user-history" class="profile-item">
        <h3>History</h3>
        <div>
          <p>Creation Time: {{ currentUser.metadata.creationTime }}</p>
          <p>Last Sign In Time: {{ currentUser.metadata.lastSignInTime }}</p>
        </div>
      </div>

      <div id="user-state" class="profile-item">
        <h3>Verified</h3>
        <div v-if="currentUser.emailVerified">
          <fa-i icon="certificate" style="color: green" title="Email verifed"></fa-i>
        </div>
        <div v-else> 
          <fa-i icon="certificate" style="color: gray; margin: 0 .62rem;" title="Require email verifed"></fa-i>      
          <span>Email verification require. Send email.</span>
        </div>
      </div>

      <div id="user-etc" class="profile-item">
        <!-- <p>Using Apps</p> -->
      </div>
    </div>

    <div id="user-edit">
      <button
        id="user-edit-btn"
        class="btn"
        @click="isEditable = !isEditable"
      >
        {{ isEditable ? 'Back' : 'Edit' }}
      </button>
      <div
        v-if="isEditable"
        id="user-edit-tools"
      >
        <button
          class="btn-save"
          @click="saveUserEdit()"
          
        >
          Save
        </button>
        <!-- <button class="btn">
          Delete
        </button> -->
      </div>
    </div>

    <!-- <button class="btn" @click="createUserData(currentUser)">Create User Data</button> -->
  </section>
</template>

<script>
export default {
  name: 'User',
  components: {
    'random-painter': () => import('@/components/painter/RandomPainter.vue')
  },
  data() {
    return {
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
  beforeCreate() {

    this.currentUser
  },
  methods: {
    saveUserEdit(){
      if (this.userEdit.name) {
        this.currentUser.updateProfile({
          displayName: this.userEdit.name 
        })
      }

      this.isEditable = false
      /* if (this.userEdit.photoURL) {
        this.currentUser.photoURL = this.userEdit.photoURL
      } */
    },

    uploadPhoto(){
      // Get elements
      let fileButton = this.$refs.uploadPhoto

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
          // console.log('create User data! success.')
        }
      )
    }

  },
  mounted() {
    this.userEdit.name = this.$root.account.currentUser.displayName
  }
  
}
</script>

<style lang="scss" scoped>
#user {
  max-width: 50em;
  margin: auto;


  display: grid;

  &-profile {
  display: grid;
  // grid-template-rows: repeat(auto-fit, minmax(1em, 1fr));
  grid-gap: 1.6em;

    .profile-item {
      // background-color: antiquewhite;

      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;

      h3 {
        margin: 0;
        font-weight: unset;
        color: darkgray;
        min-width: 5em;
      }
    }

  }

  &-edit {
    display: flex;
  }
}

</style>