<template>
  <div>
      <div id="signUp" class="panel">
        <h4>Sign Up with Email and Password</h4>
        <div>
          <div v-if="signUp.errors.length" class="board" methods="signUpWithEmail(signUp.email, signUp.password)">
            <b>Please correct the following erros(s):</b>
            <ul>
              <li v-for="error in signUp.errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <!-- Sign up form -->
          <form class="grid-col board" @submit.prevent="checkForm" novalidate="true" >
            <div>
              <label for="signUpName">Name</label>
              <input type="name" id="signUpName" class="input-part" v-model="signUp.name[0]" placeholder="Name" required>
              <div class="order-signs" v-if="signUp.name[1]">Name is validated.</div>
            </div>

            <div>
              <label for="signUpEmail">Email (ID)</label>
              <input type="email" id="signUpEmail" class="input-part" v-model="signUp.email[0]" placeholder="Type email please" required>
            </div>

            <div>
              <label for="signUpPassword">Password</label>
              <input type="password" id="signUpPassword" class="input-part" v-model="signUp.password" placeholder="Type password please" required min="8" max="12">
            </div>

            <div>
              <label for="signUpPhoto">Photo (optional)</label>
              <input type="file" id="signUpPhoto" class="input-part">
            </div>

            <input id="signUpSubmit" type="submit" value="Submit" class="btn" @click="signUpWithEmail()">
          </form>

          <div>
            <!-- <button class="btn" @click="signUpWithEmail(signUp.email, signUp.password)">Sign Up</button> -->
          </div>

        </div>

        <h4>Email verification required.</h4>
        <button class="btn" @click="emailVerification()">Send Email</button>
      </div>

  </div>
</template>

<script>
import {getUserID} from '@/utils/firestoreUtils.js'

export default {
  data() {
    return {
      isSignUp: false,
      signUp: {
        errors: [],
        name: ['', false],
        email: ['', false],
        password: '',
        photo: null
      },
    }
  },
  methods: {
    // * Sign up functions
    signUpWithEmail(email=this.signUp.email[0], password=this.signUp.password) {
      let auth = this.$root.firebase.auth()
      auth.createUserWithEmailAndPassword(email, password).then( () => {
        console.log("Successfully Signed up!");
      })
      .catch(error => {
        console.error(error.code)
        console.log(error.message);

      })
    },
    emailVerification() {
      let user = this.$root.account.currentUser
      user.sendEmailVerification().then( () => {
          console.log("Email sent. Please confirm the email to verify.");
          
        }).catch(error => {
          console.log("Error occurs from sign up with email", error);
  
        })
    },
    // Store the user data in DB 
    saveUserData() {
      let data = {
        name: this.signUp.name,
        author: getUserID,
        created: this.$root.account.currentUser.metadata.creationTime,
        class: 'normal',
        photoUrl: ''
      }
      this.$root.db.collection('users').doc(getUserID).set(data).then(()=>{
        console.log('New user data is successfully stored in DB.')
      }).catch(error => {
        console.error(error)
      })
      console.log(this.$root.db.collection('users').doc(getUserID));
      
    },
    
    /* check: {
      email(){
        let form = this.signUp
        let email = this.signUp.email
        // Check if every elements are true.
        // let result = form.email.every(e => Boolean(e))
        
        // Email validation


        let result = email[1] 

        // If true
        if (result) {
          form.errors.push("Email required.")
        } 
      }
    }, */
  
    checkForm(e) {
      
      // console.log(e);
      e
      let form = this.signUp      
      form.errors = []
      if (!form.name[0]) {
        form.errors.push("Name required.")
        form.name[1] = false
      } else {
        // If name is validated, set true.
        form.name[1] = true
      }

      if (!form.email) {
        form.errors.push("Email required.")
      } /* else if (!this.validEmail(form.email)) {
        form.errors.push("Valid email required.")
      } */
      if (!form.password) {
        form.errors.push("Password required.")
      }

      // When all the form guard is passed. (no error)
      if (!form.errors.length) {
        console.log("no error and it's validated.");
        
        return true 
      }
    },
  },
  watch: {
    signUp: {
      handler(nv, ov) {
        console.log(ov);
        // Name guard
        nv.name[0]
      },
      deep: true

    } 
  },
}
</script>