<template>
  <div
    v-if="this.$slots.default[0].text.length"
    :class="'msg-' + this.state"
    class="msg"
  >
    <fa-i
      v-if="iconSelector"
      :icon="iconSelector"
      class="icon"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    state: String,
  },
  data() {
    return {
    }
  },
  computed: {
    iconSelector() {
      let icon = null
      switch (this.state) {
        case 'error': icon = 'exclamation'; break;
        case 'success': icon = 'check'; break;
        case 'warning': icon = 'exclamation-triangle'; break;
      }

      return icon
    },
  }
}
</script>

<style lang="scss" scoped>
// @ Message
.msg {
  color: rgba(0, 0, 0, .5);
  font-weight: lighter;
  
  background-color: rgba(128, 128, 128, .05);

  border-radius: .5rem;
  text-align: center;

  padding: 1.6vh 1.6vw;

  margin: 1.6vh 1.6vw;
  display: block;

  &-warning {
    @extend .msg;
    background-color: rgba(255, 166, 0, 0.05);
    border: .14rem solid rgba(255, 166, 0, 0.1);
    color: rgba(255, 166, 0, 0.95);

  }

  &-error {
    @extend .msg;
    background-color: rgba(255, 0, 0, 0.05);
    border: .14rem solid rgba(255, 0, 0,  0.1);
    color: rgba(255, 0, 0, 0.95);

    
  }

  &-success {
    @extend .msg;
    background-color: rgba(0, 128, 0, 0.05);
    border: .14rem solid rgba(0, 128, 0, 0.1);
    color: rgba(0, 128, 0, 0.95);
  }

  .icon {
    margin: 0 .6rem;
  }
}

</style>