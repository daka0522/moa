<template>
  <div class="editor" id="editor-tiptap">
    <input type="text" name="title" id="title" v-model="title" placeholder="Title">

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="editor-menu-bar">
      <div>
               <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
        Bold
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
        Italic
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
        Strike
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
        Underline
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
        Code
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
        Paragraph
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
        UL
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
        OL
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
        Quote
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
        Code
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
        HR
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
        Undo
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
        Redo
        </button>

      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor"/>
    <button id="btn-save" class="btn-basic" @click="saveDoc">Save</button>
  </div>
</template>

<script>
  import {
    Editor,
    EditorContent,
    EditorMenuBar
  } from 'tiptap'
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Placeholder
  } from 'tiptap-extensions'
  export default {
    name: 'EditorTiptap',
    components: {
      EditorContent,
      EditorMenuBar
    },
    data() {
      return {
        title: '',
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({
              levels: [1, 2, 3]
            }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            // 
            new Placeholder({
              emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
            })
          ],
          // content: `<p>Write here down</p>`,
          /* onUpdate: ({getHTML}) => {
            console.log(getHTML());
          } */
        }),
      }
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods: {
      saveDoc() {
        const doc = this.editor.getHTML()

        const dbRef = this.$root.db.collection('user').doc(this.$root.account.currentUser.uid).collection('blog')
        dbRef.doc(Date.now().toString()).set({
          author: this.$root.account.currentUser.displayName,
          content: doc,
          date: new Date,
          isPublished: true,
          title: this.title
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #editor-tiptap {
    border-radius: .5em;
    margin: 1vh 0;
    height: 80vh;
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .editor__content {
    padding: 1vh 1vw;
    border: 1px solid rgba(128, 128, 128, 0.5);
    border-radius: .5em;
    
    
  }
  button {
    @extend .btn-basic;
    font-size: small;
    margin: 0 .15em;
    background-color: inherit;
    color: inherit;
  }
  .editor-menu-bar {
    background-color: rgba(128, 128, 128, 0.05);
    width: fit-content;
    margin: .62em 0;
  }
  input {
    border-style: none;
    border: 1px solid rgba(128, 128, 128, 0.5);
    padding: 1vh 1vw;
  }
  #btn-save {
    margin: .62em 0;
    background-color: rgba(0, 128, 0, 0.75);
    color: white;
    width: fit-content;
  }

</style>