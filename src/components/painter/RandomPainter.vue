<template>
  <div>
    <div class="canvas-tools-cont">

      <div id="canvas-tools-width" class="canvas-tools-item">
        <label for="canvasWidthcontroler">Width</label>
        <input type="number" name="canvasWidthNumber" id="canvasWidthNumber" v-model.number="canvasWidth" min="100" :max="canvasMaxWidth">
        <input type="range" name="canvasWidthControler" id="canvasWidthControler" v-model.number="canvasWidth" min="100" :max="canvasMaxWidth">
      </div>

      <div id="canvas-tools-height" class="canvas-tools-item">
        <label for="canvasHeightcontroler">Height</label>
        <input type="number" name="canvasHeigthNumber" id="canvasHeigthNumber" v-model.number="canvasHeight" min="100" max="1000">
        <input type="range" name="canvasHeightcontroler" id="canvasHeightcontroler" v-model.number="canvasHeight" min="100" max="1000">
      </div>

      <div id="canvasGuideLine" class="canvas-tools-item">
        <label>Guide line</label>
        <input type="checkbox" v-model="showGuidLine">
        <input type="number" v-model.number="guideLineNumber" min='0' max="100">
      </div>

      <button @click="randomProfileGenerator()" class="btn">Draw</button>
      <button @click="clearCanvas()" class="btn">Clear</button>

    </div>

    <div class="canvas-tools-cont">
      <div class="canvas-tools-item">

        <label>Curve control</label>
        <span>{{curveValue}}</span>
        <input type="range" v-model.number="curveValue" min='-1000' max="1000">

      </div>
      <div class="canvas-tools-item">
        <input v-model="canvasText" class="input-part">
      </div>

      <div class="canvas-tools-item">
        <label>Save name </label>
        <input v-model="saveName" >
        <a  @click="download()" class="btn" id="btn-download">Download</a>
        <button @click="updatePhotoURL($root.account.currentUser)" class="btn">Update Photo</button>
      </div>
    </div>


    <div id="canvas-field">
      <canvas id="canvas-2" :style="canvasObj" :width="canvasWidth" :height="canvasHeight" />
      
      <canvas id="canvas-1" :style="canvasObj" :width="canvasWidth" :height="canvasHeight" />

      <canvas id="canvas-bg" :style="canvasObj" v-show="showGuidLine" :width="canvasWidth" :height="canvasHeight" />
    </div>


  </div>
</template>

<script>
import { hsl2rgb,hsl2hex } from "@/utils/colorConverter"
hsl2hex, hsl2rgb

