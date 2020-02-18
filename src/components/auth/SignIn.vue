<template>
  <div id="signIn">
    <h3 style="text-align: center">Sign In with Email</h3>
    <form class="input-form col-cont" >

      <label>Email</label>
      <input type="email" class="input-part" v-model="authEmail" placeholder="Type email please" required autocomplete="email">

      <label>Password</label>
      <input type="password" class="input-part" v-model="authPassword" placeholder="Type password please" v-on:keyup.enter="signWithEmail(authEmail, authPassword)">

      <input type="submit" name="Sign in" value="Sign in" class="btn" @click.prevent="signWithEmail(authEmail, authPassword)" >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authEmail: '',
      authPassword: '',
    }
  },
  methods: {
    // # Sign in ways
    signWithEmail(email, password) {
      this.$root.firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        this.$store.commit("signStateMsger", `${result.user.displayName} is successfuly signed in! It will move back soon.`)
        setTimeout(this.$router.back(), 5000)
      }).catch(error => {
        this.$store.commit("signStateMsger", error.message)
      })
    },
  },
}
</script>

<style scoped lang="scss">
.col-cont {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr))
}

</style>