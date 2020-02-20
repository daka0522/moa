const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin')

admin.initializeApp()

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text 
  const snapshot = await admin.database().ref('/messages').push({original: original})
  res.redirect(303, snapshot.ref.toString())
})

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    const original = snapshot.val()
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase()

    return snapshot.ref.parent.child('uppercase').set(uppercase)
    
  })