<template>
    <div>
        <div id="allmap" :style="{width:'100%',height:height}"></div>
    </div>
</template>
<script>
  import inMap from "inMap";
  export default {
    data(){
      return {
        height: "100vh"
      }
    },
    methods: {
      openMap(){
        let data = [
          {
            lng: 120.31183,
            lat: 31.496355,
            count: 100,
            name: "国联金融(金融一街)",
            address: "观山路太湖新城金融一街10号楼",
          },
          {
            lng: 120.308761,
            lat: 31.586044,
            count: 100,
            name: "国联金融（县前东街）",
            address: "县前东街168号国联大厦1层"
          }
        ];
        let inmap = new inMap.Map({
          id: "allmap",
          skin: "",
          center: [120.308761, 31.586044],
          zoom: {
            value: 22,
            show: true,
            max: 22,
            min: 5
          }
        });
        let overlay = new inMap.ImgOverlay({
          tooltip: {
            show: true,
            formatter: function (params) {
              return (
                  '<div>' +
                  ' <div>' +
                  ' <span class="name">' + params.name + '</span>' +
                  " </div>" +
                  ' <div>' +
                  ' <span>地址 : </span><span>' + params.address + '</span>' +
                  " </div>" +
                  ' <div>' +
                  ' <span></span><span>坐标 : </span><span>' +
                  params.lng + ',' + params.lat +
                  "</span></div></div>"
              )
                  ;
            },
            offsets: {
              top: 15,
              left: 15
            },
            customClass: "baiduMapTips"
          },
          style: {
            normal: {
              icon: 'static/image/r.png',
              width: 25,
              height: 25,
              offsets: {
                top: "-100%",
                left: "-50%"
              }
            },
            mouseOver: {
              backgroundColor: "rgba(200, 200, 200, 1)",
              borderColor: "rgba(255,255,255,1)",
              borderWidth: 1
            },
            selected: {
              borderWidth: 1,
              backgroundColor: "rgba(184,0,0,1)",
              borderColor: "rgba(255,255,255,1)"
            }
          },
          data: data,
        });
        inmap.add(overlay);
      }
    },
    mounted(){
      $(window).resize(() => {
        this.height = (window.innerHeight - 130) + "px";
        this.openMap()
      });
//      this.height = (window.innerHeight - 130) + "px";
      this.openMap()
    }
  }
</script>