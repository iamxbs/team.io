<template>
    <div>
        <Row>
            <Col span="24">
                <Form :model="formItem" :label-width="100" style="padding-right:30px;padding-top: 16px">
                    <Row>
                        <Col span="6">
                            <FormItem label="录入时间">
                                <DatePicker style="width: 100%" type="date" :transfer="true" placeholder="选择日期" v-model="formItem.date1"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="工作内容">
                                <Input v-model="formItem.input" placeholder="请输入"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="工作时长">
                                <Select v-model="formItem.select" placeholder="请选择" :transfer="true">
                                    <Option v-for="i in 12" :value="i" :key="i">{{i}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="3">
                        <FormItem label="完成状态">
                            <i-switch v-model="formItem.switch" size="large">
                                <span slot="open">完成</span>
                                <span slot="close">进行</span>
                            </i-switch>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
  export default {
    props:{
      row:Object
    },
    data(){
      return {
        formItem: {
          input: '',
          select: '',
          switch: false,
          checkbox: [],
          date: '',
          time: '',
          date1:new Date()
        },
        options: [
          {
            value: '1',
            label: '黄新宇'
          },
          {
            value: '2',
            label: '黄家浩'
          },
          {
            value: '3',
            label: '丁健'
          }
        ]
      }
    },
    methods: {
      filter(row){
        let steps = ["分析","开发","测试"];
        return steps[row.level]
      }
    },
    mounted(){

    }
  }
</script>