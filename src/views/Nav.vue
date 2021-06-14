<template>
  <nav
    id="nav-public"
    title="main navigation"
  >
    <router-link
      to="/"
      title="go to main default page"
    >
      Home @
    </router-link>
    <router-link
      to="/about"
      title="about the site"
    >
      About @
    </router-link>

    <router-link
      to="/public"
      class="nav-dropdowner"
      title="public applications"
    >
      Public
      <div class="nav-dropdown-list">
        <router-link :to="{ name: 'todo' }">
          Todo
        </router-link>
        <router-link :to="{ name: 'style' }">
          Style @
        </router-link>
        <router-link :to="{ name: 'canvas' }">
          Canvas
        </router-link>
        <router-link :to="{ name: 'community' }">
          Community @
        </router-link>
        <router-link :to="{ name: 'chatroom' }">
          Chat Room
        </router-link>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'private-app' }"
      class="nav-dropdowner"
      title="private applications"
    >
      Private
      <div class="nav-dropdown-list">
        <!-- <router-link :to="{ name: 'blog' }">
          Blog
        </router-link> -->
      </div>
    </router-link>

    <router-link
      v-show="!user"
      :to="{ name: 'signin' }"
      title="sign in and sign up page"
    >
      Sign In
    </router-link>

    <div
      v-if="user"
      id="nav-user"
    >
      <img
        id="nav-user-icon"
        :src="user.photoURL"
        :alt="user.displayName + '\'s profile photo'"
        @click="showProfile = !showProfile"
      >

      <div
        v-if="showProfile"
        id="nav-user-profile"
      >
        <div id="nav-user-profile-info">
          <h3>{{ user.displayName }}</h3>
          <img
            :src="user.photoURL"
            :alt="user.displayName + '\'s profile photo'"
          >
          <p>{{ user.email }}</p>
        </div>
        <div id="nav-user-profile-tool">
          <router-link :to="{ name: 'user' }">
            Profile
          </router-link>
          <button
            class="btn-basic"
            title="Sign out"
            @click="$signOut"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>

    <Options id="nav-options" />

    <router-link
      v-if="user && user.email === 'daka0522@gmail.com'"
      to="/dev"
      class="nav-dropdowner"
      title="for developer, manager of this site"
    >
      Developer
      <div class="nav-dropdown-list">
        <!-- <router-link to="/dev/docs">Docs</router-link> -->
        <!-- <router-link to="/dev/edit-quill">Quill</router-link> -->
      </div>
    </router-link>
  </nav>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      showProfile: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
  },
})
</script>

<style lang="scss" scoped>
$bg-main: rgba(255, 255, 255, 0.74);
$color-main: black;
$border-main: 0.14rem solid rgba(128, 128, 128, 0.1);

/* Navigation */
nav {
  font-size: small;

  /* Links */
  a {
    color: inherit;
    padding: 0.62rem;
    min-width: 6rem;
    text-align: center;

    &:hover,
    &:focus,
    &:active {
      font-weight: 700;
    }
  }

  /* Nav dropdown */
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
    background-color: $bg-main;
    box-shadow: 0 0 0.5em 0.05em rgba(128, 128, 128, 0.375);
    border-radius: 0.5em;
    color: $color-main;

    margin-top: 1.6rem;

    display: flex;
    flex-direction: column;

    & * {
      border-bottom: $border-main;
    }
  }
}

#nav-user {
  margin-top: auto;
  margin-bottom: auto;
  min-width: 6rem;
  text-align: center;

  &-icon {
    vertical-align: middle;
    cursor: pointer;

    margin: 0 0.62rem;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    box-shadow: 0 0 0.15em 0.05em rgba(128, 128, 128, 0.075);
  }

  &-profile {
    // background-color: rgba(255, 255, 255, 0.95);
    position: absolute;
    width: 12em;
    min-width: 10em;
    margin-top: 0.3rem;
    border-radius: 0.5em;
    padding: 1.6vh 1.6vw;
    box-shadow: 0 0 0.5em 0.05em rgba(128, 128, 128, 0.375);

    /* Content layout */
    &-info {
      display: grid;
      grid-gap: 1rem;
      place-items: center;
      margin: 1.6rem auto;

      h3 {
        margin: 0;
      }

      img {
        width: 5rem;
        height: 5rem;
        box-shadow: 0 0 0.5em 0.05em rgba(128, 128, 128, 0.375);
        border-radius: 50%;
      }
    }
    &-tool {
      display: grid;
      margin-top: 1rem;
      border-radius: 0.5em;
      background-color: rgba(128, 128, 128, 0.1);
    }
  }
}

#nav-public {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
}
</style>
