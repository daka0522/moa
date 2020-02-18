<template>
  <section id="signUp" class="panel">
    <h1 style="text-align:center">Sign Up with Email and Password</h1>

    <div>
      <div>
        <!-- Main state message -->
        <state-msger :state="this.mainState.state">{{this.mainState.msg}}</state-msger>
        
        <!-- Check Form errors -->
        <div id="checkFormError" v-if="errors.length" >
          <state-msger state="error" v-for="error in errors" :key="error" >{{error}}</state-msger>
        </div>
      </div>

      <!-- 1. Sign up form: Email & Password -->
      <form v-if="!isSignedUp" class="panel-col" @submit.prevent="checkForm()" novalidate="true" >
        <!-- A. Email  -->
        <label for="signUpEmail">Email (ID)</label>
        <input type="email" id="signUpEmail" class="input-part" 
                v-model="signUp.email[0]" placeholder="Type your email please. Required." required >

        <!-- B. Password -->
        <label for="signUpPassword">Password (8~20 characters)</label>
        <input type="password" id="signUpPassword" class="input-part" 
                v-model="signUp.password.value1" placeholder="Type your password please. Required." required 
                minlength="8" maxlength="20">
        <input type="password" id="signUpPassword2" class="input-part" 
                v-model="signUp.password.value2" placeholder="Type your password again please. Required." required 
                minlength="8" maxlength="20">

        <!-- C. Submit button -->
        <input id="signUpSubmit" type="submit" value="Sign Up" class="btn" ref="signUpSubmit" disabled>
      </form>

    <!-- 2. Name & Phto: optional  -->
    <form  v-else class="panel-col" @submit.prevent="saveUserData" novalidate="true" >
        <!-- A. Name  -->
        <label for="signUpName">Name (3~15 characters)</label>
        <input type="name" id="signUpName" class="input-part" 
                v-model="setUser.name[0]" placeholder="Type your name or nickname please" 
                minlength="3" maxlength="15" >
        <!-- <div class="order-signs" v-if="signUp.name[1]">Name is validated.</div> -->

        <!-- B. Photo -->
        <label for="signUpPhoto">Photo (optional)</label>
        <input type="file" id="signUpPhoto" class="input-part" @change="previewImage" accept="image/*">
        <div class="image-preview" v-if="setUser.photo.data">
            <img class="preview" :src="setUser.photo.data" width="450">
        </div>

        <!-- Submit button -->
        <input id="userDataSubmit" ref="userDataSubmit" type="submit" 
        value="Save" class="btn" disabled>

      </form>
        <!-- <button @click="uploadPhoto">Up</button> -->

        <!-- <button class="btn">Pass</button> -->
    </div>

    <div id="emailVerification" class="panel-col" v-if="!this.$root.account.currentUser.emailVerified">
      <h3 style="text-align:center">Email verification required.</h3>
      <button class="btn" @click="emailVerification()">Send Email</button>
    </div>

  </section>
</template>

