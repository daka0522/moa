// Applications
import Vue from 'vue'
import App from './App.vue'
import { mapState } from 'vuex'

Vue.config.productionTip = false

// Utils
import VueQuillEditor from 'vue-quill-editor'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from './firebase_init'

// Components
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Todo from './components/Todo'
import Options from './components/Options.vue'
import Nav from './components/Nav.vue'

Vue.component("sign-in", SignIn)
Vue.component("sign-up", SignUp)

Vue.component("todo-form", Todo)
Vue.component("options-part", Options)
Vue.component("nav-part", Nav)


// Quill Editor Utils
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor,)

firebase.auth().onAuthStateChanged( user => {
  if (user) {
      store.commit("currentUserSet", user)
      store.commit("signStateMsger", `'${user.displayName}' signed in.`)

      if (!user.emailVerified) {
        store.commit("signStateMsger", 'Email verification required. Warning!')
        
      }
  } else {
      store.commit("currentUserSet", null)
      store.commit("signStateMsger", "Please sign in.")
  }
})


const vm = new Vue({
  render: h => h(App),
  mapState,
  router,
  store,
  data: {
    firebase: firebase,
    db: firebase.firestore(),
    axios: axios,
  },
  methods: {
    signOut() {
      if (this.account.currentUser) {
          this.$root.firebase.auth().signOut().then(() => {
              this.$store.commit("signStateMsger", `'${this.acoount.currentUser.displayName}' sign out.`)
              if (this.$route.path != "/signin"){
                router.push('/signin')
              }
          }).catch(error => {
              this.$store.commit("signStateMsger", error.message)
          })
      } else {
          this.$store.commit("signStateMsger", "Nobody signed in yet.")
      }
    },
  },
  
  beforeCreate() {
    /* firebase.auth().onAuthStateChanged( user => {
      if (user) {
          store.commit("currentUserSet", user)
          store.commit("signStateMsger", `'${user.displayName}' signed in.`)
      } else {
          store.commit("currentUserSet", null)
          store.commit("signStateMsger", "Please sign in.")
      }
    }) */
  },
  computed: {
    ...mapState([
      'account',
      'collections',
      'googleDocsUrl'
    ])
  }
})

vm.$mount('#app')

