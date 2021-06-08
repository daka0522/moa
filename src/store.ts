import { createStore, Store } from "vuex"
// import firebase from "firebase/app"

interface State {
  signStateMsg: string
  currentUser: any
}

const store: Store<State> = createStore({
  state: {
    signStateMsg: "",
    currentUser: null,
    theme: "light",
  },
  mutations: {
    setSignState(state, msg) {
      state.signStateMsg = msg
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    setTheme(state, theme) {
      state.theme = theme
    },
  },
})

export default store
