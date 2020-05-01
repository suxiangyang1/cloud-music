<template>
  <div style="width:1100px;">
    <div
      class="upadte-card cc-donghua"
      v-if="updateistrue"
    >
      <Input
        v-model="nameInput"
        placeholder="修改歌单名"
        clearable
        class="position"
        size="large"
      />
      <Input
        v-model="thumbnailInput"
        placeholder="修改封面"
        clearable
        class="position"
        size="large"
      />
      <Input
        v-model="typeInput"
        placeholder="修改歌单类型"
        clearable
        class="position"
        size="large"
      />

      <md-button
        class="md-raised md-primary"
        style="width:400px;margin-left:50px"
        @click="update()"
      >确认修改</md-button>
    </div>
    <md-table
      v-model="musics"
      md-card
      @md-selected="onSelect"
    >
      <md-table-toolbar>
        <div class="cc-df">
          <div
            v-for="(item, index) in menus"
            :key="index"
          >
            <div class="cc-mleft row">
              <Button
                :type="item.icon"
                @click="gongneng(item.id)"
                class="btn-size"
              >{{ item.title }}</Button>
            </div>
          </div>
          <Input
            search
            enter-button="Search"
            v-model="data"
            placeholder="Enter something..."
            style="margin-left:100px;width:500px;"
          />
        </div>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell
          md-label="歌单名"
          md-sort-by="songListName"
          class="cdc"
        >{{ item.songListName }}</md-table-cell>
        <md-table-cell
          md-label="类型"
          md-sort-by="type"
        >{{ item.type }}</md-table-cell>
        <md-table-cell
          md-label="歌曲数"
          md-sort-by="songCount"
        >{{ item.songCount }}</md-table-cell>
        <md-table-cell
          md-label="收藏数"
          md-sort-by="likeCount"
        >{{ item.likeCount }}</md-table-cell>
        <md-table-cell
          md-label="评论数"
          md-sort-by="commentCount"
        >{{ item.commentCount }}</md-table-cell>
        <md-table-cell
          md-label="播放量"
          md-sort-by="playCounts"
        >{{ item.playCounts }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div
      class="cc-df cc-mtop"
      @click="selectMusic()"
    >
      <Page
        :current.sync="page"
        :total="3000"
        simple
        style="margin-left:500px;margin-top:20px;"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMusic',
  data() {
    return {
      selected: [],
      items: [],
      menus: [],
      ids: [],
      authority: null,
      musics: [],
      updateistrue: false,
      nameInput: '',
      thumbnailInput: '',
      typeInput: '',
      page: 1,
      id: '',
      data: null
    }
  },
  components: {},
  created() {
    this.selectMusic()
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
    this.authority = JSON.parse(localStorage.getItem('roleId')[0])
    console.log(this.menus)
  },
  mounted() {},
  methods: {
    update() {
      console.log('1' + this.id)
      console.log('2' + this.nameInput)
      console.log('3' + this.thumbnailInput)
      console.log('4' + this.typeInput)
      this.updateistrue = false
      this.axios({
        method: 'put',
        url: this.GLOBAL.baseUrl + 'songList/update?roleId=' + this.authority,
        data: {
          songListId: this.id,
          songListName: this.nameInput,
          thumbnail: this.thumbnailInput,
          type: this.typeInput
        },
        headers: { Authorization: localStorage.getItem('token') }
      })
        .then((res) => {
          console.log(res)
          this.selectMusic()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    gongneng(btnId) {
      if (btnId == 14) {
        this.axios({
          method: 'delete',
          url: 'http://localhost:8080' + '/songList/batchDelete?roleId=' + this.authority + '&ids=' + this.ids,
          headers: { Authorization: localStorage.getItem('token') }
        })
          .then((res) => {
            console.log(res)
            this.selectMusic()
          })
          .catch(function(error) {
            console.log(error)
          })
      }
      if (btnId == 19) {
        this.updateistrue = true
      }
      if (btnId == 12) {
        console.log(this.authority)
        console.log(this.data)
        this.axios({
          methods: 'get',
          url: this.GLOBAL.baseUrl + '/songList/blur?roleId=' + this.authority + '&field=' + this.data,
          headers: { Authorization: localStorage.getItem('token') }
        }).then((res) => {
          console.log(res.data.data)
          this.musics = res.data.data
          for (let i = 0; i < this.musics.length; i++) {
            this.musics = this.musics.filter(this.musics[i].type != 0)
          }
        })
      }
    },
    onSelect(items) {
      this.selected = items
      console.log(items)
      if (this.selected.length == 1) {
        this.id = this.selected[0].songListId
      }
      for (let i = 0; i < this.selected.length; i++) {
        this.ids[i] = this.selected[i].songListId
      }
    },
    getAlternateLabel(count) {
      let plural = ''
      if (count > 1) {
        plural = 's'
      }
      return `${count} user${plural} selected`
    },
    selectMusic() {
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseUrl + '/songList/page?roleId=' + this.authority,
        data: {
          currentPage: this.page,
          pageSize: 12
        },
        headers: { Authorization: localStorage.getItem('token') }
      })
        .then((res) => {
          console.log(res)
          this.musics = res.data.data
          console.log(this.musics)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.md-table + .md-table {
  margin-top: 16px;
}
.btn-size {
  height: 30px;
  margin-top: 0px;
  margin-left: 30px;
}
.upadte-card {
  position: absolute;
  top: 150px;
  left: 630px;
  width: 500px;
  height: 300px;
  background-color: rgb(185, 203, 213);
  z-index: 10000;
}
.position {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 400px;
  margin-left: 50px;
}
</style>
