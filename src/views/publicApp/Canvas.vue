<template>
  <div>
    <header-unit header-title="Canvas Projects">
      <p>Visual artistic programs</p>
    </header-unit>
    <section>
      <h1>Random Painter</h1>
      <p>
        This random painter can generate random curve image with a given text.
      </p>
      <p>Click the draw and type what you want.</p>
      <random-painter />
    </section>
  </div>
</template>
<script lange="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    components: {
      "random-painter": () => import("/@/components/painter/RandomPainter.vue"),
    },
  })
</script>
