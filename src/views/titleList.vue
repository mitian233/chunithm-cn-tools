<template>
  <v-card>
    <v-card-title>称号列表</v-card-title>
    <v-card-subtitle>数据来源：<a href="https://space.bilibili.com/32772298/article" >losffa</a></v-card-subtitle>
    <v-container>
      <v-tabs
          v-model="listTab"
      >
        <v-tab value="music">
          乐曲称号
        </v-tab>
        <v-tab value="nonmusic">
          非乐曲称号
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-card-text>
        <v-window v-model="listTab">
          <v-window-item value="music">
            <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
            <title-table :search="searchKey" :title-list="listItemMusic" :loading="isLoading"/>
          </v-window-item>
          <v-window-item value="nonmusic">
            <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
            <title-table :search="searchKey" :title-list="listItemNonMusic" :loading="isLoading"/>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import titleTable from "../components/titleTable.vue";
import axios from "axios";
import {markRaw} from "vue";
export default {
  components: {
    titleTable,
  },
  data: () =>{
    return {
      listTab: "music",
      searchKey: "",
      titleList: [],
      listItemMusic: [],
      listItemNonMusic: [],
      isLoading: true,
    }
  },
  methods: {
    fetchTitleData: await function () {
      const that = this
      axios.get("https://api-mfl.bangdream.moe/chuni/titlelistraw.json").then((resp) => {
        //that.listItem = markRaw(resp.data)
        that.titleList = resp.data
        that.creatList()
      })
      this.isLoading = false
    },
    creatList: function () {
      let idNumber = 1;
      for (let j = 0; j < this.titleList.music.length; j++) {
        this.listItemMusic.push({
          id: idNumber,
          title: this.titleList.music[j].title,
          color: this.titleList.music[j].color,
          obtain: this.titleList.music[j].obtain,
        })
        idNumber++
      }
      for (let i = 0; i < this.titleList.nonmusic.length; i++) {
        this.listItemNonMusic.push({
          id: idNumber,
          title: this.titleList.nonmusic[i].title,
          color: this.titleList.nonmusic[i].color,
          obtain: this.titleList.nonmusic[i].obtain,
        })
        idNumber++
      }
    }
  },
  created() {
    this.fetchTitleData()
  },
  name: "titleList"
}
</script>

<style scoped>

</style>