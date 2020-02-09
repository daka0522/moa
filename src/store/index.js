import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../firebase_init'

const db = firebase.firestore()
db 

Vue.use(Vuex)

// Modules
// 1. firebase account
const account = {
  state: {
    signStateMsg: '',
    currentUser: null
  },
  mutations: {

    signStateMsger(state, msg) {
      state.signStateMsg = msg 
    },
    currentUserSet(state, user) {
      state.currentUser = user 
    }

  }
}
// 2. firebase firestore collections
const collections = {
  state: {
    list: ['poem', 'todo', 'docs', 'writings']
  },
  mutations: {
    addCollection(state, item) {
      state.list.push(item)
    }
  }
}

// 3. Google Drive Doc Web Publishing Addresses
const googleDocsUrl = {
  /* state: {
    list: db.collection('googleDocsUrl').get().then(res => {
      return res.data()
    })
  },
  mutations: {
    listNewDoc(state, payload) {
      if (!state[payload.location]) {
        state[payload.location] = []
      }
      state[payload.location].push(payload.doc)
      db.collection('googleDocsUrl').doc(payload.location).set(payload.doc)
    }
  } */
}

// Store Instance
const store = new Vuex.Store({
  modules: {
    account,
    collections,
    googleDocsUrl
  }
    

  })

export default store 