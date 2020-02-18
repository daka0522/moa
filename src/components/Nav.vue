<template>
  <nav id="nav-public" title="main navigation">
    <router-link to="/" title="go to main default page">Home</router-link>
    <router-link to="/about" title="about the site">About</router-link>

    <router-link to="/public-apps" class="nav-dropdowner" title="public applications">
      Public
      <div class="nav-dropdown-list">
        <router-link :to="{name: 'todo'}">Todo</router-link>
        <router-link :to="{name: 'style'}">Style</router-link>
        <router-link :to="{name: 'canvas'}">Canvas</router-link>
        <router-link to="/community">Community</router-link>
      </div>
    </router-link>

    <router-link to="/private-apps" class="nav-dropdowner" title="private applications">
      Private
      <div class="nav-dropdown-list">
        <router-link :to="{name: 'blog'}">Blog</router-link>
      </div>
    </router-link>

    <router-link to="/sign" v-show="!this.$root.account.currentUser" 
    title="sign in and sign up page" >Sign In</router-link>

    <div id="nav-user" v-if="this.$root.account.currentUser" >
      <router-link tag="img" to='/user' id="link-user" 
      :src="this.$root.account.currentUser.photoURL" width="30" 
      :alt="this.$root.account.currentUser.displayName + '\'s profile photo'"
      title="User profile">

      </router-link>

      <a href="#" @click="this.$root.signOut" title="Sign out">Sign Out</a>
    </div>

    <!-- <options-part id="nav-options"></options-part> -->

    <!-- <router-link to="/dev" class="nav-dropdowner" title="for developer, manager of this site">
      Developer
      <div class="nav-dropdown-list">
        <router-link to="/docs">Docs</router-link>
        <router-link to="/dev/edit-quill">Quill</router-link>
      </div>
    </router-link> -->

  </nav>
</template>

<style lang="scss" scoped>
/* Navigation */
nav {

  // Links
  a {
    padding: .62rem;
    min-width: 6rem;
    text-align: center;
    color: inherit;

    &:hover {
      // border-bottom: $border-main;
      font-weight: 700;
    }

    &:focus {
      // border-bottom: .14rem solid  $purple;
      font-weight: 700;
    }

    &:active {
      color: $purple;
      font-weight: 700;
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
    font-weight: 400;
    visibility: hidden;
    position: absolute;
    background-color: rgb(245, 245, 245);
    // box-shadow: 0 0 1em .1em rgba(200, 200, 200, 0.5) inset;
    margin-top: 2.1em;


    display: flex;
    flex-direction: column;

    & * {
      border-bottom: $border-main;
    }
  }
}

/* #link-user {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
} */

#nav-user {
  margin-top: auto;
  margin-bottom: auto;
  border-radius: .5em;
  
  background-color: rgba(0, 0, 0, .025);

  #link-user {
    cursor: pointer;
    padding: 0 .62rem;
    vertical-align: middle;
  }

}



#nav-public {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
}
</style>