<template>
  <div>[{{ icon }}]</div>
  <div id="icon-picker-emoji">
    {{ emoji }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  props: {
    icon: String,
  },
  setup(props) {
    // check, pencilalt, undo, save, trash, exclmation, exclamation-triangle, tools, palltete, certificate, lock, lock-oepn
    console.log("props", props.icon)
    const emoji = ref()
    switch (props.icon) {
      case "certificate":
        emoji.value = "📜"
        break
      case "tools":
        emoji.value = "🛠️"
        break
      case "check":
        emoji.value = "✔️"
        break
      case "exclamation-triangle":
        emoji.value = "⚠️"
        break
      case "save":
        emoji.value = "💾"
        break
      case "pencil-alt":
        emoji.value = "✏️"
        break
      case "undo":
        emoji.value = "↩️"
        break
      case "trash":
        emoji.value = "🗑️"
        break
      case "pallete":
        emoji.value = ""
        break
      case "lock":
        emoji.value = "🔒"
        break
      case "lock-open":
        emoji.value = "🔓"
        break
    }
    return { emoji }
  },
})
</script>

<style lang="scss" scoped>
#icon-picker-emoji {
  font-size: 1.7rem;
  // font-style: italic;
}
</style>
