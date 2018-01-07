<style lang="less">
    @import './styles/to-do-list-item.less';
</style>

<template>
    <div>
        <Row class="to-do-list-item">
            <Col span="8">
            <Row type="flex" justify="start" align="middle" class="height-100">
                <p class="to-do-list-item-text">
                    <a style="color:#495060" id="newsList" href="javascript:void(0)" @click="openNewsDetail">{{ item.title }}</a>
                </p>
            </Row>
            </Col>
            <Col span="10" style="text-align: right">
            <Row>
                <span style="color:#ccc">更新时间:</span>
                <span style="color:#ccc">{{ item.time }}</span>
            </Row>
            </Col>
            <Col offset="2" span="4" style="text-align:left">
            <Row>
                <span style="color:#ccc">出处:</span>
                <span style="color:#ccc">{{ item.src }}</span>
            </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    name: 'newsListItem',
    data () {
      return {
      };
    },
    props: {
      item: Object
    },
    methods: {
      openNewsDetail () {
        this.$emit("openNewsDetail",this.item);
      }
    }
  };
</script>
<style lang="less">
    #newsList:hover{
        text-decoration:underline;
        color:#2b85e4!important;
    }
</style>