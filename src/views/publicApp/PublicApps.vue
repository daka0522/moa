<template>
    <div>
        <div v-if="$route.name === 'public-apps'" id="public-links"> 
            <router-link :to="{name: 'todo'}">Todo</router-link>
            <router-link :to="{name: 'style'}">Style</router-link>
            <router-link :to="{name: 'canvas'}">Canvas</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
#public-links a{
    margin: 0 1rem;
}
</style>