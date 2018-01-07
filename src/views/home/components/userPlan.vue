<template>
    <div style="padding:40px 20px">
        <div id="calendar"></div>
    </div>
</template>
<script>
  export default {
    props:{
      dataSource:Array
    },
    data(){
      return {}
    },
    methods: {
      initCalendar(){
        let thus = this;
        $('#calendar').calendar({
          enableContextMenu: true,
          enableRangeSelection: true,
          selectRange: function (e) {
          },
          mouseOnDay: function (e) {//hover时查看当天信息
            //e..events是当前信息的数据dataSource
            if (e.events.length > 0) {
              let content = '';
              for (let i in e.events) {
                content += '<div class="event-tooltip-content">'
                    + '<div style="color:black"><span style="color:rgb(156, 183, 3);font-weight:bold">员工姓名</span> : ' + e.events[i].name + '</div>'
                    + '<div style="color:black"><span style="color:rgb(156, 183, 3);font-weight:bold">需求进度</span> : ' + e.events[i].modules + '</div>'
                    + '<div style="color:black"><span style="color:rgb(156, 183, 3);font-weight:bold">需求名称</span> : ' + e.events[i].task + '</div>'
                    + '<div style="color:black"><span style="color:rgb(156, 183, 3);font-weight:bold">相关备注</span> : ' + e.events[i].text + '</div>'
                    + '</div>';
              }

              $(e.element).popover({
                trigger: 'manual',
                container: 'body',
                html: true,
                content: content
              });

              $(e.element).popover('show');
            }
          },
          mouseOutDay: function (e) {
            if (e.events.length > 0) {
              $(e.element).popover('hide');
            }
          },
          dayContextMenu: function (e) {
            $(e.element).popover('hide');
          },
          dataSource: thus.dataSource
        })
      }
    },
    mounted(){
      this.initCalendar()
    }
  }
</script>
<style lang="less" scoped>
    #calendar {
        width: 100%;
        height: 100%;
        background-color: white;
        overflow: hidden;
        color: #333;
    }
    .event-title {
        color: indianred;
    }
    @import "styles/bootstrap-datepicker.min.css";
    @import "styles/bootstrap-year-calendar.min.css";
    @import "styles/bootstrap-3.3.5/css/bootstrap.min.css";
</style>