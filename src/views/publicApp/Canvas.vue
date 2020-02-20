<template>
  <div>
    <section>
      <h1>Random Painter</h1>
      <p>This random painter can generate random curve image with a given text.</p>
      <p>Click the draw and type what you want.</p>
      <random-painter />
    </section>
  </div>
</template>
<script>
export default {
  components: {
    'random-painter': () => import('@/components/painter/RandomPainter.vue')
  }
}
</script>