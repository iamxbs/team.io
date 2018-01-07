<template>
    <div style="width:100%;height:100%;" id="plan_map"></div>
</template>

<script>
  const echarts = require('echarts');
  import util from 'util';
  export default {
    name: 'planMap',
    props:{
      currentData:Array
    },
    data () {
      return {
      };
    },
    methods:{
      init(){
        let data = this.currentData;
        if(data.length<1){
          return
        }else {
          let planMap = echarts.init(document.getElementById('plan_map'));
          let mapData = [];
          let colors = ["#bbbec4","#80848f","#5cadff","#2d8cf0","#19be6b","#ff9900"];
          for(let i=0;i<data.length;i++){
            mapData.push({
              value: data[i].startDate !== data[i].endDate ? util.getDays(data[i].startDate,data[i].endDate).length:0,
              name: data[i].requiredMan,
              itemStyle: {
                normal: {color: colors[i]}
              }
            })
          }

          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: 0,
              left: '2%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: ['生产', '预生产', 'UAT测试', 'DAT测试', '开发', '分析'],
              nameTextStyle: {
                color: '#c3c3c3'
              }
            },
            series: [
              {
                name: '工作周期',
                type: 'bar',
                data:mapData.reverse()
              }
            ]
          };
          planMap.setOption(option);
          window.addEventListener('resize', function () {
            planMap.resize();
          });
        }
      }
    },
    watch:{
      currentData:{
        handler(){
          this.init()
        },
        deep:true
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.init()
      });
    }
  };
</script>
