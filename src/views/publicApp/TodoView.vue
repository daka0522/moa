<template>
  <div id="todo-view">
    <div>
      <p class="title-sub">
        This app is a simple todo list manage app. You can add todo list and clear it.
      </p>
      <div
        v-if="!this.$root.account.currentUser"
        id="demo-notice"
        class="msg-warning"
      >
        <h2>Demo version.</h2>
        <span> Data will not saved if you are not logined.</span>
        <p>If you want to use this app and save your list. Please sign in.</p>
        <router-link to="/signin">
          Sign in
        </router-link>
      </div>
    </div>
    <todo-app />
  </div>
</template>
<script>
export default {
  components: {
    todoApp: () => import('@/components/Todo')
  }
}
</script>