<template>
  <header>
    <h1 class="header-title">
      {{ headerTitle }}
    </h1>
    <section class="header-sub">
      <slot />
    </section>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core"

  export default defineComponent({
    props: {
      headerTitle: String,
      title_sub: String,
    },
  })
</script>

<style lang="scss" scoped>
  // header {
  //   text-align: center;
  //   display: flex;
  //   flex-direction: column;

  //   width: 100%;
  //   margin-left: auto;
  //   margin-right: auto;
  //   margin-bottom: 6.85vh;

  //   padding-bottom: 4.24vh;

  //   border-bottom: 2px solid rgba(gray, .15);

  //   .header-title {
  //   }

  //   .header-sub {
  //     color: $color-sub;
  //   }
  //   h1 {
  //     margin: .62rem;
  //   }
  // }
</style>
