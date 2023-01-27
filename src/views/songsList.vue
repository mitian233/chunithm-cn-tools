<template>
  <v-card>
  <v-card-title>歌曲列表</v-card-title>
  <v-card-subtitle>数据来源：diving fish api</v-card-subtitle>
  <v-container>
    <v-spacer />
    <!--<v-checkbox label="使用高级设置" v-model="ProSettingChuni" class="mr-4" @click="$refs.proSettingsChuni.reset()" />-->
    <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找乐曲" single-line hide-details class="mb-4"/>
    <!--<pro-settings-chuni v-show="ProSettingChuni" ref="proSettingsChuni" :music_data="chuni_data" :music_data_dict="chuni_data_dict" />-->
    <v-card-text>
      <chuni-table :search="searchKey" :items="chuniRecordDisplay" :music_data_dict="chuni_data_dict"/>
    </v-card-text>
  </v-container>
</v-card>
</template>

<script>
import {markRaw,toRaw} from "vue"
import axios from "axios"
import ProSettingsChuni from "../components/proSettingsChuni.vue"
import chuniTable from "../components/chuniTable.vue";
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
      chuni_obj: {},
      chuni_data: [],
      chuni_data_dict: {},
      chuni_records: [],
    }
  },
  methods: {
    fetchMusicData: await function () {
      const that = this;
      axios.get("https://www.diving-fish.com/api/chunithmprober/music_data")
          .then((resp) => {
            that.chuni_data = markRaw(resp.data);
            that.chuni_data_dict = that.chuni_data.reduce((acc, music) => {
              acc[music.id] = music;
              return acc;
            }, {});
            that.setDefaultRecords()
          })
    },
    setHeaders: function (headers) {
      this.headers = headers;
    },
    setDefaultRecords: function () {
      const currentCids = this.chuni_records.map(elem => {return elem.cid});
      let rank = currentCids.length + 1;
      for (const m of this.chuni_data) {
        for (let i = 0; i < m.ds.length; i++) {
          if (currentCids.indexOf(m.cids[i]) != -1) continue;
          if (m.level[i] === "-") continue;
          this.chuni_records.push(
              {
                "id": this.chuni_data_dict[m.id].id,
                "rank": rank,
                "ds": m.ds[i],
                "title": m.title,
                "level": m.level[i],
                "mid": m.id,
                "cid": m.cid,
                "level_index": i,
                "level_label": ["Basic", "Advanced", "Expert", "Master", "Ultima", "World's End"][i]+" "+m.level[i],
                "from": this.chuni_data_dict[m.id].basic_info.from ,
                "genre": this.chuni_data_dict[m.id].basic_info.genre,
                "charter": this.chuni_data_dict[m.id].charts[i].charter,
                "combo": this.chuni_data_dict[m.id].charts[i].combo,
              }
          )
          rank++;
        }
      }
    }
  },
  computed: {
    chuniRecordDisplay: function() {
      const that = this;
      return this.chuni_records//.filter((elem) => {
        //return (
            //that.$refs.filterSliderChuni.f(elem) &&
            //(!that.ProSettingChuni || that.$refs.proSettingsChuni.f(elem)))
      //});
    },
  },
  created: function () {
    history.replaceState("", "", window.location.pathname);
    this.fetchMusicData();
  }
}
</script>

<style scoped>

</style>