<template>
  <div>
    <h1>Editor JS</h1>
    <div id="codex-editor">
    </div>
    <button @click="saveDoc" class="btn-basic">
      Save
    </button>
  </div>
</template>

<script>
  import EditorJS from '@editorjs/editorjs'
  import Header from '@editorjs/header'
  import List from '@editorjs/list'

  class SimpleImage {
    constructor({data}) {
      this.data = data 
      this.wrapper = undefined
    }
    static get toolbox() {
      return {
        title: 'Image',
        icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      }
    }

    render() {
      this.wrapper = document.createElement('div');
      const input = document.createElement('input');

      this.wrapper.classList.add('simple-image');
      this.wrapper.appendChild(input);

      input.placeholder = 'Paste an image URL...';
      input.value = this.data && this.data.url ? this.data.url : '';

      input.addEventListener('paste', e => {
        this._createImage(e.clipboardData.getData('text'))
      })
      return this.wrapper
    }
    _createImage(url) {
      const image = document.createElement('img');
      const caption = document.createElement('input');

      image.src = url;
      caption.placeholder = 'Caption...';

      this.wrapper.innerHTML = '';
      this.wrapper.appendChild(image);
      this.wrapper.appendChild(caption);


      
    }

    save(blockContent) {
      return {
        url: blockContent.value
      }
    }
  }

  export default {
    data() {
      return {}
    },
    computed: {
      editor() {
        const editor = new EditorJS({
          holder: 'codex-editor',
          autofocus: true,

          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
            },
            list: {
              class: List,
              inlineToolbar: true
            },
            image: SimpleImage
          },
          placeholder: 'Write down something.',
          data: {
            time: 1552744582955,
            blocks: [
              {
                type: "image",
                data: {
                  url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
                }
              },
              {
                type: "header",
                data: {
                  text: 'New header',
                  level: 2
                }
              },


            ],
            version: "2.11.10"
          }

        });
        return editor
      }
    },
    mounted() {
      this.editor

    },
    methods: {
      saveDoc() {
        this.editor.save().then(outputData => {
          console.log('Article data: ', outputData)
        }).catch(error => {
          console.error("Saving failed", error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #codex-editor {
    border: 1px solid gray;
  }


.simple-image {
 padding: 20px 0;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    outline: none;
    font-size: 14px;

  }
  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
    
}
</style>