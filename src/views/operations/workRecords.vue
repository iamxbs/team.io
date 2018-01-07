<template>
    <div>
        <Row>
            <Col span="24">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        个人需求列表
                    </p>
                    <div>
                        <Table size="small" :highlight-row="true" :data="tableData" :columns="tableColumns">
                        </Table>
                        <div style="margin-top:10px;text-align: right">
                            <Button type="success" @click="onSaveRecords">保存</Button>
                        </div>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
  import workRecordsExpandRow from "./component/workRecordsExpandRow.vue"
  export default {
    data(){
      return {
        tableData: [
          {
            id: 2,
            createDate: "2017-08-28",
            cqCode: "CQ_201708037",
            name: "团、银手续费佣金功能新建及改造",
            requireMan: "王彩萍",
            requiredMan: "张峰",
            department: "财务部",
            system: "核心系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "1",
            step: "分析"
          },
          {
            id: 3,
            createDate: "2017-08-21",
            cqCode: "CQ_201708027",
            name: "增加个险佣金预算科目",
            requireMan: "过轶婷",
            requiredMan: "丁健",
            department: "财务部",
            system: "核心系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "2",
            step: "测试"
          },
          {
            id: 4,
            createDate: "2017-06-13",
            cqCode: "CQ_201706020",
            name: "关于oa商务合同审核审批流程的优化",
            requireMan: "袁菁",
            requiredMan: "李俊",
            department: "法律合规部/风险管理部",
            system: "OA系统",
            otherSystem: "",
            request: "",
            version: "2017Q4",
            expectDate: "2017-09-08",
            desc: "",
            level: "0",
            step: "开发"
          }
        ],
        tableColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(workRecordsExpandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: "需求编号",
            key: "cqCode",
            width: 150
          },
          {
            title: "标题",
            key: "name",
            ellipsis: true,
            render: (h, params) => {
              return h("a", {
                on: {
                  click: () => {
                    this.$router.push({
                      name: "plan_personalTask",
                      params: params.row
                    });
                  }
                }
              }, params.row.name)
            }
          },
          {
            title: "负责阶段",
            key: "step",
            width: 100,
            align: "center",
            render: (h, params) => {
              let colors = ["blue", "green", "yellow"];
              return h("div", [
                h('Tag', {
                  props: {
                    color: colors[params.row.level]
                  }
                }, params.row.step)
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
          }
        ]
      }
    },
    methods: {
      onSaveRecords(){
        $.ajax({
          type:'GET',
          url:'http://v.juhe.cn/weather/index?cityname=%E6%97%A0%E9%94%A1&dtype=&format=&key=a6c1368de59d942c60375429e73af739',
          dataType:'JSONP',
          success:function(basic){
            console.log(basic);
          },
        });
      }
    },
    mounted(){
    }
  }
</script>