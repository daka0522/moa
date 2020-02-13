<template>
<div>
  <p class="title-sub">This is to experiment color spaces and implement to web app.</p>
  <div class="contents">
    <section id="colorControlers">
      <div>
        <h2>HSL controler</h2>
        <span class="noticeMsg">Control the Hue, Saturation, Ligthness bar to change colors.</span>
        <div class="controlWrapper">
          <div id="hue" class="controlPanel">
            <div class="color-info">
              <label for="hue">Hue</label>
              <span class="numbers">{{hue}}°</span>
            </div>
            <input id="hue" type="range" v-model.number="hue" min="0" max="360">
          </div>
          <div id="saturation" class="controlPanel">
            <div class="color-info">
              <label for="saturation">Saturation</label>
              <span class="numbers">{{saturation}}%</span>
            </div>
            <input id="saturation" type="range" v-model.number="saturation" min="0" max="100">

          </div>
          <div id="lightness" class="controlPanel">
            <div class="color-info">
              <label for="lightness">Lightness</label>
              <span class="numbers">{{lightness}}%</span>
            </div>
            <input id="lightness" type="range" v-model.number="lightness" min="0" max="100">
          </div>
        </div>
      </div>
      <div>
        <h2>RGB controler</h2>
        <span class="noticeMsg">Sorry, RGB control is not supported yet.</span>
        <div id="rgbControl" class="controlWrapper">
          <div id="red-part" class="controlPanel">
            <div class="rgb-info color-info">
              <label for="red">Red</label>
              <span class="numbers">{{red}}</span>
            </div>
            <input id="red" type="range" v-model.number="red" min="0" max="255">
          </div>
          <div id="green" class="controlPanel">
            <div class="rgb-info color-info">
              <label for="green">Green</label>
              <span class="numbers">{{green}}</span>
            </div>
            <input id="green" type="range" v-model.number="green" min="0" max="100">

          </div>
          <div id="blue" class="controlPanel">
            <div class="color-info">
              <label for="blue">Blue</label>
              <span class="numbers">{{blue}}</span>
            </div>
            <input id="blue" type="range" v-model.number="blue" min="0" max="100">
          </div>
        </div>
      </div>
    </section>

    <div id="color-show">
      <div class="color-show-swatch cont">
        <div id="first-color" class="color-show-item">First Color</div>
        <div id="second-color" class="color-show-item">Second Color</div>
      </div>
      <div id="color-show-text" class="panel" :style="styleObj">
        <span v-if="!isEditColorShowText">{{colorShowText}}</span>
        <input v-else v-model="colorShowText" class="input-part" placeholder="Write me." v-on:keyup.enter="editColorShowText()">
        <i @click="editColorShowText()" id="color-show-edit" class="fas fa-pencil-alt"></i>

      </div>
    </div>
    <section id="switchColor">
      <h2>1. Switch Color</h2>
      <div class="cont">
        <div id="b1" class="box">1 Box Item</div>
        <div id="b2" class="box">2 Box Item</div>
        <div id="b3" class="box">3 Box Item</div>
        <div id="b4" class="box">4 Box Item</div>
        <div id="b5" class="box">5 Box Item</div>
        <div id="b6" class="box">6 Box Item</div>
      </div>
    </section>

    <section id="flipCard">
      <h2>2. Flip Cards</h2>
      <div class="cont">
        <div id="b1" class="box flip-card-item">
          <div class="flip-card-front">
            <span>1 Front</span>
          </div>
          <div class="flip-card-back">
            <span>1 Back</span>
          </div>
        </div>
        <div id="b2" class="box flip-card-item">
          <div class="flip-card-front">
            <span>2 Front</span>
          </div>
          <div class="flip-card-back">
            <span>2 Back</span>
          </div>
        </div>
        <div id="b3" class="box flip-card-item">
          <div class="flip-card-front">
            <span>3 Front</span>
          </div>
          <div class="flip-card-back">
            <span>3 Back</span>
          </div>
        </div>
        <div id="b4" class="box flip-card-item">
          <div class="flip-card-front">
            <span>4 Front</span>
          </div>
          <div class="flip-card-back">
            <span>4 Back</span>
          </div>
        </div>
        <div id="b5" class="box flip-card-item">
          <div class="flip-card-front">
            <span>5 Front</span>
          </div>
          <div class="flip-card-back">
            <span>5 Back</span>
          </div>
        </div>
        <div id="b6" class="box flip-card-item">
          <div class="flip-card-front">
            <span>6 Front</span>
          </div>
          <div class="flip-card-back">
            <span>6 Back</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>
</template>

<script>
import {hsl2hex, hsl2rgb} from '@/utils/colorConverter'

