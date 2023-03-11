<template>
  <v-card>
    <v-card-title>称号列表</v-card-title>
    <v-card-subtitle>数据来源：<a href="https://space.bilibili.com/32772298/article" >losffa</a></v-card-subtitle>
    <v-container>
      <v-spacer />
      <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
      <title-table :search="searchKey" :title-list="listItem" :loading="isLoading"/>
    </v-container>
  </v-card>
</template>

<script>
//import titleList from "../assets/titleList.js";
import titleTable from "../components/titleTable.vue";
import axios from "axios";
import {markRaw} from "vue";
export default {
  components: {
    titleTable,
  },
  data: () =>{
    return {
      searchKey: "",
      titleList: [],
      listItem: [],
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
        this.listItem.push({
          id: idNumber,
          title: this.titleList.music[j].title,
          color: this.titleList.music[j].color,
          obtain: this.titleList.music[j].obtain,
          type: "乐曲称号",
        })
        idNumber++
      }
      for (let i = 0; i < this.titleList.nonmusic.length; i++) {
        this.listItem.push({
          id: idNumber,
          title: this.titleList.nonmusic[i].title,
          color: this.titleList.nonmusic[i].color,
          obtain: this.titleList.nonmusic[i].obtain,
          type: "非乐曲称号",
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