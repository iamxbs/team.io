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
                                <Col span="8">
                                <FormItem label="需求版本">
                                    <Input v-model="formItem.input" placeholder="请输入"></Input>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="时间区间">
                                    <DatePicker style="width:100%" v-model="formItem.date" type="daterange"
                                                placement="bottom-end" placeholder="选择日期"></DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="所属系统">
                                    <Select v-model="formItem.select" placeholder="请选择">
                                        <Option v-for="i in 12" :value="i" :key="i">系统{{i}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                <FormItem label="需求级别">
                                    <Select v-model="formItem.select" placeholder="请选择">
                                        <Option v-for="i in 3" :value="i" :key="i">难度{{i}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="所属用户">
                                    <Input v-model="formItem.input" placeholder="请输入"></Input>
                                </FormItem>
                                </Col>
                                <Col span="8">
                                <FormItem label="需求名称">
                                    <Input v-model="formItem.name" placeholder="请输入"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                <FormItem label="需求状态">
                                    <ButtonGroup>
                                        <Button :type="types.type1" @click="onBtnClick">
                                            正常
                                        </Button>
                                        <Button :type="types.type2" @click="onBtnClick">
                                            延期
                                        </Button>
                                        <Button :type="types.type3" @click="onBtnClick">
                                            延误
                                        </Button>
                                    </ButtonGroup>
                                </FormItem>
                                </Col>
                                <Col span="16" style="text-align: right">
                                <Button type="primary" @click="onSearch">
                                    搜索
                                </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
        <Row style="padding-top:10px" v-if="">
            <Col span="24">
            <div>
                <Card>
                    <div slot="title">
                        <p>
                            <Icon type="stats-bars"></Icon>
                            季度需求
                        </p>
                        <span style="float: right;margin-top:-22px">
                        <Tag color="blue">分析</Tag>
                        <Tag color="green">开发</Tag>
                        <Tag color="yellow">分析</Tag>
                    </span>
                    </div>
                    <div style="height: 500px;">
                        <div style="height: 100%;width:100%" id="quarterContainer"></div>
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
          input: '',
          select: '',
          checkbox: ["0", "1", "2"],
          date: '',
          time: '',
        },
        types: {
          type1: "default",
          type2: "default",
          type3: "default"
        },
        status: [0, 1, 2],
        myEvent1: null,
        myEvent2: null,
        ganttStatus: false
      }
    },
    methods: {
      initDhxGantt(datas){
        gantt.init("quarterContainer");
        gantt.config.columns[0].hide = false;
        gantt.config.columns[0].width = 250;
        gantt.config.columns[1].hide = false;
        gantt.config.columns[1].name = "duration";
        gantt.config.columns[1].label = "周期";
        gantt.config.columns[2].hide = true;
        gantt.config.columns[3].hide = true;
        gantt.templates.task_class = function (start, end, task) {
          switch (task.priority) {
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
        //进度禁止
        gantt.config.progress = false;
        function renderLabel(task, progress, sum) {
          let num = null;
          let step = null;
          let length = null;
          if (progress === "progress1") {
            num = 1;
            step = "";
            length = task.progress1
          } else if (progress === "progress2") {
            num = 2;
            step = "";
            length = task.progress2
          } else if (progress === "progress3") {
            num = 3;
            step = "";
            length = task.progress3
          } else if (progress === "blank1") {
            num = 4;
            step = "";
            length = task.blank1
          } else if (progress === "blank2") {
            num = 5;
            step = "";
            length = task.blank2
          }
          let relWidth = length / sum * 100;
          let cssClass = "custom_progress ";
          if (num === 1) {
            cssClass += "nearly_done";
          } else if (num === 2) {
            cssClass += "in_progress";
          } else if (num === 3) {
            cssClass += "idle";
          } else if (num === 4) {
            cssClass += "blank1";
          } else if (num === 5) {
            cssClass += "blank2";
          }
          return "<div class='" + cssClass + "' style='width:" + relWidth + "%'>" + step + "</div>";

        }

        //更改task图形表现形式
        gantt.templates.task_text = function (start, end, task) {
          var summ = task.progress1 + task.blank1 + task.progress2 + task.blank2 + task.progress3;
          return renderLabel(task, "progress1", summ) + renderLabel(task, "blank1", summ) + renderLabel(task, "progress2", summ) + renderLabel(task, "blank2", summ) + renderLabel(task, "progress3", summ);
        };
        //单击事件方法
        this.myEvent1 = gantt.attachEvent("onTaskDblClick", (id) => {
          let data = datas.data;
          for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
              this.$router.push({
                name: "demandDetail_index",
                params: data[i]
              });
            }
          }
        });
        this.myEvent2 = gantt.attachEvent("onTaskRowClick", (id, row) => {
          return false
        });
        //禁止双击事件
        gantt.attachEvent("onTaskDblClick", (id) => {
          return false
        });
        //凸显周末
        let weekScaleTemplate = function (date) {
          let dateToStr = gantt.date.date_to_str("%d %M");
          let weekNum = gantt.date.date_to_str("(week %W)");
          let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
          return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
        };
        gantt.templates.scale_cell_class = function (date) {
          if (date.getDay() == 0 || date.getDay() == 6) {
            return "weekend";
          }
        };
        gantt.templates.task_cell_class = function (item, date) {
          if (date.getDay() == 0 || date.getDay() == 6) {
            return "weekend";
          }
        };
        //悬浮显示ToolTip样式
        gantt.templates.tooltip_text = function (a, b, item) {
          let text = "<div><span>任务:</span>" + item.text + "<br>" +
              "<span>对接人:</span>" + item.name + "<br>" +
              "<span>开始时间:</span>" + item.start_date + "<br>" +
              "<span>结束时间:</span>" + item.end_date + "<br>" +
              "</div>";
          return text
        };
        gantt.config.subscales = [
          {unit: "month", step: 1, date: "%F, %Y"},
          {unit: "week", step: 1, template: weekScaleTemplate}

        ];
        gantt.config.drag_links = false;
        gantt.config.drag_progress = false;
        gantt.config.scale_unit = "day";
        gantt.config.date_scale = "%D, %d";
        gantt.config.min_column_width = 60;
        gantt.config.duration_unit = "day";
        gantt.config.scale_height = 20 * 3;
        gantt.config.row_height = 25;
        gantt.config.work_time = true;
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
        setTimeout(() => {
          this.ganttStatus = true;
          this.initDhxGantt(data)
        }, 300)
      }
    },
    mounted(){
//      this.initDhxGantt(data)
    },
    destroyed(){
      gantt.detachEvent(this.myEvent1);
      gantt.detachEvent(this.myEvent2);
      gantt.clearAll();
    }
  }
</script>