export default {
    data() {
        return {
            // HSL
            hue: 0,
            saturation: 100,
            lightness: 25,

            // RGB
            red: 0,
            blue: 0,
            green: 0,

            styleObj: {
                fontSize: '1.6em',
                fontWeight: '700',
            },
            colorShowText: 'Click the pencil button and write something. :)',
            isEditColorShowText: false,
        }
    },
    methods: {

        hueControl(degree, divine, divineOrder) {
            return (degree + ((360 / divine) * divineOrder)) % 360
        },
        getColor(hue, sat, light) {
            let firstHue = this.hueControl(hue, 2, 0)
            let secondHue = this.hueControl(hue, 2, 1)

            let first = hsl2hex(firstHue, sat, light)
            let second = hsl2hex(secondHue, sat, light)
            
            document.getElementById('app').style.setProperty("--first-color", first)
            document.getElementById('app').style.setProperty("--second-color", second)
        },
        getRGB() {
            let rgb = hsl2rgb(this.hue, this.saturation, this.lightness)
            this.red = rgb[0]
            this.green = rgb[1]
            this.blue = rgb[2]
        },
        editColorShowText() {
            this.isEditColorShowText = !this.isEditColorShowText
        }

    },
    watch: {
        hue(value) {
            this.getColor(value, this.saturation, this.lightness)
            this.getRGB()
        },
        saturation(value) {
            this.getColor(this.hue, value, this.lightness)
            this.getRGB()
        },
        lightness(value) {
            this.getColor(this.hue, this.saturation, value)
            this.getRGB()
        }
    },
    computed: {
        
    }
}

</script>

<style scoped lang="scss">


// Contents areas
.contents {
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(20%, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1.6em; 
}

/* &:active {
    background-color: white;
    transition: background-color 3s;
    transform: rotateY(180deg);
    backface-visibility: hidden;
} */


// Common property
.cont {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 1.6em;
    text-shadow: 0 0 .1em  white;
    
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: .8em;
        font-size: 1.6em;
        cursor: pointer;
    }
}

// 1. Switch Color
@mixin switchColor($color1, $color2) {
    background-color: $color1;
    color: $color2;

    &:hover {
        background-color: $color2;
        color: $color1;
    }

    transition: background-color .5s,
    color .5s ease-in-out;
}

#switchColor {
    #b1 {
        @include switchColor($first, $forth)
    }

    #b2 {
        @include switchColor($second, $fifth)
    }

    #b3 {
        @include switchColor($third, $six)
    }

    #b4 {
        @include switchColor($forth, $first)
    }

    #b5 {
        @include switchColor($fifth, $second)
    }

    #b6 {
        @include switchColor($six, $third)
    }
}

// 2. Flip Cards
.flip-card-item {
    // height: 100%;
    position: relative;
    transition: transform .5s, background-color 1s;
    transform-style: preserve-3d;

    &:hover {
        transform: rotateY(180deg);
        // background-color: $third;
    }

    .flip-card-front,
    .flip-card-back {
        position: absolute;
        backface-visibility: hidden;
    }

    .flip-card-back {
        transform: rotateY(180deg)
    }
}

@mixin colorSet($color1, $color2) {
    .flip-card-front {
        background-color: $color1;
        color: $color2;
    }

    .flip-card-back {
        background: $color2;
        color: $color1;
    }
}

#flipCard {
    #b1 {
        @include colorSet($six, $third)
    }

    #b2 {
        @include colorSet($fifth, $second)
    }
}

// Controler property
.controlWrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
    place-content: center;

    input {
        width: 100%;
    }
}

.controlPanel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 1.6em 0 1.6em;
}

.color-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.numbers {
    font-size: 1.6em;
    width: 100%;
}

#colorControlers {
    display: grid;
    grid-gap: .8em;
}

// Color show
.color-show-swatch {
    height: 5em;
    color: white;
    text-align: center;
    place-items: center;


    .color-show-item {
        border-radius: 50%;
        width: 5em;
        height: 5em;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        box-shadow: 0 0 .5em .1em gray;
    }

    #first-color {
        background-color: var(--first-color);
    }

    #second-color {
        background-color: var(--second-color)
    }


}

#color-show-text {
    background-color: var(--first-color);
    color: var(--second-color);

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: var(--second-color);
        color: var(--first-color);

        #color-show-edit {
            background-color: var(--first-color);
            color: var(--second-color);
        }
    }

    transition: background-color .25s,
    color .25s ease-in-out;

    p,
    input {
        width: 80%;
        margin-right: 1.6em;
    }

    #color-show-edit {
        background-color: var(--second-color);
        color: var(--first-color);
        cursor: pointer;
        width: 1.6em;
        height: 1.6em;
        font-size: 1.6em;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>