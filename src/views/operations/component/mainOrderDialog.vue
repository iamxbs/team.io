<template>
    <div>
        <Modal v-model="visible" ok-text="分配" title="负责人任务分配" @on-ok="onSavePlanCase" @on-cancel="onCancel" width="750">
            <Row>
                <Col span="12" style="border-right: 1px solid #eee">
                <div style="padding-right:30px;padding-left:20px;padding-top: 16px">
                    <Form :model="formItem" :label-width="100">
                        <FormItem label="系统">
                            <Select v-model="formItem.system" placeholder="请选择">
                                <Option v-for="item in systems" :key="item" :value="item">{{item}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="用户组">
                            <Select v-model="formItem.module" placeholder="请选择">
                                <Option v-for="item in modules" :key="item" :value="item">{{item}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="负责人">
                            <Select v-model="formItem.order" placeholder="请选择" @on-change="selectMan">
                                <Option v-for="item in orders" :key="item.value" :value="item.value">{{item.label}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>
                </Col>
                <Col span="12">
                <div style="padding-top: 16px">
                    <Form :model="formItem" :label-width="100">
                        <FormItem label="备注:">
                            <p>选择系统后会加载对应系统的用户分组。</p>
                            <p>用户分组旗下有对应的各个模块。</p>
                            <p>模块下对应的各阶段开发人员。</p>
                        </FormItem>
                    </Form>
                </div>
                </Col>
            </Row>
            <Row style="margin-top:10px;border:1px solid #eee" v-if="planStatus">
                <userPlan :dataSource="planData"></userPlan>
            </Row>
        </Modal>
    </div>
</template>
<script>
  import userPlan from "views/home/components/userPlan.vue";
  export default {
    props: {
      mainFlag: Boolean
    },
    components: {
      userPlan
    },
    data(){
      return {
        visible: false,
        formItem: {
          system: "",
          module: "",
          order: ""
        },
        systems: ["核心系统", "移动展业", "银改增"],
        modules: ["分析", "开发", "DAT测试", "UAT测试", "预生产", "生产"],
        orders: [
          {
            value: '1',
            label: '黄彦娇'
          },
          {
            value: '2',
            label: '丁健'
          },
          {
            value: '3',
            label: '张三'
          }
        ],
        planData:[],
        planStatus:false
      }
    },
    methods: {
      onSavePlanCase(){
        this.visible = false;
        this.planStatus = false;
        this.$emit("onChangeStatus")
      },
      onCancel(){
        this.visible = false;
        this.planStatus = false;
        this.$emit("onChangeStatus")
      },
      selectMan(){
        this.planStatus = true;
        this.planData = [
          {
            id: 1,
            name: '张三',
            modules: '开发',
            task: '个险渠道新增产品（寿延年年养老年金保险）',
            text: '需求开发',
            startDate: new Date(2017, 8, 18),
            endDate: new Date(2017, 9, 25)
          },
          {
            id: 2,
            name: '张三',
            modules: '开发',
            task: '增加个险佣金预算科目',
            text: '需求开发',
            startDate: new Date(2017, 9, 29),
            endDate: new Date(2017, 10, 9)
          },
          {
            id: 2,
            name: '张三',
            modules: '开发',
            task: '关于开发银联批量代付功能',
            text: '需求分析',
            startDate: new Date(2017, 10, 11),
            endDate: new Date(2017, 10, 12)
          }
        ];
      }
    },
    watch: {
      mainFlag(){
        if (this.mainFlag) {
          this.planStatus = false;
          this.visible = true;
          this.planData = null;
        } else {
          this.formItem = {
            system: "",
            module: "",
            order: ""
          };
        }
      }
    },
    mounted(){

    }
  }
</script>