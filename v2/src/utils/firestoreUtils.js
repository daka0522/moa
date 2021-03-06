function colRef() {
  if (this.$root.account.currentUser) {
    return this.$root.db.collection('user').doc(this.getUserID).collection(this.appName)
  } else {
    return null
  }
}

function getUserID() {
  if (this.$root.account.currentUser) {
    return this.$root.account.currentUser.uid
  } else {
    return null
  }
}

export  {colRef, getUserID}