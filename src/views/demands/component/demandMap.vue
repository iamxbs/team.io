<template>
    <div style="width:100%;height:100%;" id="demand_map"></div>
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
          let demandMap = echarts.init(document.getElementById('demand_map'));
          let mapData = [];
          let colors = ["#9bd598","#ffd58f","#abd5f2","#ab8df2","#bbbec4","#e14f60"];
          for(let i=0;i<data.length;i++){
            mapData.push({
              value: data[i].startDate !== data[i].endDate ? util.getDays(data[i].startDate,data[i].endDate).length:0,
              name: data[i].name,
              itemStyle: {
                normal: {color: colors[i]}
              },
              selected: data[i].name === "预生产" ? true:false
            })
          }

          const option = {
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: "工作周期",
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: mapData,
                symbol: 'roundRect',
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          demandMap.setOption(option);
          window.addEventListener('resize', function () {
            demandMap.resize();
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
