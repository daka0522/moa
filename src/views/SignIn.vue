<template>
    <div>
      <p class="noticeMsg signFormItem">{{this.$root.account.signStateMsg}}</p>

      <!-- Sign In -->
      <sign-in></sign-in>
      <sign-up></sign-up>

      <div class="panel" v-if="this.$root.account.currentUser">
        <router-link to="/dev">Development</router-link>
        <ul>
          <h2>Editors</h2>
          <router-link to="/dev/edit-quill">Edit with Quill</router-link>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>