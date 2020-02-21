<template>
  <div>
    <!-- Links -->
    <section class="links">
      <router-link to="/dev/testpage">Test Page</router-link>
      <!-- <h2>Editors</h2> -->
      <router-link to="/dev/quill">
        Edit with Quill
      </router-link>
      <router-link to="/dev/edit-tiptap">
        Edit with Tiptap
      </router-link>
      <router-link to="/dev/edit-editorjs">
        Edit with Editor JS
      </router-link>
      <router-link to="/dev/writer">
        Writer
      </router-link>

    </section>

    <router-view />
  </div>
</template>

<script>
export default {    
    
}

</script>

<style scoped>
a {
    margin: 1em;
}
ul {
    margin: 3.2em 0 3.2em 0;
}

.links {
  border: 1px solid rgba(128, 128, 128, 0.2);
  background-color:snow;
  border-radius: .5em;
  padding: 1.6vh 1.6vw;
  font-size: small;
}
</style>