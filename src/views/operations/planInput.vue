<template>
    <div>
        <Row>
            <Col span="24">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        需求清单列表
                    </p>
                    <div>
                        <Table size="small" :highlight-row="true" :data="tableData"
                               :columns="tableColumns" :row-class-name="rowClassName"></Table>
                    </div>
                    <div style="margin: 10px">
                        <Page :total="5" :current="1"></Page>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
        <Row style="padding-top: 10px" v-if="currentData.length > 0">
            <Col span="16" style="padding-right:5px">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        需求计划录入
                    </p>
                    <div>
                        <Tabs>
                            <TabPane v-for="(item , index) in pointsOfPlan[currentIndex]" :key="index"
                                     :label="item.name" :name="index.toString()" :icon="item.icon">
                                <div style="padding: 0 15px;">
                                    <Row>
                                        <Col :span="widthSign?8:24" style="padding-right:5px">
                                        <Alert show-icon>开始时间:&nbsp;&nbsp;&nbsp;{{item.startDate}}</Alert>
                                        </Col>
                                        <Col :span="widthSign?8:24" style="padding:0 5px">
                                        <Alert type="success" show-icon>结束时间:&nbsp;&nbsp;&nbsp;2017-10-14</Alert>
                                        </Col>
                                        <Col :span="widthSign?8:24" style="padding-left:5px">
                                        <Alert type="warning" show-icon>工时总计:&nbsp;&nbsp;&nbsp;6天</Alert>
                                        </Col>
                                    </Row>
                                    <div style="padding:10px 0">
                                        <Table :show-header="false" size="small" :columns="planColumns"
                                               :data="planData"></Table>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </div>
            </Col>
            <Col span="8" style="padding-left:5px">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="chatbox-working"></Icon>
                        操作日志
                    </p>
                    <div>
                        <Row>
                            <Col span="24">
                            <div style="padding:25px 25px 0 25px">
                                <Timeline pending>
                                    <TimelineItem>
                                        <Icon type="android-done" slot="dot"></Icon>
                                        <span style="color:#2d8cf0">张艳丽（总负责人）</span>已经分派给<span
                                            style="color:#ff9900"> 黄彦娇（分析）</span>
                                        <br>
                                        <span style="color:#abcdef">2017-10-09 10:31</span>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <Icon type="android-done" slot="dot"></Icon>
                                        <span style="color:#2d8cf0">张艳丽（总负责人）</span>已经分派给<span style="color:#ff9900"> 丁健（分析）</span>
                                        <br>
                                        <span style="color:#abcdef">2017-10-09 10:32</span>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <Icon type="android-done" slot="dot"></Icon>
                                        <span style="color:#2d8cf0">张艳丽（总负责人）</span>已经分派给<span style="color:#ff9900"> 张三（分析）</span>
                                        <br>
                                        <span style="color:#abcdef">2017-10-09 10:33</span>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <Icon type="more" slot="dot"></Icon>
                                        <a href="#">查看更多</a>
                                    </TimelineItem>
                                </Timeline>
                            </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
        <main-order-dialog @onChangeStatus="onChangeStatus" :mainFlag="mainFlag"></main-order-dialog>
        <Modal v-model="lockedModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>锁定确认</span>
            </p>
            <div style="text-align:center">
                <p>此操作会导致其他用户无法进行该需求录入工作</p>
                <p>是否继续？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="onLock">Lock</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import planMap from './component/planMap.vue';
  import mainOrderDialog from "./component/mainOrderDialog.vue";
  import Util from "util"
  export default {
    components: {
      "plan-map": planMap,
      "main-order-dialog": mainOrderDialog
    },
    data(){
      return {
        currentData: [],
        lockedModal: false,
        mainFlag: false,
        currentTabIndex: null,
        tableData: [
          {
            id: 1,
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
            level: "2",
            locked: true
          },
          {
            id: 2,
            createDate: "2017-08-28",
            cqCode: "CQ_201708037",
            name: "团、银手续费佣金功能新建及改造",
            requireMan: "王彩萍",
            department: "财务部",
            system: "核心系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "1",
            locked: false
          },
          {
            id: 3,
            createDate: "2017-08-21",
            cqCode: "CQ_201708027",
            name: "增加个险佣金预算科目",
            requireMan: "过轶婷",
            department: "财务部",
            system: "核心系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "2",
            locked: false
          },
          {
            id: 4,
            createDate: "2017-06-13",
            cqCode: "CQ_201706020",
            name: "关于oa商务合同审核审批流程的优化",
            requireMan: "袁菁",
            department: "法律合规部/风险管理部",
            system: "OA系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "0",
            locked: true
          }
        ],
        tableColumns: [
          {
            title: "需求编号",
            key: "cqCode",
            width: 150
          },
          {
            title: "标题",
            key: "name",
            render: (h, params) => {
              let colors = ["blue", "green", "red"];
              return h("Tag", {
                props: {
                  type: "border",
                  color: colors[Number(params.row.level)]
                }
              }, params.row.name)
            }
          },
          {
            title: "锁定",
            key: "lock",
            width: 80,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h('Button', {
                  props: {
                    icon: params.row.locked ? "locked" : "unlocked",
                    type: "text",
                    size: "large"
                  },
                  on: {
                    click: () => {
                      this.currentIndex = params.index;
                      if (params.row.locked) {
                        this.tableData[params.index].locked = false
                      } else {
                        this.lockedModal = true
                      }
                    }
                  }
                })
              ])
            }
          },
          {
            title: "提出日期",
            width: 150,
            sortable: true,
            key: "createDate"
          },
          {
            title: "提出人",
            width: 100,
            key: "requireMan"
          },
          {
            title: "需求部门",
            width: 200,
            key: "department"
          },
          {
            title: "操作",
            key: "action",
            width: 160,
            render: (h, params) => {
              return h("div", [
                h('Button', {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled: params.row.locked
                  },
                  style: {
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      this.mainFlag = true;
                    }
                  }
                }, "分配"),
                h('Button', {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.planClick(params.row, params.index)
                    }
                  }
                }, "查看")
              ])
            }
          }
        ],
        pointsOfPlan: [
          [
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
              icon: "android-contract",
              requiredMan: "张三",
              requireMan: "李四",
              startDate: "2017-08-19",
              endDate: "2017-08-26",
              status: 1,
              edited: true
            },
            {
              name: "生产",
              icon: "android-contract",
              requiredMan: "张三",
              requireMan: "李四",
              startDate: "2017-08-19",
              endDate: "2017-08-26",
              status: 1,
              edited: true
            }
          ], [
            {
              name: "分析",
              icon: "social-twitch-outline",
              requiredMan: "黄彦娇",
              requireMan: "张艳丽",
              startDate: "2017-08-02",
              endDate: "2017-08-05",
              status: 1,
              edited: true
            },
            {
              name: "开发",
              icon: "social-nodejs",
              requiredMan: "黄彦娇",
              requireMan: "丁健",
              startDate: "2017-08-05",
              endDate: "2017-08-13",
              status: 1,
              edited: true
            },
            {
              name: "DAT测试",
              icon: "android-expand",
              requiredMan: "丁健",
              requireMan: "张三",
              startDate: "2017-08-14",
              endDate: "2017-08-18",
              status: 1,
              edited: true
            },
            {
              name: "UAT测试",
              icon: "android-contract",
              requiredMan: "张三",
              requireMan: "李四",
              startDate: "2017-08-19",
              endDate: "2017-08-26",
              status: 1,
              edited: true
            }
          ]
        ],
        dateContainer: {
          startDate: "",
          endDate: ""
        },
        planColumns: [
          {
            title: '人员',
            key: 'name',
            width: 80
          },
          {
            title: '开始时间',
            key: 'startDate',
            align: "center",
            render: (h, params) => {
              if (params.row.status) {
                return h("div", {
                  "class": "ivu-table-cell"
                }, [
                  h('span', params.row.startDate)
                ])
              } else {
                return h("DatePicker", {
                  props: {
                    type: "date",
                    transfer:true,
                    value: params.row.startDate,
                    placement:"top"
                  },
                  on:{
                    "on-change":(date) =>{
                      this.planData[params.index].startDate = date
                    }
                  }
                })
              }
            }
          },
          {
            title: "修饰符",
            key: "icon",
            align: "center",
            width: 50,
            render: (h, params) => {
              return h("Icon", {
                props: {
                  type: "minus-round"
                }
              })
            }
          },
          {
            title: '结束时间',
            key: 'endDate',
            align: "center",
            render: (h, params) => {
              if (params.row.status) {
                return h("div", {
                  "class": "ivu-table-cell"
                }, [
                  h('span', params.row.endDate)
                ])
              } else {
                return h("DatePicker", {
                  props: {
                    type: "date",
                    transfer:true,
                    value: params.row.endDate,
                    placement:"top"
                  },
                  on:{
                    "on-change":(date) =>{
                      this.planData[params.index].endDate = date
                    }
                  }
                })
              }
            }
          },
          {
            title: '工作量',
            key: 'duration',
            width: 120,
            render: (h, params) => {
              return h("div", {
                "class": "ivu-table-cell"
              }, [
                h('span', params.row.duration),
                h('span', '天')
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 50,
            render: (h, params) => {
              if (params.row.status) {
                return h("a", {
                  on: {
                    click: () => {
                      this.$Message.info('编辑');
                      this.planData[params.index].status = 0;
                    }
                  }
                }, [
                  h("Icon", {
                    props: {
                      type: "edit",
                    },
                    style: {
                      "color": "#2d8cf0"
                    }
                  })
                ])
              } else {
                return h("a", {
                  on: {
                    click: () => {
                      this.planData[params.index].duration = Util.getDays(this.planData[params.index].startDate,this.planData[params.index].endDate).length;
                      this.$Message.success('保存');
                      this.planData[params.index].status = 1
                    }
                  }
                }, [
                  h("Icon", {
                    props: {
                      type: "checkmark",
                    },
                    style: {
                      "color": "#19be6b"
                    }
                  })
                ])
              }
            }
          }
        ],
        planData: [
          {
            name: "张三",
            startDate: "2017-10-09",
            endDate: "2017-10-10",
            duration: "2",
            status: 1
          },
          {
            name: "李四",
            startDate: "",
            endDate: "",
            duration: "",
            status: 0
          }
        ]
      }
    },
    computed:{
      widthSign(){
        console.log(this.$store)
        if(this.$store.state.app.currentWindowWidth > 1340){
          return true
        }else {
          return false
        }
      }
    },
    methods: {
      planClick(row, index){
        this.currentIndex = index;
        if (this.pointsOfPlan.length >= index + 1) {
          this.currentData = this.pointsOfPlan[index]
        } else {
          this.currentData = []
        }
      },
      rowClassName(row, index){
        if (row.locked) {
          return "locked-table-info-row"
        } else {
          return "unlocked-table-info-row"
        }
      },
      onChangeStatus(){
        this.mainFlag = false;
      },
      onLock(){
        this.tableData[this.currentIndex].locked = true;
        this.lockedModal = false
      },
      onSavePlanDate(row){

      },
      orderDev(){
        this.flag = true
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less">
    @import "./planInput";
</style>