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
      <input id="theme" v-model="isDarkTheme" type="checkbox" name="theme" />
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    setup() {},
    data() {
      return {
        isDarkTheme: false,
      }
    },
  })
</script>
