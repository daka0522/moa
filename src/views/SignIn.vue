<template>
    <div >
      <p class="msg">{{this.$root.account.signStateMsg}}</p>

      <div class="panel" >
          <div v-if="!isSignUp" class="sign-view">
            <sign-in></sign-in>
            <button class="btn" @click="isSignUp = true">Sign Up</button>
          </div>
          
          <div v-else class="sign-view">
            <sign-up></sign-up>
            <button class="btn" @click="isSignUp = false">Back</button>
          </div>
      </div>

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
      isSignUp: false,

    }
  }
}
</script>

<style scoped>
#sign-view {
  display: grid;
  /* place-content: center; */
}
.panel {
  /* min-width: 15em; */
  /* width: 100%; */
  max-width: 30rem;
  margin: auto;
}

.btn {
  min-width: 50%;
}



</style>