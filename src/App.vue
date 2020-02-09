<template>
  <div id="app">
    <nav-part></nav-part>
    <span>{{ this.$root.account.signStateMsg}}</span>
    <main>
      <h1 style="text-align: center">{{this.routeName().toUpperCase()}}</h1>
      <router-view></router-view>
    </main>
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
#app {
  display: grid;
  grid-auto-columns: repeat(auto-fit, 1fr);
  place-items: center;
}

main {
  padding: 1.6em;
  display: block;
  width: 90%;
  max-width: 80em;
}
</style>
