<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>
<script>
  export default {
    props:{
      name:String
    },
    data(){
      return {}
    },
    methods: {},
    mounted(){

    }
  }
</script>