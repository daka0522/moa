<template>
  <footer>
    <div class="foot-item">
      <a href="https://github.com/daka0522/moa" target="_blank" rel="noopener"
        >Github</a
      >
    </div>

    <p>Moa, 2021</p>

    <div class="foot-item">
      <span>Contact</span>
      <a href="mailto:daka0522@gmail.com">Email</a>
    </div>

    <div id="options">
      <label for="theme">Dark Theme</label>
      <!-- <div>{{ isDarkTheme }}</div> -->
      <!-- <div>{{ $store.state.theme }}</div> -->
      <input id="theme" v-model="isDarkTheme" type="checkbox" name="theme" />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const store = useStore()
    const isDarkTheme = ref(false)

    onMounted(() => {
      if (store.state.theme == "dark") {
        isDarkTheme.value = true
      }
    })

    // store.commit
    watch(isDarkTheme, (newValue) => {
      // If isDarktheme new value is set true up
      if (newValue) {
        store.commit("setTheme", "dark")
      } else {
        store.commit("setTheme", "light")
      }
    })
    return { isDarkTheme }
  },
})
</script>

<style lang="scss" scoped>
footer {
  font-size: small;
  padding: 1.6vh 1.6vw;
  background-color: rgba(128, 128, 128, 0.05);
  // border-top: $border-main;
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
