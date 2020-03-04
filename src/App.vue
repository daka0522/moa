<template>
  <div id="app" :theme="theme">
    <nav-part />
    <main>
      <router-view />
    </main>

    <footer>
      <div class="foot-item">
        <a href="https://github.com/daka0522/moa" target="_blank" rel="noopener">Github</a>
      </div>

      <p>Moa, 2020</p>

      <div class="foot-item">
        <span>Contact</span>
        <a href="mailto:daka0522@gmail.com">Email</a>
      </div>

      <div id="options">
        <label for="theme">Dark Theme</label>
        <input type="checkbox" name="theme" id="theme" v-model="isDarkTheme">
      </div>
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
      isDarkTheme: false,
      theme: 'default'
    }
  } ,
 
  methods: {
    routeName(){
      if (this.$route.name) {
        return this.$route.name
      } else {
        return "no name"
      }
    },
  },
  computed: {
    
  },
  watch: {
    isDarkTheme(nv) {
      if (nv) {
        this.theme = 'dark'
      } else {
        this.theme = 'default'
      }
    }
  }
}
</script>

<style lang="scss">
#app {
}
nav {
  border-bottom: $border-main;
  background-color: rgba(128, 128, 128, .025);
}

main {
  min-height: 72.6vh;


  width: 90vw;
  max-width: 80em;
  
  margin: 0 auto;
  padding: 4.24vh 4.24vw;
  padding-bottom: 11.09vh;
}

footer {
  font-size: small;
  padding: 1.6vh 1.6vw;
  background-color: rgba(128, 128, 128, 0.05);
  border-top: $border-main;
  text-align: center;
  color: rgba(100, 100, 100, 1);

  display: flex;
  justify-content: space-between;

  .foot-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}

</style>
