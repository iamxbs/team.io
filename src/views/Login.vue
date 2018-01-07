<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="loginTitle">
            <h1 style="font-size: 40px">软件协同管理平台</h1>
            <h3 style="margin-left:130px;margin-top:20px;font-weight: normal;color:#666">———快捷、高效</h3>
        </div>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input v-model="form.password" type="password">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        form: {
          userName: 'iamxbs',
          password: '',
          name: ""
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            Cookies.set('user', this.form.userName);
            Cookies.set('password', this.form.password);
            this.$store.commit('setAvator', 'http://img0.imgtn.bdimg.com/it/u=277397705,3100574613&fm=214&gp=0.jpg');
            if (this.form.userName === 'admin') {
              Cookies.set('realName', "系统管理员");
              Cookies.set('access', 0);
            } else if(this.form.userName === 'iamxbs') {
              Cookies.set('access', 2);
              Cookies.set('realName', "徐斌松");
            }else{
              Cookies.set('access', 1);
              Cookies.set('realName', "游客");
            }
            this.$router.push({
              name: 'home_index'
            });
          }
        });
      }
    }
  };
</script>
