<template>
  {{ user }}
  <section
    v-if="user"
    id="user"
    class="panel"
  >
    <h1>Profile</h1>

    <div id="user-profile">
      <div
        id="user-email"
        class="profile-item"
      >
        <h3>ID</h3>
        <p>{{ user.email }}</p>
      </div>

      <div
        id="user-name"
        class="profile-item"
      >
        <h3>Name</h3>
        <p v-if="!isEditable">
          {{ user.displayName }}
        </p>
        <input
          v-else
          v-model="userEdit.name"
          class="input-part-basic"
          placeholder="Edit your name here"
        >
      </div>

      <div
        id="user-photo"
        class="profile-item"
      >
        <h3>Photo</h3>
        <img
          :src="user.photoURL"
          width="150px"
          height="150px"
          :alt="user.displayName + '\'s profile photo'"
        >
        <div v-if="isEditable">
          <input
            v-if="isEditable"
            id="photoFile"
            type="file"
            value="upload"
            class="input-part"
          >
          <button
            class="btn"
            @click="onRandomPainter = !onRandomPainter"
          >
            Random Painter
          </button>
          <input
            ref="uploadPhoto"
            type="submit"
            class="btn"
            value="Update Photo"
            @click="uploadPhoto()"
          >
          <random-painter
            v-if="onRandomPainter"
            ref="randomPainter"
            class="panel"
          />
        </div>
      </div>

      <div
        id="user-history"
        class="profile-item"
      >
        <h3>History</h3>
        <div>
          <p>Creation Time: {{ user.metadata.creationTime }}</p>
          <p>Last Sign In Time: {{ user.metadata.lastSignInTime }}</p>
        </div>
      </div>

      <div
        id="user-state"
        class="profile-item"
      >
        <h3>Verified</h3>
        <div v-if="user.emailVerified">
          <IconPicker
            icon="certificate"
            style="color: green"
            title="Email verifed"
          />
        </div>
        <div v-else>
          <IconPicker
            icon="certificate"
            style="color: gray; margin: 0 0.62rem"
            title="Require email verifed"
          />
          <span>Email verification require. Send email.</span>
        </div>
      </div>

      <div
        id="user-etc"
        class="profile-item"
      >
        <!-- <p>Using Apps</p> -->
      </div>
    </div>

    <div id="user-edit">
      <button
        id="user-edit-btn"
        class="btn"
        @click="isEditable = !isEditable"
      >
        {{ isEditable ? "Back" : "Edit" }}
      </button>
      <div
        v-if="isEditable"
        id="user-edit-tools"
      >
        <button
          class="btn-save"
          @click="saveUserEdit()"
        >
          Save
        </button>
        <!-- <button class="btn">
          Delete
        </button> -->
      </div>
    </div>

    <!-- <button class="btn" @click="createUserData(currentUser)">Create User Data</button> -->
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from "vue"

export default defineComponent({
  name: "User",
  components: {
    "random-painter": () => import("/@/components/painter/RandomPainter.vue"),
  },
  async setup() {
    ref
    // computed( () => this.$store.state.currentUser)
    const ins = await getCurrentInstance()
    const globalProperties = ins.appContext.config.globalProperties
    const isEditable = ref(false)
    const userEdit = ref({ name: "", photoURL: "" })
    const onRandomPainter = ref(false)

    const user = computed(() => globalProperties.$store.state.currentUser)
    console.log("globalProp?", globalProperties)
    console.log("user?", user)

    return { user, isEditable, userEdit, onRandomPainter }
  },
  data() {
    return {
      // isEditable: false,
      // userEdit: {
      //   name: "",
      //   photoURL: null,
      // },
      // // Show random painter
      // isRP: false,
    }
  },
  computed: {
    // user() {
    //   return this.$store.state.currentUser
    // },
  },
  mounted() {
    // this.userEdit.name = this.$root.account.currentUser.displayName
  },
  methods: {
    saveUserEdit() {
      if (this.userEdit.name) {
        this.user.updateProfile({
          displayName: this.userEdit.name,
        })
      }

      this.isEditable = false
      /* if (this.userEdit.photoURL) {
        this.currentUser.photoURL = this.userEdit.photoURL
      } */
    },

    uploadPhoto() {
      // Get elements
      let fileButton = this.$refs.uploadPhoto

      // Listen for file selection
      fileButton.addEventListener("change", function (e) {
        // Get file
        let file = e.target.files[0]
        file
        // Create storage ref
        this.$firebase.storage().ref("user")
      })
    },
    createUserData() {
      const user = this.user
      let data = {
        userdata: {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          class: null,
          created: user.metadata.creationTime,
        },
      }

      this.$db
        .collection("user")
        .doc(user.uid)
        .set(data)
        .then(() => {
          // console.log('create User data! success.')
        })
    },
  },
})
</script>

<style lang="scss" scoped>
#user {
  max-width: 50em;
  margin: auto;

  display: grid;

  &-profile {
    display: grid;
    // grid-template-rows: repeat(auto-fit, minmax(1em, 1fr));
    grid-gap: 1.6em;

    .profile-item {
      // background-color: antiquewhite;

      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;

      h3 {
        margin: 0;
        font-weight: unset;
        color: darkgray;
        min-width: 5em;
      }
    }
  }

  &-edit {
    display: flex;
  }
}
</style>
