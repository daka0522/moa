<template>
  <div>
    <h2>Profile</h2>
    <div  v-if="this.currentUser">
      <section id="profile" class="panel">
        <div>

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
            </div>
          </div>

          

          <div id="user-history">
            <p>Creation Time: {{currentUser.metadata.creationTime}}</p>
            <p>Last Sign In Time: {{currentUser.metadata.lastSignInTime}}</p>
          </div>

          <div id="user-state">
            <span>Verified:</span>
            <div v-if="currentUser.emailVerified">
              <span>True</span>
              <i style="color: green; font-size: 1.6em" class="fas fa-check-circle "></i>
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
      </section>

    </div>
  </div>
</template>

<script>
export default {
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
      
    }
  },
  computed:{
    currentUser() {
      return this.$root.account.currentUser
    },


  },
  methods: {
    saveUserEdit(){
      this.userInfo.name = this.userEdit.name 
      this.userInfo.photoURL = this.userEdit.photoURL

      let data = {
            userInfo :{
              name: this.userEdit.name, 
              photoURL: this.userEdit.photoURL
            }
          }
      this.$root.db.collection('user').doc(this.currentUser.uid).update(
        
          data
        
      ).then( ()=> {
        console.log('Successfully updated in DB');
        
      }).catch(error => {
        console.error('Error from saveUserEdit', error)
      })
      console.log('Successfully cheanged', this.userInfo);
      
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


      // console.log(photoFile)

      // Create Storage ref 

      // Upload file 

      // After effect
    },


    
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

table {
  padding: 1.6em;
  margin: 1.6em;
  width:50%;

  border-collapse: collapse;

  box-shadow: 0 0 .5em .1em rgba(224, 224, 224, 0.664);

  tr {
    // border-bottom: 1px solid rgba(128, 128, 128, 0.192);
    
  }
  th, td {
    padding: $box-primary;
    
  }
  td {
    // display: inline-block;
    
  }
}
</style>