<template>
  <header>
    <h1 class="header-title">{{ headerTitle }}</h1>
    <section class="header-sub">
      <slot></slot>
    </section>
  </header>
</template>

<script>
export default {
  props: {
    headerTitle: String, 
    title_sub: String,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  display: flex;
  flex-direction: column;
  
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6.85vh;

  padding-bottom: 4.24vh;

  border-bottom: 2px solid rgba(gray, .15);

  .header-title {
  }

  .header-sub {
    color: $color-sub;
  }
  h1 {
    margin: .62rem;
  }
}
</style>