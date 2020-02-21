<template>
  <div id="app">
    <nav-part />
    <main>
      <router-view />
    </main>

    <footer title="Footer section. Contains some additional information of this site.">
      <p>Moa, 2020</p>
      <span>Github</span>
      <span>Contact</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: `Moa - %s | An Experimental App Collection `
  },
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
  background-color: rgba(128, 128, 128, .05);
}
#app {
  // display: grid;
  // grid-template-rows: 3rem auto 3rem;  
  
  height: 100%;

}
nav {
  border-bottom: $border-main;
}
main {
  width: 90vw;
  max-width: 80em;
  
  margin: 0 auto;
  // padding-bottom: 6.85vh;
  padding: 6.85vh 4.24vw;
  padding-bottom: 11.09vh;
  background-color: white;
  // box-shadow: 0 0 1em .5em gray;
}

footer {
  font-size: small;
  padding: 1.6vh 1.6vw;
  background-color: rgba(128, 128, 128, 0.025);
  border-top: $border-main;
  width: 100%;
  text-align: center;
  color: rgba(100, 100, 100, 1);
}

</style>
