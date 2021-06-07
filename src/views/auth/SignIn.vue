<template>
  <section id="signIn" class="panel">
    <h3 style="text-align: center">Sign In with Email</h3>

    <p class="msg">
      {{ $store.state.signStateMsg }}
    </p>

    <form class="input-form col-cont">
      <label for="signUpEmail">Email</label>
      <input
        id="signUpEmail"
        v-model="authEmail"
        type="email"
        class="input-part"
        placeholder="Type email please"
        required
        autocomplete="email"
      />

      <label for="signUpPassword">Password</label>
      <input
        id="signUpPassword"
        v-model="authPassword"
        type="password"
        class="input-part"
        placeholder="Type password please"
        @keyup.enter="signWithEmail(authEmail, authPassword)"
      />

      <input
        type="submit"
        name="Sign in"
        value="Sign in"
        class="btn"
        @click.prevent="signWithEmail(authEmail, authPassword)"
      />
    </form>

    <div id="bottom">
      <span class="info">Don't have an account?</span>
      <router-link :to="{ name: 'signup' }"> Sign Up </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      authEmail: "",
      authPassword: "",
    }
  },
  methods: {
    // # Sign in ways
    signWithEmail(email: string, password: string) {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            this.$store.commit(
              "setSignState",
              `${result.user.displayName} is successfuly signed in! It will move back soon.`
            )
            setTimeout(this.$router.back(), 5000)
          } else {
            this.$store.commit(
              "setSignState",
              `Unexpecteed error while sign with email.`
            )
          }
        })
        .catch((error) => {
          this.$store.commit("setSignState", error.message)
        })
    },
  },
})
</script>

<style scoped lang="scss">
.col-cont {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr));
}

#signIn {
  max-width: 40rem;
  margin: auto;
}

#bottom {
  display: flex;
  margin: 1.6vh 0;
  padding: 1.6vh 1.6vw;

  a {
    color: inherit;
    margin: 0 1.6vw;
  }
  .info {
    color: gray;
  }
}
</style>