<template>
  <div style="padding:15px;background-color: white;border-bottom:1px solid #f0f0f0">
    <span class="input-label" style="display: inline-block;font-size: 14px;padding: 0;">{{label}}</span>
    <input :id="target" class="mulInput" type="text" disabled placeholder="请选择" :value="v">
    <i class="icon ion-ios-arrow-right"
       style="position: absolute;right: 15px;color:#DDD;font-size: 24px;margin-top:-3px;"></i>
    <div :id="targetContainer"></div>
  </div>
</template>
<script>
  import MultiPicker from 'mob-multi-picker';
  export default {
    name: "mulPicker",
    props: {
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      targetContainer: {
        type: String,
        default: ''
      },
      target: {
        type: String,
        default: ''
      },
      jsonData: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        json: []
      }
    },
    methods: {
      init(data){
        new MultiPicker({
          input: this.target,
          container: this.targetContainer,
          jsonData: data,
          success: (arr) => {
            if(arr[0].id !== null){
              this.$emit('getValue', arr)
            }else{
              return
            }
          }
        });
      }
    },
    watch:{
      jsonData(){
        this.init(this.jsonData)
      }
    },
    computed: {
      v: function () {
        return this.value
      }
    },
    mounted(){
      this.init(this.jsonData)
    }
  }
</script>
<style>
  .multi-picker {
    /*box-shadow: 1px 0px 0px #ddd;*/
  }
  .mulInput::-webkit-input-placeholder {
    color: black !important;
  }
  .mulInput {
    color: black !important;
    position: absolute;
    top: auto;
    right: 11px;
    margin-top: -28px;
    max-width: 240px;
    margin-right: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
