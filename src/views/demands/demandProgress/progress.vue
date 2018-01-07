<template>
    <div>
        <Row>
            <Col span="24">
            <div>
                <Card>
                    <p slot="title">
                        <Icon type="stats-bars"></Icon>
                        筛选条件
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="100" style="padding-right:30px;padding-top: 16px">
                            <Row>
                                <Col span="6">
                                <FormItem label="时间区间">
                                    <DatePicker :transfer="true" style="width:100%" v-model="formItem.date"
                                                type="daterange" placement="bottom-end"
                                                placeholder="开始/截止时间"></DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="6">
                                <FormItem label="季度选择">
                                    <Select v-model="formItem.quarter" placeholder="例如：第一季度">
                                        <Option v-for="i in 4" :value="i" :key="i">第{{i}}季度</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="6">
                                <FormItem label="所属环境">
                                    <Select v-model="formItem.env" placeholder="例如：DAT">
                                        <Option v-for="i in envs" :value="i" :key="i">{{i}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="6" style="padding:0 10px">
                                <Button type="primary" @click="onSearch">查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
        <Row style="padding-top:10px" v-if="currentEnv">
            <Col span="24">
            <div>
                <Card>
                    <div slot="title">
                        <p>
                            <Icon type="stats-bars"></Icon>
                            季度需求进度(环境:{{currentEnv}})
                        </p>
                        <span style="float: right;margin-top:-22px">
                        <Tag color="blue">正常</Tag>
                        <Tag color="yellow">延期</Tag>
                        <Tag color="red">延误</Tag>
                    </span>
                    </div>
                    <div style="height: 500px;">
                        <div style="height: 100%;width:100%" id="containers"></div>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
  import data from "./GanttData"
  export default {
    data(){
      return {
        formItem: {
          env: '',
          date: '',
          quarter: ''
        },
        currentEnv: null,
        types: {
          type1: "default",
          type2: "default",
          type3: "default"
        },
        envs: ["DEV", "DAT", "UAT"],
        status: [0, 1, 2],
        gantt: null
      }
    },
    methods: {
      initDhxGantt(datas){
//        甘特图列表
        gantt.config.columns[0].hide = true;
        gantt.config.columns[1].hide = true;
        gantt.config.columns[2].hide = true;
        gantt.config.columns[3].hide = true;
//        进度禁止
        gantt.config.progress = false;
//        单击事件方法
//        禁止双击事件
        gantt.attachEvent("onTaskDblClick", (id) => {
          return false
        });
        //悬浮显示ToolTip样式
        gantt.templates.tooltip_text = function (a, b, item) {
          let text = "<div><span>任务:</span>" + item.text + "<br>" +
              "<span>对接人:</span>" + item.name + "<br>" +
              "<span>开始时间:</span>" + item.start_date + "<br>" +
              "<span>结束时间:</span>" + item.end_date + "<br>" +
              "</div>";
          return text
        };
        //link-text
        gantt.templates.task_text = function (start, end, task) {
          return ""
        };
        gantt.templates.task_class = function (start, end, task) {
          switch (task.status) {
            case 1:
              return "delay";
              break;
            case 0:
              return "custom";
              break;
            case 2:
              return "overDelay";
              break;
          }
        };
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "%D, %d";
        gantt.config.min_column_width = 60;
        gantt.config.duration_unit = "day";
        gantt.config.scale_height = 20 * 3;
        gantt.config.row_height = 25;
        gantt.config.work_time = true;
        gantt.init("containers");
        gantt.parse(datas);
      },
      onBtnClick(e){
        if (e.target.innerText === "正常") {
          if (this.types.type1 === "success") {
            this.types.type1 = "default"
          } else {
            this.types.type1 = "success";
          }
        } else if (e.target.innerText === "延期") {
          if (this.types.type2 === "warning") {
            this.types.type2 = "default"
          } else {
            this.types.type2 = "warning"
          }
        } else {
          if (this.types.type3 === "error") {
            this.types.type3 = "default"
          } else {
            this.types.type3 = "error"
          }
        }
      },
      onSearch(){
        this.currentEnv = this.formItem.env;
        setTimeout(() => {
          if (this.formItem.env) {
            this.initDhxGantt(data)
          }
        }, 400)
      }
    },
    mounted(){
    },
    destroyed(){
      gantt.clearAll();
    }
  }
</script>