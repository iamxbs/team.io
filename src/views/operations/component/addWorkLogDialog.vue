<template>
    <div>
        <Modal v-model="visible" title="添加工作记录" @on-ok="onSavePlanCase" @on-cancel="onCancel">
            <div>
                <Form :model="formItem" :label-width="100" style="padding-right:30px;padding-top: 16px">
                    <FormItem label="工作内容">
                        <Input v-model="formItem.input" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="工作时长">
                        <Select v-model="formItem.select" placeholder="请选择">
                            <Option v-for="i in 12" :value="i" :key="i">{{i}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="完成状态">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="no">未完成</Radio>
                            <Radio label="ok">已完成</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="完成时间" v-if="formItem.radio === 'ok'">
                        <DatePicker type="date" placeholder="选择日期" v-model="formItem.date1"></DatePicker>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
  export default {
    props: {
      flag: Boolean
    },
    data(){
      return {
        visible: false,
        formItem: {
          input: '',
          select: '',
          radio: 'no',
          checkbox: [],
          switch: false,
          date: '',
          time: '',
          textarea: '',
          date1:""
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
      onSavePlanCase(){
        this.visible = false
      },
      onCancel(){
        this.visible = false
      }
    },
    watch: {
      flag(){
        this.visible = true;
        this.$emit("onChangeStatus")
      }
    },
    mounted(){

    }
  }
</script>