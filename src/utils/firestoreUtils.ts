import store from "/@/store"
import firebase from "firebase/app"

// function colRef() {
//   if (this.$root.account.currentUser) {
//     return this.$root.db
//       .collection("user")
//       .doc(this.getUserID)
//       .collection(this.appName)
//   } else {
//     return null
//   }
// }

// function getUserID() {
//   if (this.$root.account.currentUser) {
//     return this.$root.account.currentUser.uid
//   } else {
//     return null
//   }
// }

const colRef = (appName: string) => {
  if (store.state.currentUser) {
    return firebase.firestore()
      .collection("user")
      .doc(getUserID())
      .collection(appName)
  } else {
    return null
  }
}

const getUserID = (): string | undefined => {
  if (store.state.currentUser) {
    return store.state.currentUser.uid
  } else {
    return undefined
  }
}

export { colRef, getUserID }
