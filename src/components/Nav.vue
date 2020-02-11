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
    </div>


    <div class="nav-flex-right">
      <router-link to="/signin">Sign In</router-link>
      
      <!-- <router-link to="/dev">Dev</router-link> -->
      <!-- <router-link to="/signin" v-show="!this.$root.account.currentUser">Sign In</router-link> -->
      

      <div id="nav-private" v-if="this.$root.account.currentUser">
        <router-link to="/dev/edit-quill">Quill</router-link>
        <!-- <router-link to="/dev/edit-tiptap">Tiptap</router-link>
          <router-link to="/dev/edit-editorjs">Editor JS</router-link> -->
        <div id="nav-private-sign">

          <router-link to='/user' id="link-user">
            User
            <img :src="this.$root.account.currentUser.photoURL" width="32px"
              :alt="this.$root.account.currentUser.displayName + '\'s profile photo'">
          </router-link>
          <button class="btn-small" @click="this.$root.signOut">Sign Out</button>
        </div>
      </div>

      <options-part id="nav-options"></options-part>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
/* Navigation */
nav {
  background-color: rgba(0, 0, 0, .05);
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;

  // Links
  a {
    padding: .8em;

    &:hover {
      background-color: $green;
      color: white;
      box-shadow: 0 0 .5em .1em rgba($purple, .25) inset;
    }
    &:focus{
      background-color: $purple;
      color: white;
      box-shadow: 0 0 .5em .1em rgba($green, .25) inset;
    }
    transition: bakckground-color .5s ease-in-out, color .25s ease
  }
  // Nav left panel (Main)
  #nav-public {
    display: flex;
    flex-wrap: wrap;

  }

  // Nav right panel
  .nav-flex-right {
    display: flex;
    align-items: center;

    #nav-private {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    #nav-options {
      justify-self: flex-end;
    }
  }

  // Nav dropdown
  .nav-dropdowner {
    &:hover .nav-dropdown-list {
      visibility: visible;
    }
  }

  .nav-dropdown-list {
    visibility: hidden;
    position: absolute;
    background-color: rgba(250, 250, 250, 0.95);
    box-shadow: 0 0 1em .1em rgba(200, 200, 200, 0.5) inset;
    padding: 0 1.6em 0 1.6em;
    text-align: center;
    margin-top: .8em;

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

#nav-private-sign {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, .05);
}
</style>