<template>
  <button :class="[role ? `btn-${role}` : 'btn', `btn-${size}`]" @click="$emit('click')">
    <fa-i v-if="icon" :icon="icon" class="icon"></fa-i>
    <!-- <span v-if="role === 'read'">@</span> -->
    <!-- <fa-i :icon="check"></fa-i> -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    role: String,
    size: String, 
    icon: String,
  },
  methods: {

  },
  computed: {
    /* iconSelector() {
      switch (this.role) {
        case 'create': 
      }
    } */
  }

  
}
</script>

<style lang="scss" scoped>
// @ Button class 
.btn {
  // Default and common properties
  background-color: rgb(250, 250, 250);
  box-shadow: $shadow-primary;
  padding: $box-primary;
  border-style: none;
  margin: .8em;
  cursor: pointer;
  
  font-weight: bold;
  font-size: .85rem;
  color: rgba(0, 0, 0, 0.8);

  // Effects 
  &:hover {
    background-color: rgba(0, 60, 120, 0.6);
    color: white;
  }

  &:active {
    background-color: rgb(20, 140, 0);
    color: white;
    transform: scale(.9);
  }

  // Samll size
  &-small {
    // @extend .btn;
    padding: $box-small;
    // margin: $box-small;
  }


 // @ Roles
  &-create {
    @extend .btn; 
    background-color: green;
    color: white;
  }
  &-read {
    @extend .btn;
    background-color: yellow;
    // color: white;
  }
  &-update {
    @extend .btn;
    background-color: blue;
    color: white;
  }

  &-delete {
    @extend .btn;
    background-color: red;
    color: white;
  }
  

  &-basic {
    @extend .btn;
    padding: .2rem .8rem;
    box-shadow: unset;
    border: 1px solid rgba(128, 128, 128, 0.25);
    height: initial;
    font-weight: unset;
  }
}

.create {
  // background-color: red;
}

.icon {
  margin-right: .5rem;
}
</style>