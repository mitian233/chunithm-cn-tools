<template>
  <v-card>
  <v-card-title>歌曲列表</v-card-title>
  <v-card-subtitle>数据来源：diving fish api</v-card-subtitle>
  <v-container>
    <v-spacer />
    <v-container class="pa-0">
      <p>查找范围</p>
      <v-btn @click="searchFieldList = undefined" variant="tonal">
        清除筛选器
      </v-btn>
      <v-btn-toggle v-model="searchFieldList" multiple>
        <v-btn value="_id">乐曲ID</v-btn>
        <v-btn value="title">名称</v-btn>
        <v-btn value="charter">谱面作者</v-btn>
        <v-btn value="genre">流派</v-btn>
        <v-btn value="from">版本</v-btn>
      </v-btn-toggle>
    </v-container>
    <!--<v-checkbox label="使用高级设置" v-model="ProSettingChuni" class="mr-4" @click="$refs.proSettingsChuni.reset()" />-->
    <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找乐曲" single-line hide-details class="mb-4"/>
    <!--<pro-settings-chuni v-show="ProSettingChuni" ref="proSettingsChuni" :music_data="chuni_data" :music_data_dict="chuni_data_dict" />-->
    <chuni-table :filterList="searchFieldList" :search="searchKey" :items="store.chuniRecordDisplay" :music_data_dict="store.chuni_data_dict" :loading="store.isLoading"/>
  </v-container>
</v-card>
</template>

<script>
import {markRaw,toRaw} from "vue"
import axios from "axios"
import ProSettingsChuni from "../components/proSettingsChuni.vue"
import chuniTable from "../components/chuniTable.vue";
import { useMusicDataStore } from "../store";
const store = useMusicDataStore();
export default {
  name: "songsList",
  components: {
    ProSettingsChuni,
    chuniTable
  },
  data: () => {
    return {
      ProSettingChuni: false,
      searchKey: "",
      store: store,
      searchFieldList: ["title"],
    }
  },
  methods: {
    setHeaders: function (headers) {
      this.headers = headers
    },
  },
  computed: {
  },
  watch: {
    searchKey: function (val) {
      this.$router.push({query: {searchFieldList: this.searchFieldList,search: val}})
    },
    searchFieldList: function (val) {
      this.$router.push({query: {search: this.searchKey,searchFieldList: val}})
    },
  },
  mounted: function () {
    history.replaceState("", "", window.location.pathname)
    store.fetchChuniData()
    this.searchKey = this.$route.query.search
    this.searchFieldList = this.$route.query.searchFieldList
  },
}
</script>

<style scoped>

</style>
