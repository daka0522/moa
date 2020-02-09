<template>
    <div class="options">
        <div id="theme-controler">
            <button id="theme-controler-btn" class="btn-small" @click="showMe()">Theme</button>
            <div id="theme-controler-panel" class="panel drop-down-panel" v-show="isDropDown">
                 <div>
                    <label for="mode">Dark Mode</label>
                    <input type="checkbox" name="mode" v-model="theme">
                </div>
            </div>

        </div>
        <div>
            <select class="select-small" v-model="lang">
                <option disabled value="">Language</option>
                <option value="en">English</option>
                <option value="kor">Korea</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: false,
            lang: '',
            isDropDown: false,
        }
    },
    methods: {
        showMe() {
            this.isDropDown = !this.isDropDown
        }
    },
    watch: {
        theme(nv) {
            if (nv) {
                document.documentElement.setAttribute('data-theme', 'dark')
            } else {
                document.documentElement.setAttribute('data-theme', 'light')
            }
        },
        lange(nv) {
            switch (nv) {
                case 'en':
                    document.documentElement.setAttribute('lang', 'en')
                    break;
                case 'kor' :
                    document.documentElement.setAttribute('lang', 'kor')
                    break;

            }
        }
    }
}
</script>

<style lang="scss" scoped>
.options {
    display: flex;
    align-items: center;
}

#theme-controler {
    position: relative;

    .drop-down-panel {
        display: block;
        position: absolute;
        margin: 0;
        // width: 10em;
        color: white;
        background-color: rgba(0, 0, 0, .5);
    }
}
</style>