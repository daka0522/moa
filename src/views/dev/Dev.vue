<template>
    <div>
        <div class="panel" v-show="this.$route.path === '/dev'">
            <ul>
                <h2>Editors</h2>
                <router-link to="/dev/edit-quill">Edit with Quill</router-link>
                <router-link to="/dev/edit-tiptap">Edit with Tiptap</router-link>
                <router-link to="/dev/edit-editorjs">Edit with Editor JS</router-link>
            </ul>
            <button class="btn" @click="this.$root.signOut">Sign Out</button>
        </div>

        <router-view></router-view>

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
</style>