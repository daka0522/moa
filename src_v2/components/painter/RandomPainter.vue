<template>
  <div>
    <div class="tool-main">
      <button
        id="btn-draw"
        class="btn"
        @click="draw()"
      >
        <fa-i
          icon="palette"
          style="margin-right: 1rem"
        />  
        <span>Draw</span>  
      </button>

      <button
        class="btn"
        @click="showTool = !showTool"
      >
        <fa-i
          icon="tools"
          style="margin-right: 1rem"
        />
        <span>More Tools</span>
      </button>

      <div>
        <!-- <label for="canvas-text">Text</label> -->
        <input
          id="canvas-text"
          v-model="canvasText"
          type="text"
          class="input-part"
        >
      </div>

      <!-- <div class="canvas-tools-item">
        <label for="saveName">Save name</label>
        <input v-model="saveName" id="saveName">
      </div> -->

      <a
        id="btn-download"
        ref="btnDownload"
        class="btn"
        @click="download()"
      >Download</a>
      <button
        class="btn"
        @click="updatePhotoURL($root.account.currentUser)"
      >
        Update Photo
      </button>
    </div>

    <div
      v-show="showTool"
      class="canvas-tools-cont tool-full"
    >
      <!-- Tool - widht & height, guide lines -->
      <div
        id="canvas-tools-width"
        class="canvas-tools-item"
      >
        <label for="canvasWidthcontroler">Width</label>
        <div>
          <input
            id="canvasWidthNumber"
            v-model.number="canvasWidth"
            type="number"
            name="canvasWidthNumber"
            min="100"
            :max="canvasMaxWidth"
          >
          <input
            id="canvasWidthControler"
            v-model.number="canvasWidth"
            type="range"
            name="canvasWidthControler"
            min="100"
            :max="canvasMaxWidth"
          >
        </div>
      </div>

      <div
        id="canvas-tools-height"
        class="canvas-tools-item"
      >
        <label for="canvasHeightcontroler">Height</label>
        <div>
          <input
            id="canvasHeigthNumber"
            v-model.number="canvasHeight"
            type="number"
            name="canvasHeigthNumber"
            min="100"
            max="1000"
          >
          <input
            id="canvasHeightcontroler"
            v-model.number="canvasHeight"
            type="range"
            name="canvasHeightcontroler"
            min="100"
            max="1000"
          >
        </div>
      </div>

      <div
        id="canvasGuideLine"
        class="canvas-tools-item"
      >
        <label>Guide line</label>
        <div>
          <input
            v-model="showGuidLine"
            type="checkbox"
          >
          <input
            v-model.number="guideLineNumber"
            type="number"
            min="0"
            max="100"
          >
        </div>
      </div>

      <div class="canvas-tools-item">
        <label>Curve control</label>
        <span>{{ curveValue }}</span>
        <input
          v-model.number="curveValue"
          type="range"
          min="-1000"
          max="1000"
        >
      </div>
    </div>

    <div id="canvas-field">
      <canvas
        id="canvas-2"
        ref="canvas2"
        :style="canvasObj"
        :width="canvasWidth"
        :height="canvasHeight"
      />

      <canvas
        id="canvas-1"
        ref="canvas1"
        :style="canvasObj"
        :width="canvasWidth"
        :height="canvasHeight"
      />

      <canvas
        v-show="showGuidLine"
        id="canvas-bg"
        ref="canvasBg"
        :width="canvasWidth"
        :height="canvasHeight"
      />
    </div>
  </div>
</template>

<script>
import { hsl2rgb,hsl2hex } from "@/utils/colorConverter"
hsl2hex, hsl2rgb

