<template>
  <nav>
    <div id="nav-public">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>

      <router-link to="/public-apps" class="nav-dropdowner">
        Public App
        <div class="nav-dropdown-list">
          <router-link :to="{name: 'todo'}">Todo</router-link>
          <router-link :to="{name: 'style'}">Style</router-link>
          <router-link :to="{name: 'canvas'}">Canvas</router-link>
        </div>
      </router-link>

      <router-link to="/private-apps" class="nav-dropdowner">
        Private App
        <div class="nav-dropdown-list">
          <router-link :to="{name: 'blog'}">Blog</router-link>
        </div>
      </router-link>

      <router-link to="/docs">Docs</router-link>
      <router-link to="/community">Community</router-link>
      <router-link to="/dev/edit-quill">Quill</router-link>
    </div>

    <!-- <router-link to="/dev">Dev</router-link> -->
    <!-- <router-link to="/signin" v-show="!this.$root.account.currentUser">Sign In</router-link> -->

    <div >
      <router-link to="/signin" v-show="!this.$root.account.currentUser">Sign In</router-link>

      <div id="nav-user"  v-if="this.$root.account.currentUser">
        <router-link to='/user' id="link-user">
          <img :src="this.$root.account.currentUser.photoURL" width="30" :alt="this.$root.account.currentUser.displayName + '\'s profile photo'">
        </router-link>
        <button class="btn-small" @click="this.$root.signOut">Sign Out</button>
      </div>
    </div>
    <options-part id="nav-options"></options-part>
  </nav>
</template>

<style lang="scss" scoped>
/* Navigation */
nav {

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  // Links
  a {
    padding: .62rem;
    min-width: 5rem;
    text-align: center;

    &:hover {
      border-bottom: $border-main;
    }
    &:focus{
      border-bottom: .14rem solid  $purple;
    }
    &:active {
      color: $purple;
    }
  }


  // Nav dropdown
  .nav-dropdowner {
    display: flex;
    justify-content: center;
    &:hover .nav-dropdown-list {
      visibility: visible;
    }
  }

  .nav-dropdown-list {
    visibility: hidden;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.1);
    // box-shadow: 0 0 1em .1em rgba(200, 200, 200, 0.5) inset;
    margin-top: 2.4em;

    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(3.2em, 1fr));
  }
}

#link-user {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

#nav-user {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, .025);
}

#nav-public {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
}
</style>