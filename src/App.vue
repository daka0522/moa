<template>
  <div id="app">
    <navigator />
    <div>App</div> 
    <foot />
  </div>
</template>

<script>
import Foot from "@/views/Foot.vue"
import Nav from "@/views/Nav.vue"

export default {
  components: {
    foot: Foot,
    navigator: Nav
  }
  
}
</script>