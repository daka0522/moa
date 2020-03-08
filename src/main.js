// Applications
import Vue from 'vue'
import App from './App.vue'
import {
    mapState
} from 'vuex'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.config.productionTip = false

// Utils
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from './firebase_init'

// Components
import Options from './components/Options.vue'
import Nav from './components/Nav.vue'
import StateMsger from '@/components/StateMsger.vue'
import Buttons from '@/components/Buttons.vue'
import HeaderUnit from '@/components/HeaderUnit.vue'

Vue.component("state-msger", StateMsger)

Vue.component("options-part", Options)
Vue.component("nav-part", Nav)

Vue.component("btn-unit", Buttons)

Vue.component('header-unit', HeaderUnit)


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faPencilAlt,
    faUndo,
    faSave,
    faTrash,
    faExclamation,
    faExclamationTriangle,
    faTools,
    faPalette,
    faCertificate,
    faLock,
    faLockOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({
    faCheck,
    faPencilAlt,
    faUndo,
    faSave,
    faTrash,
    faExclamation,
    faExclamationTriangle,
    faTools,
    faPalette,
    faCertificate,
    faLock,
    faLockOpen
})
Vue.component('fa-i', FontAwesomeIcon)


/* // Quill Editor Utils
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, ) */



firebase.auth().onAuthStateChanged(user => {
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
                    // Reload the page.
                    this.$router.go(0)
                    this.$store.commit("signStateMsger", `'${this.acoount.currentUser.displayName}' sign out.`)
                }).catch(error => {
                    this.$store.commit("signStateMsger", error.message)
                })
            } else {
                this.$store.commit("signStateMsger", "Nobody signed in yet.")
            }
        },
    },
    computed: {
        ...mapState([
            'account',
            'collections',
            'googleDocsUrl'
        ])
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
})

vm.$mount('#app')