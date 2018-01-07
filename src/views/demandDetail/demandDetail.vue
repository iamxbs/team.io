<template>
    <div>
        <Row>
            <Col span="24">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="stats-bars"></Icon>
                        {{currentDemandInfo.text}}
                        <span style="float: right;">
                            <Button icon="close" type="text" @click="closePage"></Button>
                        </span>
                    </p>
                    <div>
                        <Row style="padding-top: 10px">
                            <Col span="8" style="padding-right:5px">
                            <div>
                                <Card>
                                    <p slot="title">
                                        <Icon type="clipboard"></Icon>
                                        当前需求概况
                                    </p>
                                    <div class="height-240px">
                                        <Row>
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">标题</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            {{currentInfo.name}}</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">需求编号</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            {{currentInfo.cqCode}}</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">提出人</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            {{currentInfo.requireMan}}</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">提出时间</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            {{currentInfo.createDate}}</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">紧急程度</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            <Rate allow-half :value="currentInfo.level" :disabled="true"></Rate>
                                            </Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <Tag type="dot" color="blue" style="border:0!important;margin:0;">需求版本</Tag>
                                            </Col>
                                            <Col span="16" class="padding-left-8 not-wrap-text">
                                            {{currentInfo.version}}</Col>
                                        </Row>
                                    </div>
                                </Card>
                            </div>
                            </Col>
                            <Col span="8" style="padding:0 5px">
                            <div>
                                <Card>
                                    <p slot="title">
                                        <Icon type="arrow-graph-up-right"></Icon>
                                        计划工时统计
                                    </p>
                                    <div class="height-240px">
                                        <plan-map :currentData="currentPlan"></plan-map>
                                    </div>
                                </Card>
                            </div>
                            </Col>
                            <Col span="8" style="padding-left:5px">
                            <div>
                                <Card>
                                    <p slot="title">
                                        <Icon type="connection-bars"></Icon>
                                        实际工时统计
                                    </p>
                                    <div class="height-240px">
                                        <demand-map :currentData="currentDemand"></demand-map>
                                    </div>
                                </Card>
                            </div>
                            </Col>
                        </Row>
                        <Row style="padding-top: 10px;padding-right:10px">
                            <Col span="24">
                            <div>
                                <Card>
                                    <p slot="title">
                                        <Icon type="stats-bars"></Icon>
                                        进度明细
                                    </p>
                                    <div class="height-380px" id="ganttContainer">
                                        <div style="height: 100%" id="container"></div>
                                    </div>
                                </Card>
                            </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
        <Modal
                v-model="modal"
                :title="currentTask?currentTask.text+'阶段':'暂无'"
                @on-ok="modal = false"
                @on-cancel="modal = false">
            <Row>
                <Col span="8">
                <Tag type="dot" color="blue" style="border:0!important;margin:0;">负责人</Tag>
                </Col>
                <Col span="16" class="padding-left-8 not-wrap-text">
                {{currentTask?currentTask.name:"暂无"}}</Col>
            </Row>
            <Row class="margin-top-8">
                <Col span="8">
                <Tag type="dot" color="blue" style="border:0!important;margin:0;">开始时间</Tag>
                </Col>
                <Col span="16" class="padding-left-8 not-wrap-text">
                {{currentTask?currentTask.start_date:"暂无"}}</Col>
            </Row>
            <Row class="margin-top-8">
                <Col span="8">
                <Tag type="dot" color="blue" style="border:0!important;margin:0;">结束时间</Tag>
                </Col>
                <Col span="16" class="padding-left-8 not-wrap-text">
                {{currentTask?currentTask.end_date:"暂无"}}</Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
  import demandMap from "../demands/component/demandMap.vue";
  import planMap from "../demands/component/planMap.vue";
  export default {
    components: {
      "demand-map": demandMap,
      "plan-map": planMap
    },
    data(){
      return {
        modal:false,
        currentDemandInfo:{},
        currentTask:null,
        currentInfo:{
          createDate: "2017-08-31",
          cqCode: "CQ_201708084",
          name: "关于开发银联批量代付功能",
          requireMan: "张胜平",
          department: "财务部",
          system: "支付平台",
          otherSystem: "核心",
          request: "",
          version: "2017Q4",
          expectDate: "2017-09-08",
          desc: "",
          level: 3
        },
        currentPlan:[
          {
            name: "分析",
            icon: "social-twitch-outline",
            requiredMan: "黄彦娇",
            requireMan: "张艳丽",
            startDate: "2017-10-09",
            endDate: "2017-10-10",
            status: 1,
            edited: true
          },
          {
            name: "开发",
            icon: "social-nodejs",
            requiredMan: "黄彦娇",
            requireMan: "丁健",
            startDate: "2017-10-11",
            endDate: "2017-10-16",
            status: 1,
            edited: true
          },
          {
            name: "DAT测试",
            icon: "android-expand",
            requiredMan: "丁健",
            requireMan: "张三",
            startDate: "2017-10-17",
            endDate: "2017-10-23",
            status: 1,
            edited: true
          },
          {
            name: "UAT测试",
            icon: "android-contract",
            requiredMan: "张三",
            requireMan: "李四",
            startDate: "2017-10-24",
            endDate: "2017-10-29",
            status: 1,
            edited: true
          },
          {
            name: "预生产",
            icon: "android-exit",
            requiredMan: "李四",
            requireMan: "王五",
            startDate: "2017-10-30",
            endDate: "2017-11-06",
            status: 1,
            edited: true
          },
          {
            name: "生产",
            icon: "android-checkbox-outline",
            requiredMan: "王五",
            requireMan: "赵六",
            startDate: "2017-11-07",
            endDate: "2017-11-09",
            status: 1,
            edited: true
          }
        ],
        currentDemand:[
          {
            name: "分析",
            icon: "social-twitch-outline",
            requiredMan: "黄彦娇",
            requireMan: "张艳丽",
            startDate: "2017-10-11",
            endDate: "2017-10-12",
            status: 1,
            edited: true
          },
          {
            name: "开发",
            icon: "social-nodejs",
            requiredMan: "黄彦娇",
            requireMan: "丁健",
            startDate: "2017-10-13",
            endDate: "2017-10-19",
            status: 1,
            edited: true
          },
          {
            name: "DAT测试",
            icon: "android-expand",
            requiredMan: "丁健",
            requireMan: "张三",
            startDate: "2017-10-20",
            endDate: "2017-10-25",
            status: 1,
            edited: true
          },
          {
            name: "UAT测试",
            icon: "android-contract",
            requiredMan: "张三",
            requireMan: "李四",
            startDate: "2017-10-26",
            endDate: "2017-10-31",
            status: 1,
            edited: true
          },
          {
            name: "预生产",
            icon: "android-exit",
            requiredMan: "李四",
            requireMan: "王五",
            startDate: "2017-11-01",
            endDate: "2017-11-04",
            status: 1,
            edited: true
          },
          {
            name: "生产",
            icon: "android-checkbox-outline",
            requiredMan: "王五",
            requireMan: "赵六",
            startDate: "2017-11-05",
            endDate: "2017-11-11",
            status: 1,
            edited: true
          }
        ]
      }
    },
    methods: {
      initDhxGantt(){
        let tasks = {
          data: [
            {
              id: 1, text: "分析", name:"黄彦娇", start_date: "09-10-2017", duration: 1, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 2, text: "分析实际", name:"黄彦娇", start_date: "10-10-2017", duration: 1, order: 10,
              progress: 1 ,priority:1
            },
            {
              id: 3, text: "开发", name:"丁健", start_date: "10-10-2017", duration: 7, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 4, text: "开发实际", name:"丁健", start_date: "11-10-2017", duration: 7, order: 10,
              progress: 1 ,priority:1
            },
            {
              id: 5, text: "DAT", name:"黄新宇", start_date: "19-10-2017", duration: 8, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 6, text: "DAT实际", name:"黄新宇", start_date: "20-10-2017", duration: 8, order: 10,
              progress: 1 ,priority:1
            },
            {
              id: 7, text: "UAT", name:"黄兆福", start_date: "31-10-2017", duration: 5, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 8, text: "UAT实际", name:"黄兆福", start_date: "01-11-2017", duration: 5, order: 10,
              progress: 1 ,priority:1
            },
            {
              id: 9, text: "预生产", name:"张三", start_date: "07-11-2017", duration: 3, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 10, text: "预生产实际", name:"张三", start_date: "08-11-2017", duration: 3, order: 10,
              progress: 1 ,priority:1
            },
            {
              id: 11, text: "生产", name:"李四", start_date: "10-11-2017", duration: 4, order: 10,
              progress: 1, open: true ,priority:0
            },
            {
              id: 12, text: "生产实际", name:"李四", start_date: "11-11-2017", duration: 4, order: 10,
              progress: 1 ,priority:1
            }
          ],
          links: [
            {id: 1, source: 1, target: 2, type: "1"},
            {id: 3, source: 3, target: 4, type: "1"},
            {id: 5, source: 5, target: 6, type: "1"},
            {id: 7, source: 7, target: 8, type: "1"},
            {id: 9, source: 9, target: 10, type: "1"},
            {id: 11, source: 11, target: 12, type: "1"}
          ]
        };
        gantt.config.columns[0].hide = false;
        gantt.config.columns[0].tree = true;
        gantt.config.columns[0].width = 150;
        gantt.config.columns[0].label = "阶段名称";
        gantt.config.columns[1].hide = false;
        gantt.config.columns[1].label = "开始时间";
        gantt.config.columns[2].hide = true;
        gantt.config.columns[3].hide = true;
        gantt.templates.task_class  = function(start, end, task){
          switch (task.priority){
            case 1:
              return "high";
              break;
            case 0:
              return "low";
              break;
            case 3:
              return "medium";
              break;
          }
        };
        gantt.templates.task_text = function (start, end, task) {
          return "<div>"+ task.text + "</div>";
        };
        gantt.attachEvent("onTaskSelected", (id) => {
          let data = tasks.data;
          for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
              this.currentTask = data[i];
              this.modal = true;
            }
          }
        });
        let weekScaleTemplate = function(date){
          let dateToStr = gantt.date.date_to_str("%d %M");
          let weekNum = gantt.date.date_to_str("(week %W)");
          let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
          return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
        };
        gantt.templates.scale_cell_class = function(date){
          if(date.getDay()==0||date.getDay()==6){
            return "weekend";
          }
        };
        gantt.templates.task_cell_class = function(item,date){
          if(date.getDay()==0||date.getDay()==6){
            return "weekend" ;
          }
        };
        gantt.config.subscales = [
          {unit:"month", step:1, date:"%F, %Y"},
          {unit:"week", step:1, template:weekScaleTemplate}

        ];
        gantt.config.scale_unit = "day";
        gantt.config.date_scale = "%D, %d";
        gantt.config.min_column_width = 60;
        gantt.config.duration_unit = "day";
        gantt.config.scale_height = 20*3;
        gantt.config.row_height = 25;
        gantt.config.work_time = true;
        gantt.init("container");
        gantt.parse(tasks);
      },
      closePage(){
        this.$router.push({
          name: "demand_quarter"
        });
      }
    },
    mounted(){
      if(this.$route.params.id){
        this.currentDemandInfo = this.$route.params;
        this.initDhxGantt()
      }else{
        this.$router.push({
          name: "demand_quarter"
        });
      }
    },
    beforeDestroy(){
      gantt.clearAll();
    }
  }
</script>