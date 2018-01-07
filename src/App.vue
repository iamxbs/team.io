<template>
    <router-view></router-view>
</template>

<script>
  export default {
    data () {
      return {
        theme: this.$store.state.app.theme
      };
    },
    mounted () {
    },
    beforeDestroy () {

    },
    methods: {

    }
  };
</script>

<style>
    .app-main{
        width: 100%;
        height: 100%;
    }
</style>