<script>
  import {
    getUserID
  } from '@/utils/firestoreUtils.js'
  getUserID

  export default {
    data() {
      return {
        isSignedUp: true,
        requireEmailVerified: true, 
        mainState: {
          msg: '',
          state: ''
        },
        errors: [],
        signUp: {
          email: ['', false],
          password: {
            value1: '',
            value2: '',
            valid: false 
          },
        },
        setUser: {
          name: ['', false],
          photo: {
            data: null,
            name: '',
            url: null,
            valid: false
          }
        },
        // imageData: '',
      }
    },
    methods: {
      // 1.
      // * Sign up functions
      signUpWithEmail(email=this.signUp.email[0], password=this.signUp.password.value1) {
        let auth = this.$root.firebase.auth()
        return auth.createUserWithEmailAndPassword(email, password).then(() => {
            this.stateMsger("Successfully Signed up!", "success")
            this.isSignedUp = true 
          })
          .catch(error => {
            this.stateMsger(error.message, "error")
          })
      },
      emailVerification() {
        if (this.$root.account.currentUser) {
          let user = this.$root.account.currentUser
          user.sendEmailVerification().then(() => {
            this.stateMsger("Email sent. Please confirm the email to verify.", "success")
          }).catch(error => {
            this.stateMsger(error.message, "error")
          })
        } else {
          this.stateMsger("Need a signed in firstly please", "error")
        }
      },

      // Store the user data in DB 
      createUserData(user) {
        let data = {
          userdata: {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            state: null,
            created: user.metadata.creationTime
          }
        }
        this.$root.db.collection('user').doc(user.uid).set(data).then(() => {
          console.log('create User data! success.')
        })
      },

      validateEmail(mail) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (pattern.test(mail)) {
          return (true)
        }
        return (false)
      },

      checkForm() {
        let form = this.signUp
        this.errors = []

        // 1. Email
        if (!form.email[0]) {
          this.errors.push("Email required.")
        } else if (this.validateEmail(form.email)) {
          this.errors.push("Valid email required.")
        } else {
          form.email[1] = true
        }

        // 2. Password
        if (!form.password.value1 && !form.password.value2) {
          this.errors.push("Password required.")
          form.password.valid = false 
        } else if (form.password.value1 !== form.password.value2) {
          this.errors.push("Your second password is not matched the first one. Please check it again.")
          form.password.valid = false 
        } else {
          form.password.valid = true 
        }

        // After email and password is valid then sign up
        if (!this.errors.length && this.signUp.email[1] && this.signUp.password.valid) {
          this.signUpWithEmail()
        }
      },

      saveUserData() {
        // Check it's logined
        if (this.$root.account.currentUser) {
          // If photo is uploaded then save it to DB and get photoURL

          // Name update
          this.$root.account.currentUser.updateProfile({displayName: this.setUser.name[0] })

          if (this.setUser.photo.data) {
            this.uploadPhoto().then(snapshot => {
              snapshot.ref.getDownloadURL().then( res => {
                this.$root.account.currentUser.updateProfile({photoURL: res })
                this.stateMsger('Your photo is successfully updated.', 'success')
              })
            })
          }

        }
      },

      checkUserData() {
        let form = this.setUser
        this.errors = []

        // 3. Name
        if (!form.name[0]) {
          this.errors.push("Name required.")
          form.name[1] = false
        } else if (3 > form.name[0].length || form.name[0].length > 15) {
          this.errors.push("Name must be in 3 ~ 15 characters.")
        } else {
          // If name is validated, set true.
          form.name[1] = true
        }
      },

      // Photo upload
      uploadPhoto() {
        let userID = this.$root.account.currentUser.uid
        let fileRef = `user/${userID}/profile-photo2`

        let storageRef = this.$root.firebase.storage().ref()
        let childRef = storageRef.child(fileRef)

        return childRef.putString(this.setUser.photo.data, 'data_url')
        
        /* .then(snapshot => {
          console.log('successfully, uploaded.', snapshot)
          this.stateMsger('successfully, uploaded.', 'success')
          snapshot.ref.getDownloadURL().then( res => {
            this.setUser.photo.url = res 
            console.log('url', res);
            
          })
        }) */
      },

      previewImage: function(event) {
        // Reference to the DOM input element
        const input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          const reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.setUser.photo = {
              data: e.target.result,
              name: input.files[0].name
            }
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
        }
      },

      // Helper function to assign main state messages
      stateMsger(message, state) {
        this.mainState.msg = message
        this.mainState.state = state
      },

    },
    computed: {

    },
    watch: {
      setUser: {
        handler(nv) {
          // Name checker if it's valid than available to click save
          if (3 <= nv.name[0].length && nv.name[0].length <= 15) {
            nv.name[1] = true
          } else {
            nv.name[1] = false
          }

          // Submit control
          if (nv.name[1]) {
            this.$refs.userDataSubmit.disabled = false
          } else {
            this.$refs.userDataSubmit.disabled = true
          }
        },
        deep: true
      },
      signUp: {
        handler(nv) {
          // E mail validation
          if (this.validateEmail(nv.email[0])) {
            nv.email[1] = true 
          } else {
            nv.email[1] = false 
          }

          // Password
          if (8 <= nv.password.value1.length && nv.password.value1.length <= 20 && nv.password.value1 === nv.password.value2) {
            nv.password.valid = true
          } else {
            nv.password.valid = false 
          }

          // Submit control
          if (nv.email[1] && nv.password.valid) {
            this.$refs.signUpSubmit.disabled = false 
          } else {
            this.$refs.signUpSubmit.disabled = true
          }
        },
        deep: true 
      }
      
    }
  }
</script>

<style lang="scss" scoped>
  @mixin invalid {
    // background-color: rgba(255, 0, 0, 0.025);
    box-shadow: 0 0 .16em .1em red;

/*     &::placeholder {
      color: red;
    } */
  }

  @mixin valid {
    background-color: white;
    box-shadow: 0 0 .16em .1em green;

    &::placeholder {
      color: green;
    }
  }

  .panel-col {
    display: grid;
    // grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr))

  }

  form {
    input:required {
      &:valid {
        @include valid
      }

      &:invalid {
        &::placeholder {
          // color: orange;
        }

        // @include invalid
      }
    }

    /* input[type=name] {
      &:invalid {
        @include invalid
      }
      &:valid {
        @include valid
      }
    } */

    input[type=submit] {
      
      &:disabled {
         background-color: rgba(128, 128, 128, 0.25);
         box-shadow:  $shadow-primary inset;
      }
    }
  }
#checkFormError {
  ul {
    list-style: none;
  }
}
  
</style>