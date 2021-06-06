<template>
  <Nav />
  <main>
    <router-view></router-view>
  </main>
  <Foot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Foot from "./views/Foot.vue"
import Nav from "./views/Nav.vue"

export default defineComponent({
  name: 'App',
  components: {
    Foot,
    Nav
  },
  data() {
    return {
      isDarkTheme: false,
      theme: 'default'
    }
  },
  setup() {
    // console.log(firebase)
  },
  methods: {
    routeName(){
      if (this.$route.name) {
        return this.$route.name
      } else {
        return "no name"
      }
    },
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
})
</script>

<style lang="scss">
@import "./styles/main.scss";

#app {
}
nav {
  border-bottom: $border-main;
  background-color: rgba(128, 128, 128, .025);
}

main {
  min-height: 72.6vh;
  max-width: 80em;
  
  margin: 0 auto;
  padding: 4.24vh 1.62vw;
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
