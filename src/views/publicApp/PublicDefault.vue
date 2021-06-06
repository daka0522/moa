<template>
  <div>
    <h1>Default</h1>
    <div
      v-if="$route.name === 'public-app'"
      id="public-links"
    > 
      <!-- <router-link :to="{name: 'todo'}">
        Todo
      </router-link> -->
      <!-- <router-link :to="{name: 'style'}">
        Style
      </router-link>
      <router-link :to="{name: 'canvas'}">
        Canvas
      </router-link> -->
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#public-links a{
    margin: 0 1rem;
}
</style>