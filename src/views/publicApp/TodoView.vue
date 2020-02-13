<template>
  <div id="todo-view">
    <div>
      <p class="title-sub">This app is a simple todo list manage app. You can add todo list and clear it.</p>
      <div id="demo-notice" v-if="!this.$root.account.currentUser" class="msg-warning">
        <h2>Demo version.</h2>
        <span> Data will not saved if you are not logined.</span>
        <p>If you want to use this app and save your list. Please sign in.</p>
        <router-link to="/signin">Sign in</router-link>
      </div>
    </div>
    <todo-form></todo-form>
  </div>
</template>