import { createApp, defineComponent } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./init"
import firebase from "firebase/app"
const app = createApp(App)

app.use(router)
app.use(store)

// Components
import HeaderUnit from "./components/HeaderUnit.vue"
import StateMsger from "./components/StateMsger.vue"
import Options from "./components/Options.vue"
import IconPicker from "./components/IconPicker.vue"

app.component("HeaderUnit", HeaderUnit)
app.component("StateMsger", StateMsger)
app.component("Options", Options)
app.component("IconPicker", IconPicker)
app.component("FaI", defineComponent({}))

app.mount("#app")

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit("setCurrentUser", user)
    store.commit("setSignState", `'${user.displayName}' signed in.`)

    if (!user.emailVerified) {
      store.commit("setSignState", "Email verification required. Warning!")
    }
  } else {
    store.commit("setCurrentUser", null)
    store.commit("setSignState", "Please sign in.")
  }
})

// Global Properties & Type Declarations
app.config.globalProperties.$firebase = firebase
app.config.globalProperties.$db = firebase.firestore()
app.config.globalProperties.$signOut = () => {
  if (store.state.currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.go(0)
        store.commit(
          "setSignState",
          `'${store.state.currentUser.displayName}' sign out.`
        )
      })
      .catch((error) => {
        store.commit("setSignState", error.message)
      })
  } else {
    store.commit("setSignState", "Nobody signed in yet.")
  }
}

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $firebase: typeof firebase
    $db: firebase.firestore.Firestore
    $store: typeof store
    // $router: Router
    $signOut: () => {}
  }
}
