<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="8">
            <Row>
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatorPath"/>
                        </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <div>
                                <b class="card-user-infor-name">{{userName}}</b>
                                <p>{{user}}</p>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录时间:</p></Col>
                        <Col span="16" class="padding-left-8">
                        2017.10.24-13:32:20</Col>
                    </Row>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录地点:</p></Col>
                        <Col span="16" class="padding-left-8">
                        无锡</Col>
                    </Row>
                </Card>
            </Row>
            <Row class="margin-top-10">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-checkbox-outline"></Icon>
                        今日天气
                    </p>
                    <div>
                        <Row class="margin-top-8">
                            <Col span="8">
                            <p class="notwrap">当前气温:</p></Col>
                            <Col span="16" class="padding-left-8">
                            {{$store.state.app.todayWeather?$store.state.app.todayWeather.temperature:"信息加载中..."}}
                            </Col>
                        </Row>
                        <Row class="margin-top-8">
                            <Col span="8">
                            <p class="notwrap">温馨提示:</p></Col>
                            <Col span="14" class="padding-left-8">
                            {{$store.state.app.todayWeather?$store.state.app.todayWeather.dressing_advice:"信息加载中..."}}
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Row>
            <Row class="margin-top-10">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-checkbox-outline"></Icon>
                        近期天气
                    </p>
                    <div>
                        <temperature-data-table :weatherData="weatherData"></temperature-data-table>
                    </div>
                </Card>
            </Row>
            </Col>
            <Col span="16" class-name="padding-left-5">
            <Row>
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        个人工作日历
                    </p>
                    <div>
                        <user-plan :dataSource="planData"></user-plan>
                    </div>
                </Card>
            </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import cityData from './map-data/get-city-value.js';
  import countUp from './components/countUp.vue';
  import infoCard from './components/inforCard.vue';
  import temperatureDataTable from './components/temperatureDataTable.vue';
  import newsListItem from './components/newsListItem.vue'
  import userPlan from './components/userPlan.vue';
  import planData from './planData/planData';
  export default {
    components: {
      countUp,
      infoCard,
      temperatureDataTable,
      newsListItem,
      userPlan
    },
    data () {
      return {
        user:Cookies.get("user"),
        userName:Cookies.get("realName"),
        planData:planData,
        loading:false,
        searchItem: "国联人寿",
        newsLists: [],
        weatherData: [],
        count: {
          createUser: 496,
          visit: 3264,
          collection: 24389305,
          transfer: 39503498
        },
        cityData: cityData,
        showAddNewTodo: false,
        newToDoItemValue: ''
      };
    },
    computed: {
      avatorPath () {
        return localStorage.avatorImgPath;
      }
    },
    methods: {
      onSaveRecords(){
        $.ajax({
          type: 'GET',
          url: 'http://v.juhe.cn/weather/index?cityname=%E6%97%A0%E9%94%A1&dtype=&format=&key=a6c1368de59d942c60375429e73af739',
          dataType: 'JSONP',
          success: (basic) => {
            let obj = basic.result.future;
            let keys = Object.keys(obj);
            let ary = [];
            for (let i = 0; i < keys.length; i++) {
              ary.push({
                name: obj[keys[i]].city,
                temperature: obj[keys[i]].temperature,
                weather: obj[keys[i]].weather,
                week: obj[keys[i]].week
              });
            }
            this.$store.commit('getTodayWeather',basic.result.today);
            this.weatherData = ary;
          }
        });
      },
      onGetGLNewS(keyword){
        this.loading = true;
        $.ajax({
          url: 'http://jisunews.market.alicloudapi.com/news/search',
          dataType: "json",
          headers: {
            "Authorization": "APPCODE 5905558f81914e58bf9c77e4f9e0ab73"
          },
          data: {
            keyword: keyword
          },
          success: (data) => {
            this.loading = false;
            this.newsLists = data.result.list
          }
        })
      },
      openNewsDetail (item) {
        window.open(item.url)
      }
    },
    mounted(){
      this.onSaveRecords();
//      this.onGetGLNewS(this.searchItem)
    }
  };
</script>
<style lang="less">
    #newsContent {
        img {
            text-align: center;
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .calendar-header{
        display: none!important;
    }
</style>
