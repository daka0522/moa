<template>
  <div>
    <h2>User Profile</h2>
    <div>
      <section id="profile" class="panel">
        <div>
          <span>Name:</span>
          <input v-if="isEditable">

          <h3>{{currentUser.displayName}}</h3>
          <img :src="this.$root.account.currentUser.photoURL" width="64px" :alt="this.$root.account.currentUser.displayName + '\'s profile photo'">
          
          <input v-if="isEditable" type="file" class="input-part">
        </div>
        <p>{{currentUser.email}}</p>
        <p>Creation Time: {{currentUser.metadata.creationTime}}</p>
        <p>Last Sign In Time: {{currentUser.metadata.lastSignInTime}}</p>
        <div>
          <span>Verified:</span>
          <div v-if="currentUser.emailVerified">
            <i style="color: green; font-size: 1.6em" class="fas fa-check-circle "></i>
          </div>
          <span v-else>None</span>
        </div>
        <div>
          <p>Using Apps</p>
        </div>
        <div id="user-tools">
          <button id="user-edit" class="btn" @click="isEditable = !isEditable">Edit</button>
          <div id="user-edit-btns" v-if="isEditable">
            <button class="btn">Save</button>
            <button class="btn">Delete</button>
          </div>
        </div>
      </section>

      <!-- Table version -->
      <table>
        <caption>User Profile</caption>
        <tr>
          <th>Name</th>
          <td>
            <h3>{{currentUser.displayName}}</h3>
            <img :src="this.$root.account.currentUser.photoURL" width="64px" :alt="this.$root.account.currentUser.displayName + '\'s profile photo'">

          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <p>{{currentUser.email}}</p>
          </td>
        </tr>
        <tr>
          <th>Verified</th>
          <td>
            <div v-if="currentUser.emailVerified">
              <i style="color: green; font-size: 1.6em" class="fas fa-check-circle "></i>
            </div>
            <span v-else>None</span>
          </td>
        </tr>
      </table>






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
    }
  },
  computed:{
    currentUser() {
      return this.$root.account.currentUser
    },

  },
  methods: {
    
  }
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