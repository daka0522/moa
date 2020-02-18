<template>
    <div >
      <p class="msg">{{this.$root.account.signStateMsg}}</p>

      <sign-in></sign-in>
      <router-link :to="{name: 'signup'}">Sign Up</router-link>


      <div class="panel" v-if="this.$root.account.currentUser" >
        <router-link to="/dev">Development</router-link>
        <ul>
          <h2>Editors</h2>
          <router-link to="/dev/edit-quill">Edit with Quill</router-link>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.btn {
  min-width: 50%;
}



</style>