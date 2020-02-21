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
  
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6.85vh;

  padding-bottom: 6.85vh;

  border-bottom: 2px solid rgba(gray, .25);

  .header-title {
    // background-color: red;
    // margin: 0;
  }

  .header-sub {
    // background-color: orange;
    // font-size: 1.6em;
    // padding: 50px 50px;

    color: rgba(black, .5);

    // margin: 1.6rem 0;
  }
}
</style>