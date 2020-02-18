<template>
  <div id="app">
    <nav-part></nav-part>


    <main>
      <h1 style="text-align: center">{{this.routeName().toUpperCase()}}</h1>
      <router-view></router-view>
    </main>

    <footer title="Footer section. Contains some additional information of this site.">
      <p>Moa, 2020</p>
      <p>Github</p>
      <p>Contact</p>
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
  padding-bottom: 6.85vh;



}

footer {
  
  background-color: rgba(128, 128, 128, 0.025);
  border-top: $border-main;
  width: 100%;
  text-align: center;
  color: rgba(100, 100, 100, 1);
}

</style>
