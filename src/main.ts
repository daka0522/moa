import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import  "./init"
import firebase from "firebase/app"

const app = createApp(App)

app.use(router)

// Components
import HeaderUnit from "./components/HeaderUnit.vue"
import StateMsger from "./components/StateMsger.vue"

app.component("header-unit", HeaderUnit)
app.component("state-msger", StateMsger)






app.mount('#app')

// Global Properties & Type Declarations
app.config.globalProperties.$firebase = firebase 
app.config.globalProperties.$db = firebase.firestore()

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $firebase: typeof firebase 
    $db: firebase.firestore.Firestore;
  }
}