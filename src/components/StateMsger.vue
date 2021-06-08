<template>
  <div v-if="state" :class="'msg-' + state" class="msg">
    <IconPicker :icon="iconSelector" class="icon" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  props: {
    state: String,
  },
  data() {
    return {}
  },
  computed: {
    iconSelector(): null | string {
      let icon = null
      switch (this.state) {
        case "error":
          icon = "exclamation"
          break
        case "success":
          icon = "check"
          break
        case "warning":
          icon = "exclamation-triangle"
          break
      }
      return icon
    },
  },
})
</script>

<style lang="scss" scoped>
// @ Message
.msg {
  color: rgba(0, 0, 0, 0.5);
  font-weight: lighter;

  background-color: rgba(128, 128, 128, 0.05);

  border-radius: 0.5rem;
  text-align: center;

  padding: 1.6vh 1.6vw;

  margin: 1.6vh 1.6vw;
  display: block;

  &-warning {
    @extend .msg;
    background-color: rgba(255, 166, 0, 0.05);
    border: 0.14rem solid rgba(255, 166, 0, 0.1);
    color: rgba(255, 166, 0, 0.95);
  }

  &-error {
    @extend .msg;
    background-color: rgba(255, 0, 0, 0.05);
    border: 0.14rem solid rgba(255, 0, 0, 0.1);
    color: rgba(255, 0, 0, 0.95);
  }

  &-success {
    @extend .msg;
    background-color: rgba(0, 128, 0, 0.05);
    border: 0.14rem solid rgba(0, 128, 0, 0.1);
    color: rgba(0, 128, 0, 0.95);
  }

  .icon {
    margin: 0 0.6rem;
  }
}
</style>
