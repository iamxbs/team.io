<template>
    <div>
        <Row>
            <Col span="24">
            <div class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-analytics"></Icon>
                        {{currentInfo.name}}
                        <span style="margin-top:-5px;float: right;">
                            <Button icon="close" type="text" @click="closePage"></Button>
                        </span>
                    </p>
                    <div>
                        <Collapse v-model="collapseValue">
                            <Panel :name="index.toString()" v-for="(info,index) in stepCols" :key="index">
                                {{info.date}}
                                <div slot="content">
                                    <div class="tabPage-text">
                                        <span class="tabPage-label">工作内容</span>
                                        <span class="tabPage-span"></span>
                                        <span class="tabPage-content">{{info.content}}</span>
                                    </div>
                                    <div class="tabPage-text">
                                        <span class="tabPage-label">工作时长</span>
                                        <span class="tabPage-span"></span>
                                        <span class="tabPage-content">{{info.hours}}
                                    <span>小时</span></span>
                                    </div>
                                    <!--<div class="tabPage-text">-->
                                        <!--<span class="tabPage-label">阶段状态</span>-->
                                        <!--<span class="tabPage-span"></span>-->
                                        <!--<span v-if="info.status">-->
                                                    <!--<Tag color="green">已完成</Tag>-->
                                                <!--</span>-->
                                        <!--<span v-if="!info.status">-->
                                                    <!--<Tag color="yellow">未完成</Tag>-->
                                                <!--</span>-->
                                    <!--</div>-->
                                    <div class="tabPage-text">
                                        <span class="tabPage-label">相关备注</span>
                                        <span class="tabPage-span"></span>
                                        <span class="tabPage-content">{{info.note}}</span>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        collapseValue:[],
        stepCols:[],
        currentInfo:{}
      }
    },
    methods: {
      closePage(){
        this.$router.push({
          name: "workRecords"
        });
      }
    },
    mounted(){
      this.$Spin.show();
      if(this.$route.params.id){
        setTimeout(() => {
          this.$Spin.hide();
          this.currentInfo = this.$route.params;
          this.stepCols = [
            {
              date: "2017年09月27日",
              content: "需求文档与客户进行初步审核探讨",
              hours: 8,
              status: true,
              note: "数据分析是指用适当的统计分析方法对收集来的大量数据进行分析,提取有用信息和形成结论而对数据加以详细研究和概括总结的过程。"
            },
            {
              date: "2017年09月26日",
              content: "需求分析文档编写中",
              hours: 8,
              status: false,
              note: "分析就是将研究对象的整体分为各个部分，并分别加以考察的认识活动。分析的意义在于通过认识事物或现象的区别与联系，细致地寻找能够解决问题的主线，并以此解决问题。"
            },
            {
              date: "2017年09月25日",
              content: "与客户进行功能点分析",
              hours: 6,
              status: false,
              note: "分析能力是指把一件事情、一种现象、一个概念分成较简单的组成部分，找出这些部分的本质属性和彼此之间的关系单独进行剖析、分辨、观察和研究的一种能力"
            },
            {
              date: "2017年09月22日",
              content: "需求分析文档编写中",
              hours: 8,
              status: false,
              note: "分析就是将研究对象的整体分为各个部分，并分别加以考察的认识活动。分析的意义在于通过认识事物或现象的区别与联系，细致地寻找能够解决问题的主线，并以此解决问题。"
            },
            {
              date: "2017年09月21日",
              content: "与客户进行功能点分析",
              hours: 6,
              status: false,
              note: "分析能力是指把一件事情、一种现象、一个概念分成较简单的组成部分，找出这些部分的本质属性和彼此之间的关系单独进行剖析、分辨、观察和研究的一种能力"
            },
            {
              date: "2017年09月20日",
              content: "需求分析文档编写中",
              hours: 8,
              status: false,
              note: "分析就是将研究对象的整体分为各个部分，并分别加以考察的认识活动。分析的意义在于通过认识事物或现象的区别与联系，细致地寻找能够解决问题的主线，并以此解决问题。"
            },
            {
              date: "2017年09月19日",
              content: "与客户进行功能点分析",
              hours: 6,
              status: false,
              note: "分析能力是指把一件事情、一种现象、一个概念分成较简单的组成部分，找出这些部分的本质属性和彼此之间的关系单独进行剖析、分辨、观察和研究的一种能力"
            }
          ];
          setTimeout(()=>{
            for(let i=0;i<this.stepCols.length;i++){
              this.collapseValue.push(i)
            }
          },200);
        }, 1000);
      }else{
        this.$Spin.hide();
        this.$router.push({
          name: "workRecords"
        });
      }
    }
  }
</script>
<style lang="less">
    @import "manHours.less";
    @import '../../styles/common.less';
</style>