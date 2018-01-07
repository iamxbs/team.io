<template>
    <div>
        <Table :show-header="false" :height="height" :columns="columns" :data="weatherData"></Table>
    </div>
</template>

<script>
  export default {
    name: 'temperatureDataTable',
    data () {
      return {
        columns: [
          {
            title: '日期',
            key: 'week',
            width: 80
          },
          {
            title: '温度(℃)',
            key: 'temperature',
            sortable: true,
            width: 120,
            align: "center"
          },
          {
            title:"天气",
            key:"weather",
            render:(h,params) =>{
              let name = "#icon-yin";
              if(params.row.weather === "多云"){
                name = "#icon-duoyun-copy"
              }else if(params.row.weather === "多云转晴"){
                name = "#icon-duoyun-copy"
              }else if(params.row.weather === "晴"){
                name = "#icon-qing"
              }
              return h("div",[
                  h("svgIcon",{
                    props:{
                      name:name
                    }
                  }),
                  h('span',{
                    style:{
                      "marginLeft":"5px"
                    }
                  },params.row.weather)
              ])
            }
          }
        ]
      };
    },
    props: {
      weatherData: Array,
      height: String
    }
  };
</script>
