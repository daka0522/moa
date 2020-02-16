<template>
  <div id="app">
    <nav-part></nav-part>

    <main>
      <!-- Temporary  -->
       <!-- <span class="msg">{{ this.$root.account.signStateMsg}}</span> -->

      <h1 style="text-align: center">{{this.routeName().toUpperCase()}}</h1>
      <router-view></router-view>
    </main>

    <footer>
      <p>Moa, 2020</p>

    </footer>

  </div>
</template>

<script>
export default {
  data(){
    return {
      // routeName: ''
    }
  } ,
 
  methods: {
    routeName(){
      if (this.$route.name) {
        return this.$route.name
      } else {
        return "no name"
      }
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: rgba(128, 128, 128, .025);
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
nav {
  // height: 100%;
  // background-color: $white;
  border-bottom: $border-main;

}
main {
  width: 90vw;
  max-width: 80em;
  // min-width: 23rem;
  margin: auto;
  padding-top: 6.85vh;
  padding-bottom: 6.85vh;
  // height: 100%;
}

footer {
  background-color: rgba(128, 128, 128, 0.025);
  border-top: $border-main;


  width: 100%;
  // height: 100%;
  text-align: center;
  color: rgba(128, 128, 128, 0.897);
  // box-shadow: 0 -2em 1em .1em rgba(128, 128, 128, 0.15) inset;
}
</style>