export default {
  data() {
    return {
      canvasWidth: 150,
      canvasHeight: 150,

      canvasMaxWidth: 800,

      showGuidLine: false,
      guideLineNumber: 4,

      curveValue: 0,
      canvasText: 'Hello World',
      saveName: 'random-image',

      canvasObj: {
        borderRadius: '50%',
        boxShadow: '0 0 .5em .1em rgba(128, 128, 128, 0.45)'
      }
    }
  },
  methods: {
    draw() {
      this.clearCanvas()

      let w = this.canvasWidth
      let h = this.canvasHeight
      let ctx = this.canvasRef('canvas-1').getContext('2d')
      w, h, ctx 

/*       function randomLine() {
        // Random straight line generator 
        let divine = 8
        let randomInt = this.randomInt
        for (let i = 1; i <= divine; i++) {
          ctx.beginPath()
          let rw = randomInt(0, w)
          let rh = randomInt(0, h)

          ctx.moveTo(randomInt(0, w), randomInt(0, h))

          ctx.lineTo(rw, rh)

          ctx.strokeStyle = `rgba(${hsl2rgb(randomInt(0, 360), randomInt(30, 100), randomInt(30, 70))}, ${Math.random().toFixed(1)})`
          ctx.lineWidth = randomInt(0, 10)
          ctx.stroke()
        }
      } */

      /* function lineRotate() {
        let randomInt = this.randomInt
        let divine = 8
        let w_pattern = [w/2, w, w, w, w/2, 0, 0, 0]
        let h_pattern = [0, 0, h/2, h, h, h, h/2, 0]
        
        for (let i=0; i<divine; i++) {
          ctx.beginPath()
          ctx.moveTo(w/2, h/2)
          ctx.lineTo(w_pattern[i], h_pattern[i])
          ctx.strokeStyle = `rgba(${hsl2rgb(randomInt(0, 360), randomInt(30, 100), randomInt(30, 70))}, ${this.randomFloat(.75, 1, 1)})`
          ctx.stroke()
          ctx.lineWidth = i*randomInt(1, divine)
        }
      } */
    },
    randomProfileGenerator() {
      this.clearCanvas()

      let w = this.canvasWidth
      let h = this.canvasHeight
      let ctx = this.canvasRef('canvas-1').getContext('2d')

      let ri = this.randomInt
      ctx.beginPath()
      ctx.moveTo(w/2, h/2)
      

      for (let i=0; i <8; i++) {
        ctx.bezierCurveTo(ri(i*i, w), ri(i*i, h),ri(i*i, w), ri(i*i, h), ri(i*i, w), ri(i*i, h) )
        let cv = `rgba(${hsl2rgb(ri(0, 360), ri(80, 100), ri(30, 70))}, ${(1-(i*.1)).toFixed(2)})`
        ctx.fillStyle = cv
        ctx.fill()
      }
      
      // Circle
      let circle = new Path2D()
      circle.moveTo(w/2, h/2)
      circle.arc(w/2, h/2, w/2, 0, 2 * Math.PI)
      ctx.fill(circle)

      // Text
      // ctx.clearRect(50, 50, w, h)
      // let text = new Path2D()

      /* ctx.font = '3.2rem serif'
      ctx.fillStyle = `rgba(255, 255, 255, 1)`
      ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      ctx.textAlign = "center"
      ctx.textBaseline = 'middle'
      ctx.lineWidth = 1
      ctx.fillText(this.canvasText, w/2, h/2)
      ctx.strokeText(this.canvasText, w/2, h/2) */

      let c2 = this.canvasRef('canvas-2')
      ctx.drawImage(c2, 0, 0)
    },

    drawGuideLine() {
      let w = this.canvasWidth
      let h = this.canvasHeight

      // Init
      let ctx = this.canvasRef('canvas-bg').getContext('2d')
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
      let ctx = this.canvasRef('canvas-2').getContext('2d')
      ctx.clearRect(0, 0, w, h)

      ctx.beginPath()
      ctx.moveTo(w/2, h/2)

      // Text
      ctx.font = '3.2rem serif'
      ctx.fillStyle = `rgba(255, 255, 255, 1)`
      ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
      ctx.textAlign = "center"
      ctx.textBaseline = 'middle'
      ctx.lineWidth = 1
      ctx.fillText(this.canvasText, w/2, h/2)
      ctx.strokeText(this.canvasText, w/2, h/2)
    },

    clearGuideLine() {
      let ctx = this.canvasRef('canvas-bg').getContext('2d')
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    },
    clearCanvas() {
      let ctx = this.canvasRef('canvas-1').getContext('2d')
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
    canvasRef(canvasId) {
      let canvasRef = document.getElementById(canvasId)
      return canvasRef
    },

    // Download & upload 
    download() {
      let btn = document.querySelector('#btn-download') 
      let canvas = document.querySelector('#canvas-1')

      btn.href = canvas.toDataURL('image/png')
      btn.download = this.saveName + '.png'
    },
    updatePhotoURL(currentUser) {
      // Crate a root reference
      let storageRef = this.$root.firebase.storage().ref()

      // 
      let canvas = document.querySelector('#canvas-1')
      canvas.toBlob(function(blob){
        // user/{userid}/profile.png
        let childRef = storageRef.child(`/user/${currentUser.uid}/profile-photo.png`)
        childRef.put(blob).then(snapshot => {
          console.log('Snap', snapshot)
          childRef.getDownloadURL().then(url => {
            currentUser.updateProfile({
              photoURL: url
            }) 
            console.log('User photo url is successfully updated!', url)

          })
        })
      })
    },
    


  },
  computed: {
    initialWidth() {
      console.log(window.screen.availWidth <= 450 ? window.screen.availWidth / 2 : 450)
      return window.screen.availWidth > 450 ? window.screen.availWidth / 2 : 450
    },
    /* canvasMaxWidth() {
      // let windowWidth = window.screen.availWidth
      // return windowWidth - (windowWidth / 10)
      return window.screen.availWidth
    }, */
    windowResize() {
      let availWidth
      window.addEventListener('resize', function(event){
        // console.log(event.currentTarget.screen.availWidth);
        // this.canvasMaxWidth = event.currentTarget.screen.availWidth
        availWidth = event.currentTarget.screen.availWidth
        
      })
      console.log(availWidth);
      
      return true
    },
    canvasInnerText() {
      if (this.$root.account.currentUser) {
        return this.$root.account.currentUser.displayName
      } else {
        return 'Hello!'
      }
    }
    
  },
  mounted() {
    this.randomProfileGenerator()
    this.drawGuideLine()
    this.drawText()

    this.initialWidth
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
    windowResize() {
      // console.log(nv)
    }
    

   

  }
}
</script>

<style lang="scss" scoped>
.canvas-tools-cont{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  
}
.canvas-tools-item {
    // background-color: red;
    border: 1px solid rgba(128, 128, 128, 0.219);
    padding: .4em;

    * {
      margin: 0 .4em;
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
  // position: absolute;
}
</style>