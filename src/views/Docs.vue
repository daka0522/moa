<template>
  <div id="docs">
    <h2 style="color: orange">
      Maybe Private
    </h2>
    <!-- Add -->
    <div>
      <div class="input-panel">
        <label>Add new google docs web publish URL</label>
        <select v-model="newDocID">
          <option
            disabled
            value=""
          >
            Please select document ID
          </option>
          <option
            v-for="item in docIDs"
            :key="item"
          >
            {{ item }}
          </option>
          <option value="New">
            + Create New
          </option>
        </select>
        <input
          v-if="newDocID === 'New' | !docIDs.includes(newDocID)"
          v-model="newDocID"
          class="input-part"
          placeholder="Document ID (Category)"
        >
        <input
          v-model="currentURL.title"
          class="input-part"
          placeholder="Title"
        >
        <input
          v-model="currentURL.url"
          class="input-part"
          placeholder="URL"
        >
        <button
          class="btn"
          @click="updateUrl(newDocID)"
        >
          Add
        </button>
        <button
          class="btn"
          @click="createNewUrl(newDocID, currentURL.title, currentURL.url)"
        >
          Make New
        </button>
      </div>
    </div>


    <!-- List -->
    <div>
      <span>Listed Documents</span>
      <div>
        <button
          class="btn"
          @click="readUrl('poem')"
        >
          Read
        </button>
        <button
          class="btn"
          @click="readAllUrl()"
        >
          Read All
        </button>
      </div>
      <div>
        <select v-model="docID">
          <option
            disabled
            value=""
          >
            Please select document ID
          </option>
          <option
            v-for="item in docIDs"
            :key="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div
        v-if="docID"
        class="panel"
      >
        <table>
          <tr>
            <th>Title</th>
            <th>URL</th>
          </tr>
          <tr
            v-for="doc in docObj[docID]['urls']"
            :key="doc.url"
          >
            <td
              id="urlSelector"
              @click="selectUrl(doc)"
            >
              {{ doc.title }}
            </td>
            <td>
              <a
                :href="doc.url"
                target="_blank"
              >{{ doc.url }}</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- Parse -->
    <div>
      <div class="input- panel">
        <label>Parse</label>
        <input
          v-model="url"
          class="input-part"
          placeholder="Please give URL here."
        >
        <button
          class="btn"
          @click="parseHTML(url); isParseable = !isParseable"
        >
          Parse
        </button>
      </div>

      <div
        v-if="downloaded"
        class="panel content-area"
      >
        <h1 v-html="docData.title[0].innerHTML" />
        <div
          id="header"
          v-html="docData.header.innerHTML"
        />
        <section
          class="htmlContents"
          v-html="docData.contents.innerHTML"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        axios: this.$root.axios,
        collectionID: 'googleDocsUrl',
        docs: [],
        docObj: new Object,
        docIDs: [],
        docID: '',

        url: '',

        isParseable: false,
        docData: new Object,
        downloaded: false,
        doc: null,


        currentURL: {
          // docID: '',
          title: '',
          url: ''
        },

        newDocID: ''
      }
    },
    computed: {
      loadGoogleDocs: function() {
        console.log(this.$root.googleDocsUrl);

        return Object.keys(this.$root.googleDocsUrl)
      },

    },
    mounted() {
      // Guard authentication
      if (this.$root.account.curretUser) {
        this.readAllUrl()
      } else {
        console.warn("Need a auth.")
      }
    },
    methods: {
      axiosGet(url) {
        this.axios.get(url).then(res => {
          this.webData = res
        }).catch(error => {
          console.log(error)
        }).then(() => {
          console.log("after all!")
        })
      },
      parseHTML(url) {
        this.axios.get(url).then(res => {
          console.log(res);

          let parser = new DOMParser()
          const htmlDoc = parser.parseFromString(res.data, 'text/html')
          console.log(htmlDoc)

          this.docData.title = htmlDoc.getElementsByTagName('title')
          this.docData.header = htmlDoc.getElementById('header')
          this.docData.contents = htmlDoc.getElementById('contents')
          // this.docData.contents.getElementsByTagName('style').forEach(item => item.remove())

          this.downloaded = true

        })
      },

      listNewDoc(url) {
        this.$store.commit('listNewDoc', {
          location: 'poem',
          doc: [{
            title: 'test-title!',
            url: url
          }]
        })
      },

      // CRUD (Create, Read, Update, Delete)
      // 1. Create
      createNewUrl(docID, title, url) {
        let urls = [{
          title: title,
          url: url
        }]
        this.$root.db.collection(this.collectionID).doc(docID).set({
          urls
        })
      },
      // 2. Read
      readUrl(docID) {
        this.$root.db.collection(this.collectionID).doc(docID).get().then(doc => {
          if (doc.exists) {
            console.log(doc);
            console.log(doc.data());
          } else {
            console.log("No such doc! ", docID)
          }
        }).catch(err => {
          console.log("Error getting document:", err);
        })
      },
      // 2-2. Read All Docs in the given collection
      readAllUrl() {
        this.$root.db.collection(this.collectionID).get().then(
          snapshot => {
            snapshot.forEach(doc => {
              /* console.log("Read successfully!")
              console.log(doc) */

              /* let cont = new Object 
              cont["docID"] = doc.id 
              cont["data"] = doc.data()
              this.docs.push(cont) */
              this.docIDs.push(doc.id)
              this.docObj[doc.id] = doc.data()
            })
          }
        )
      },
      updateUrl(docID) {
        const docRef = this.$root.db.collection(this.collectionID).doc(docID)

        // this.currentURL.title 
        // this.currentURL.url 

        let data = new Object
        data['urls'] = this.$root.firebase.firestore.FieldValue.arrayUnion(this.currentURL)

        docRef.update(data).then(
          () => {
            console.log(docID, " is successfully updated.");
          }
        )
      }
    }

  }

</script>

<style scoped lang="scss">


textarea {
    width: 100%;
    height: 100em;
    
}


#content {
    background-color: gray;
    /* color: white; */
}


.htmlContents{

}

.content-area {
    display: block
}
table tbody tr td{
    border: 1px solid red;
}
.input-panel {
    display: flex;
    flex-wrap: wrap;
    
    input {
        width: 100%;
    }

    label {
        display: block;
        width: 100%;
    }
}

table {
    border-collapse: collapse;

    th, td {
        border: 1px solid rgb(196, 196, 196);
        padding: .8em;
    }
    a{
    }
}

#docs {
    display: grid;
    grid-template-rows: repeat(aut-fit, 1fr);
    grid-gap: 3.2em;
}

#urlSelector {
    background-color: red;
    cursor: pointer;

    /* &:hover {
        background: 
    } */
}
</style>