<template>
  <v-container>
    <v-card max-width="375" class="mx-auto">
      <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px" dark>
        <v-row class="fill-height">
          <v-card-title>
            <v-btn dark icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn dark icon class="mr-4" @click="click()" style="position:relative;">
              <v-icon>mdi-pencil</v-icon>
              <div v-if="show" style="position:absolute;">
                <div>
                  <input placeholder="用户名" v-model="validateForm.username" />
                  <input placeholder="密码" v-model="validateForm.password" />
                </div>
                <label for="" @click="submit()" class="boxColor">提交</label>
              </div>
            </v-btn>

            <v-btn dark icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>

          <v-spacer></v-spacer>

          <v-card-title class="white--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12">{{ myName }}</div>
          </v-card-title>
        </v-row>
      </v-img>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-email</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>16422802@qq.com</v-list-item-title>
            <v-list-item-subtitle>Mail</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-map-marker</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>NIIT SCS</v-list-item-title>
            <v-list-item-subtitle>Nanjing,Jiangsu</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      show: false,
      myName: this.$store.state.admin.name,
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    click() {
      this.show = true
      console.log(this.$store.state.token)
    },
    submit() {
      this.axios({
        method: 'put',
        url: this.GLOBAL.baseUrl + '/sysAdmin/update?id=' + this.$store.state.id + '&name=' + this.validateForm.username + '&password=' + this.validateForm.password,
        headers: {
          id: this.$store.state.id,
          Authorization: this.$store.state.token
        }
      }).then((res) => {
        console.log(res)
        this.show = false
        let admin = {
          id: this.$store.state.id,
          name: this.validateForm.username,
          role: this.$store.state.admin.role, //有两个角色，暂时先用第一个
          avatar: this.$store.state.admin.avatar
        }
        localStorage.setItem('admin', JSON.stringify(admin))
        this.$store.commit('setAdmin', JSON.stringify(admin))
      })
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
.repeating-gradient {
  background-image: repeating-linear-gradient(-45deg, rgba(255, 0, 0, 0.25), rgba(255, 0, 0, 0.25) 5px, rgba(0, 0, 255, 0.25) 5px, rgba(0, 0, 255, 0.25) 10px);
}
.boxColor {
  color: #3db8b8;
  font-size: 24px;
}
</style>
