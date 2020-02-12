<template>
  <div>
    <random-painter></random-painter>
  </div>
</template>
<script>
export default {
  components: {
    'random-painter': () => import('@/components/painter/RandomPainter.vue')
  }
}
</script>