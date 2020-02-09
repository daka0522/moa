<template>
    <div>
        <h1>Editor JS</h1>
        <div id="codex-editor">Editor</div>
        <button @click="saveDoc">Save</button>
    </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'



export default {
    data(){
        return {
            editor: this.editorCreate
        }
    },
    methods: {
        saveDoc(){
            this.editor.save().then(outputData => {
                console.log('Article data: ', outputData)
            }).catch(error => {
                console.error("Saving failed", error)
            })
        }
    },
    computed: {
        editorCreate() {
            const editor = new EditorJS({
                holderId: 'codex-editor',
                autofocus: true,

                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true
                    },
                    list: {
                        class: List,
                        inlineToolbar: true
                    }
                }
            });

            return editor
        }
    },
    mounted() {
        this.editorCreate
    }
}
</script>

<style scoped>

</style>