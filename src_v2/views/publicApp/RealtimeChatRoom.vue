<template>
<div>
    <state-msger state="warning">Under Development. Require Authenticated ID. Please sign in.</state-msger>
  <div id="chatroom">
    <!-- 1. Dialogue panel -->
    <section id="dialogue">
      <h1>Dialogue</h1>
      <ul class="display">
        <li v-for="msg in messages" :key="msg.id" class="message">

          <div v-if="$root.account.currentUser && msg.user === $root.account.currentUser.displayName" class="message-self">
            <div class="message-sub">
              <span>{{ new Date(msg.date).toLocaleTimeString() }}</span>
            </div>
            <p class="message-content">{{ msg.content }}</p>
          </div>

          <div v-else class="message-main">
            <p class="message-user">{{ msg.user }}</p>
            <p class="message-content">{{ msg.content }}</p>  
            <div class="message-sub">
              <span>{{ new Date(msg.date).toLocaleTimeString() }}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- 2. User panel -->
    <section id="user">
      <h1>User</h1>
      <ul class="display">
        <!-- <li v-for="user in onlineUser" :key="Object.keys(user)[0]">
          <p>{{user.name}}</p>
          <p>{{new Date(user.date).toLocaleTimeString()}}</p>
        </li> -->
      </ul>
    </section>

    <!-- 3. Text input panel -->
    <section id="input">
      <h1>Input</h1>
      <input type="text" class="input-part" v-model="message" v-on:keyup.enter="sendMessage()">
      <button class="btn" @click.prevent="sendMessage()" >Send</button>
    </section>

    <!-- 4. Join  -->
    <section id="join">
      <h1>Join</h1>
      <button class="btn" disabled>Join</button>
      <button class="btn" disabled>Out</button>
    </section>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      messages: null,
      onlineUser: [],
      message: '',
    }
  },
  methods: {
    setOnline() {
      if (this.$root.account.currentUser) {
        let db = this.$root.firebase.database()
        // console.log('logined');
        
        let now = Date.now()
        let data = {}
        data[this.$root.account.currentUser.uid] = {
          date: now,
          name: this.$root.account.currentUser.displayName,
        }
        db.ref('user/online').update(
          data
        )
      }
    },
    readOnline() {
      if (this.$root.account.currentUser) {
        let db = this.$root.firebase.database()
        // console.log('read')

        db.ref('user/online').on('value', snapshot => {
          // console.log(snapshot.val());
          // this.onlineUser = []
          this.onlineUser = snapshot.val()
          
        } )
      }
    },
    sendMessage() {
      if (this.$root.account.currentUser) {
        let db = this.$root.firebase.database() 
        let ref = db.ref('messages/')
        let data = {
          user: this.$root.account.currentUser.displayName,
          content: this.message ,
          date: Date.now()
        }
        ref.push().set(data)
        
        this.message = ''
      }
    },
    readMessage() {
      
      let db = this.$root.firebase.database()
      let ref = db.ref('messages')
      ref.on('value', data => {
        this.messages = data.val()
      })
      
    },

    join() {
      this.setOnline()
    }
  },
  mounted() {
    // this.setOnline()
    // this.readOnline()
    this.readMessage()
  }

}
</script>

<style lang="scss" scoped>
#chatroom {
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 4fr 1fr;
  grid-gap: 1.6rem;
  
  font-size: small; 

  #dialogue {

    display: flex;
    flex-direction: column;

    .display {
      // display: flex;
      // flex-direction: column;

      // background-color: aqua;
    }

    .message {        
      display: flex;
      // justify-content: space-between
      margin: 1vh 0;

      &-main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        
      }

      &-sub {
        font-size: .9em;
        color: darkgray;
        margin: 0 .5em;
      }

      &-self {
        // background-color: red;
        margin-left: auto;
        display: flex;

        .message-content {
          background-color:paleturquoise;
        
        }
      }

      &-user {
        color:midnightblue;
        font-weight: 700;
        padding: 0 1vh;

        // border: 1px solid orange;
        border-radius: .5em;
      }

      &-content {
        background-color:beige;
        border: 1px solid lightgoldenrodyellow;
        border-radius: .5em;
        padding: .38rem .62rem;
        // width: 100%;
      }    
    }
  }

  #user {
    display: flex;
    flex-direction: column;
  }

  #input {
    display: flex;
    // flex-direction: column;
    input {
      width: 100%;
    }
  }

  #join {
    display: flex;
  }
}

.display {
  background-color: rgba(245, 245, 245, 1);
  border-radius: .5em;
  border: .2rem solid rgba(235, 235, 235, 1);
  padding: 1.6vh 1.6vw;
  height: 100%;

  list-style: none;

  ul {
    padding: 0;
  }
}
</style>