export default {
  data() {
    return {
      showTool: false,

      toolFulled: true,
      
      canvasWidth: 450,
      canvasHeight: 450,

      canvasMaxWidth: 800,

      showGuidLine: false,
      guideLineNumber: 4,

      curveValue: 0,
      canvasText: '',
      saveName: 'random-image',

      canvasObj: {
        borderRadius: '50%',
        boxShadow: '0 0 .5em .1em rgba(128, 128, 128, 0.45)'
      }
    }
  },
  computed: {
    
    fontSize() {
      return this.canvasWidth / 6.5
    }
    
  },
  watch: {
    showGuidLine(nv) {
      if (nv) {
        this.drawGuideLine()
      } else {
        this.clearGuideLine()
      }
    },
    canvasText() {
      this.drawText()
    },
    curveValue() {
      this.draw()
    },

   

  },
  mounted() {
    this.initCanvasText(),
    this.draw()
    this.drawGuideLine()
    this.drawText()
  },
  methods: {
    draw() {
      this.clearCanvas()

      let w = this.canvasWidth
      let h = this.canvasHeight
      let ctx = this.$refs.canvas1.getContext('2d')

      let ri = this.randomInt
      ctx.beginPath()
      ctx.moveTo(w/2, h/2)
      
      for (let i=0; i <8; i++) {
        ctx.bezierCurveTo(ri(i*i, w), ri(i*i, h),ri(i*i, w), ri(i*i, h), ri(i*i, w), ri(i*i, h) )
        let cv = `rgba(${hsl2rgb(ri(0, 360), ri(80, 100), ri(30, 70))}, ${(1-(i*.1)).toFixed(2)})`
        ctx.fillStyle = cv
        ctx.fill()
      }
      
      // Circle - background color
      let circle = new Path2D()
      circle.moveTo(w/2, h/2)
      circle.arc(w/2, h/2, w/2, 0, 2 * Math.PI)
      ctx.fill(circle)

      // Text
      let c2 = this.$refs.canvas2
      ctx.drawImage(c2, 0, 0)

/*       ctx.font = `${this.fontSize}px serif`
      ctx.fillStyle = `rgba(255, 255, 255, 1)`
      ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      ctx.textAlign = "center"
      ctx.textBaseline = 'middle'
      ctx.lineWidth = 1
      ctx.fillText(this.canvasText, w/2, h/2)
      ctx.strokeText(this.canvasText, w/2, h/2) */
    },

    // canvas-bg, Guidlines
    drawGuideLine() {
      let w = this.canvasWidth
      let h = this.canvasHeight

      // Init
      let ctx = this.$refs.canvasBg.getContext('2d')
      ctx.clearRect(0, 0, w, h)

      // # Draw guidlines (grid)
      let divine = this.guideLineNumber

      for (let i = 1; i < divine; i++) {
        let stepWidth = (w / divine) * i
        let stepHeight = (h / divine) * i

        ctx.beginPath()

        // Vertical lines
        ctx.moveTo(stepWidth, 0)
        ctx.lineTo(stepWidth, h)
        ctx.strokeText(stepWidth, stepWidth, 10)

        // Horizontal lines 
        ctx.moveTo(0, stepHeight)
        ctx.lineTo(w, stepHeight)
        ctx.strokeText(stepHeight, 5, stepHeight)

        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(0, 0, 0, .35)'
        ctx.stroke()
      }
    },

    drawText() {
      let w = this.canvasWidth
      let h = this.canvasHeight

      // Init
      let ctx = this.$refs.canvas2.getContext('2d')
      ctx.clearRect(0, 0, w, h)

      ctx.beginPath()
      ctx.moveTo(w/2, h/2)

      // Text
      ctx.font = `${this.fontSize}px serif`
      ctx.fillStyle = `rgba(255, 255, 255, 1)`
      ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      ctx.textAlign = "center"
      ctx.textBaseline = 'middle'
      ctx.lineWidth = 1
      ctx.fillText(this.canvasText, w/2, h/2)
      ctx.strokeText(this.canvasText, w/2, h/2)

      this.draw()
    },

    clearGuideLine() {
      let ctx = this.$refs.canvasBg.getContext('2d')
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    },
    clearCanvas() {
      let ctx = this.$refs.canvas1.getContext('2d')
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    },

    randomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      let result = Math.floor(Math.random() * (max - min + 1)) + min
      return result
    },
    randomFloat(min, max, fix=2) {
      return ((Math.random() * (max-min)) + min).toFixed(fix)
    },

    // Download & upload 
    download() {
      let btn = this.$refs.btnDownload
      let canvas = this.$refs.canvas1

      btn.href = canvas.toDataURL('image/png')
      btn.download = this.saveName + '.png'
    },
    updatePhotoURL(currentUser) {
      // Crate a root reference
      let storageRef = this.$root.firebase.storage().ref()

      this.$refs.canvas1.toBlob(function(blob){
        // user/{userid}/profile.png
        let childRef = storageRef.child(`/user/${currentUser.uid}/profile-photo.png`)
        childRef.put(blob).then(snapshot => {
          childRef.getDownloadURL().then(url => {
            currentUser.updateProfile({
              photoURL: url
            }) 
            // console.log('User photo url is successfully updated!', url)
          })
        })
      })
    },
    initCanvasText() {
      if (this.$root.account.currentUser) {
        this.canvasText = this.$root.account.currentUser.displayName
      } else {
        this.canvasText = 'Hello World!'
      }
    },


  }
}
</script>

<style lang="scss" scoped>
.canvas-tools-cont{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  text-align: center;

  .canvas-tools-item {
    border: 1px solid rgba(128, 128, 128, 0.219);
    padding: .4em;

    * {
      margin: 0 .4em;
    }
    input {
      max-width: 10em;
    }
  }
  label {
    color: gray;
  }
}


.tool-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  #btn-draw {
    background-color: rgba(0, 128, 0, 0.75);
    color: white;
  }

  #btn-download {
    cursor: pointer;
  }
  #canvas-text {
    width: 10em;
  }
}

#canvas-field {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3.2em 0;

}
#canvas-1 {
  position: static;
}
#canvas-bg {
  position: absolute;
}

#canvas-2 {
  display: none;
  position: absolute;
}
</style>