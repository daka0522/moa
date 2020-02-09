function docRef() {
  if (this.$root.account.currentUser) {
    return this.$root.db.collection(this.collectionName).doc(this.docID)
  } else {
    console.error("Need login! from utils")
    return null
  }
}
function getUserID() {
  if (this.$root.account.currentUser) {
    return this.$root.account.currentUser.uid
  } else {
    console.error("Need login! from utils");
    return null
  }
}

export  {docRef, getUserID}