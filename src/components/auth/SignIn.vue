<template>
  <div id="signForm" class="panel">
    <div>

      <!-- Sign Up -->
      <!-- <sign-up></sign-up> -->

      <div id="signIn" class="board">
        <h4>Sign In with Email</h4>
        <form class="input-form">
          <label>Email</label>
          <input type="email" class="input-part" v-model="authEmail" placeholder="Type email please" required autocomplete="email">

          <label>Password</label>
          <input type="password"  class="input-part" v-model="authPassword" placeholder="Type password please" v-on:keyup.enter="signWithEmail(authEmail, authPassword)">

          <input type="submit" name="Sign in" class="btn" @click.prevent="signWithEmail(authEmail, authPassword)">
        </form>
      </div>
    </div>

    <!-- <button class="btn" @click="this.$root.signOut" v-else-if="this.$root.account.currentUser">Sign Out</button> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      
      valid: false,
      authEmail: '',
      authPassword: '',
      
    }
  },
  methods: {
    // # Sign in ways
    // Now only signWithEmail is available.
    signWithEmail(email, password) {
      this.$root.firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        this.$store.commit("signStateMsger", `${result.user.displayName} is successfuly signed in! It will move back soon.`)
        setTimeout(this.$router.back(), 5000)
      }).catch(error => {
        this.$store.commit("signStateMsger", error.message)
      })
    },

    signInGoogle() {
      const provider = new this.$root.firebase.auth.GoogleAuthProvider();
      this.$root.firebase.auth().signInWithPopup(provider).then(result => {
        result
      }).catch(error => {
        this.$store.commit("signStateMsger", error.message)

      })
    },

    authUI() {
      if (this.$root.firebase.auth().isSignInWithEmailLink(window.location.href)) {

        this.$root.ui.start("#firebaseui-auth-container", {
          callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              console.log(authResult)
              console.log(redirectUrl)
              return true;
            },
            uiShown: function () {
              // The widget is rendered.
              // Hide the loader.
              document.getElementById('loader').style.display = 'none';
            }
          },
          signInFlow: 'popup',
          signInOptions: [
            this.$root.firebase.auth.GoogleAuthProvider.PROVIDER_ID,

            {
              provider: this.$root.firebase.auth.EmailAuthProvider.PROVIDER_ID,
              signInMethod: this.$root.firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            }
          ]
        })
      } else {
        console.log("something wrong")
      }
    },

  },
  
  computed: {
    
  }

}
</script>

<style scoped lang="scss">
</style>