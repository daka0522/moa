<template>
  <Nav />
  <div>
    <strong>List to complete</strong>
    <div
      v-for="item in list"
      :key="item"
    >
      <span>{{ Object.keys(item)[0] }} : </span>
      <span
        v-if="Object.values(item)[0] == 1"
        style="color: green"
      >
        <!-- {{ Object.values(item)[0] == 1 ? "Done" : "Not" }} -->
        &#10004;
      </span>
      <span
        v-else
        style="color: red"
      >
        <!-- {{ Object.values(item)[0] == 1 ? "Done" : "Not" }} -->
        &#10008;
      </span>
    </div>
  </div>
  <main>
    <router-view />
  </main>
  <Foot />
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  onBeforeMount,
  watch,
} from "vue"
import { useStore } from "vuex"
import Foot from "./views/Foot.vue"
import Nav from "./views/Nav.vue"

export default defineComponent({
  name: "App",
  components: {
    Foot,
    Nav,
  },
  setup() {
    const store = useStore()

    type Theme = "light" | "dark"
    // Theme
    // 1. Get theme from local storage
    const getTheme = () => {
      const savedTheme = localStorage.getItem("theme")
      // If there's saved theme in local storage
      // Set document to the theme and set the state of theme in store
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme)
        store.commit("setTheme", savedTheme)
      } else {
        setTheme("light")
      }
    }
    const setTheme = (theme: Theme) => {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
    }

    const theme: ComputedRef<Theme> = computed(() => store.state.theme)
    watch(theme, (newValue) => {
      setTheme(newValue)
    })
    onMounted(() => {
      // getTheme()
    })
    onBeforeMount(() => {
      getTheme()
    })
  },
  data() {
    return {
      list: [
        // 1: Done, 0: Not
        { app: 1 },
        { home: 1 },
        { nav: 1 },
        { foot: 1 },
        { PublicApp: 1 },
        { todo: 1 },
        { style: 1 },
        { canvas: 0 },
        { community: 1 },
        { chatroom: 1 },
        { auth: 0 },
        { signin: 1 },
        { signup: 0 },
        { user: 0 },
      ],
    }
  },
  methods: {
    routeName() {
      if (this.$route.name) {
        return this.$route.name
      } else {
        return "no name"
      }
    },
  },
})
</script>

<style lang="scss">
@import "./styles/main.scss";

nav {
  border-bottom: $border-main;
  background-color: rgba(128, 128, 128, 0.025);
}

main {
  min-height: 72.6vh;
  max-width: 80em;

  margin: 0 auto;
  padding: 4.24vh 1.62vw;
  padding-bottom: 11.09vh;
}

a {
  color: inherit;
}
</style>
