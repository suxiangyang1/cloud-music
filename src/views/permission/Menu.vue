<template>
  <v-container>
    <h3>菜单管理</h3>
    <span
      v-for="(item, index) in menus"
      :key="index"
      class="gutter"
    >
      <!-- <mu-button color="teal" v-if="item === 'menu:add'">添加菜单</mu-button>
      <mu-button color="success" v-if="item === 'menu:edit'">编辑菜单</mu-button>
      <mu-button color="error" v-if="item === 'menu:delete'">删除菜单</mu-button> -->
      <mu-button :color="item.icon">{{item.title}}</mu-button>
    </span>
  </v-container>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menus: []
    }
  },
  components: {},
  created() {
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
