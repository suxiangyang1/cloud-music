<template>
  <div class="bg">
    <mu-container>
      <mu-form
        ref="form"
        :model="validateForm"
        class="login-form"
      >
        <mu-form-item
          label="用户名"
          prop="username"
          :rules="usernameRules"
        >
          <mu-text-field
            v-model="validateForm.username"
            prop="username"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          label="密码"
          prop="password"
          :rules="passwordRules"
        >
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          prop="isAgree"
          :rules="argeeRules"
        >
          <mu-checkbox
            label="同意用户协议"
            v-model="validateForm.isAgree"
          ></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-text-field v-model="verifyCode"></mu-text-field>
          <img
            class="verify"
            @click.prevent="refresh"
            ref="codeImg"
          />
        </mu-form-item>
        <mu-form-item>
          <mu-button
            color="primary"
            @click="submit"
          >提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
    <!--遮罩层-->
    <div
      class="mask"
      v-if="show"
    >
      <div class="dialog">
        <h3>请选择要进入系统的角色</h3>
        <div class="btn-wrapper">
          <mu-button
            v-for="(role, index) in roles"
            :key="index"
            color="primary"
            class="btn"
            @click="gotoIndex(role.roleId)"
          >
            {{ role.roleName }}
          </mu-button>
        </div>
      </div>
    </div>
    <div>
      <button @click="login()">登录第三方</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      },
      verifyCode: '',
      menuList: [],
      show: false,
      roles: []
    }
  },
  components: {},
  created() {
    //调用验证码接口,不使用 responseType: 'blob',会乱码，而且下面需要将流转为图片
    this.axios.get(this.GLOBAL.baseUrl + '/captcha?name=' + this.validateForm.username, { responseType: 'blob' }).then((res) => {
      console.log(res.headers)
      console.log(res)
      //获得当前对象，便于后面，赋值给src
      let img = this.$refs.codeImg
      //用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象，本例创建的是Blob对象
      let url = window.URL.createObjectURL(res.data)
      img.src = url
    })
  },
  mounted() {},
  methods: {
    submit() {
      //验证表单是否通过
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        //请求登录接口,验证账号，密码，验证码
        this.axios({
          method: 'post',
          url: this.GLOBAL.baseUrl + '/sysAdmin/login',
          data: {
            name: this.validateForm.username,
            password: this.validateForm.password,
            verifyCode: this.verifyCode
          }
        }).then((res) => {
          console.log(res)
          //“1”代表的就是成功
          if (res.data.code === 1) {
            //将token存入localStorage中(本地存储)
            localStorage.setItem('token', res.data.data.token)
            //传参，可以为值，大部分为对象
            this.$store.commit('setToken', res.data.data.token)
            localStorage.setItem('id', res.data.data.admin.id)
            this.$store.commit('setId', res.data.data.admin.id)
            let admin = {
              id: res.data.data.admin.id,
              name: res.data.data.admin.name,
              role: res.data.data.admin.roles, //有两个角色，暂时先用第一个
              avatar: res.data.data.admin.avatar
            }
            //存admin信息
            localStorage.setItem('admin', JSON.stringify(admin))
            console.log(localStorage.getItem('admin').id)
            this.$store.commit('setAdmin', JSON.stringify(admin))
            this.roles = res.data.data.admin.roles
            //角色数量超过一
            if (this.roles.length > 1) {
              alert('登录成功，你的角色不止一个，请选择')
              //弹出遮罩层,点击跳到对应表单
              this.show = true
            } else {
              //只有一个角色
              const roleId = res.data.data.admin.roles[0].roleId
              localStorage.setItem('roleId', roleId)
              this.$store.commit('setRoleId', roleId)
              alert(roleId)
              this.$router.push({
                path: '/',
                query: {
                  roleId: roleId
                }
              })
            }
          } else {
            alert(res.data.msg)
            //登录失败，清空验证码文本框
            this.verifyCode = ''
          }
        })
      })
    },
    //点击验证码,进行刷新
    refresh() {
      this.axios.get(this.GLOBAL.baseUrl + '/captcha?name=' + this.validateForm.username, { responseType: 'blob' }).then((res) => {
        let img = this.$refs.codeImg
        let url = window.URL.createObjectURL(res.data)
        img.src = url
      })
    },
    //重重
    clear() {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      }
    },
    gotoIndex(roleId) {
      //带着用户选择的roleId跳到首页
      localStorage.setItem('roleId', roleId)
      this.$store.commit('setRoleId', roleId)
      alert(roleId)
      this.$router.push({
        path: '/',
        query: {
          roleId: roleId
        }
      })
    },

    login() {
      alert('click')
      const authorize_uri = 'https://github.com/login/oauth/authorize'
      const client_id = 'ac26ab0dbf150f0f8df3'
      const redirect_uri = 'http://localhost:8088/login/oauth2/code/github'
      window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.bg {
  background-image: url('../../assets/images/girls.jpg');
  opacity: 0.8;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  max-width: 500px;
  margin-left: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.mask {
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    z-index: 1000;
    width: 400px;
    height: 300px;
    line-height: 100px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    padding-top: 50px;
    .btn-wrapper {
      margin-left: 60px;
      display: flex;
      .btn {
        margin: 20px;
      }
    }
  }
}
</style>
