import { createStore, Store } from "vuex"
// import firebase from "firebase/app"

interface State {
  signStateMsg: string
  currentUser: any
}

const store: Store<State> = createStore({
  state() {
    return {
      signStateMsg: "",
      currentUser: null,
    }
  },
  mutations: {
    setSignState(state, msg) {
      state.signStateMsg = msg
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
  },
})

export default store
