<template>
  <v-sheet style="display: box; margin: 0px 16px">
    <v-row dense>
      <v-col cols="4" class="px-0 py-0">
        <v-list-subheader>
          按难度筛选
          <v-icon @click="level_filter.length === level_filter_items.length ? (level_filter = []) : (level_filter = level_filter_items.map((i) => i.value))" class="ml-2">mdi-check-all</v-icon>
        </v-list-subheader>
      </v-col>
      <v-col cols="8" class="px-0 py-0">
        <v-item-group multiple v-model="level_filter" class="ml-2 py-2" show-arrows>
          <v-item v-for="(item,key) in level_filter_items" :key="key" :value="item.value" class="mr-2" v-slot="{ active, toggle }">
            <v-chip :color="getLevel(item.value)" :outlined="!active" dark @click="toggle">{{ item.text }}</v-chip>
          </v-item>
        </v-item-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
            v-model="version"
            :items="versions"
            label="版本"
            clearable
            hide-details
        />
      </v-col>
      <v-col cols="6">
        <v-select
            v-model="genre"
            :items="genres"
            label="歌曲类别"
            clearable
            hide-details
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  props: {
    music_data: Object,
    music_data_dict: Object,
  },
  data: ()=>{
    return {
      darkTheme: false,
      fc_filter: [],
      level_filter: [],
      rate_filter: [],
      version: null,
      genre: null,
      level_filter_items: [
        { text: "Basic", value: 0 },
        { text: "Advanced", value: 1 },
        { text: "Expert", value: 2 },
        { text: "Master", value: 3 },
        { text: "Ultima", value: 4 },
        { text: "World's End", value: 5},
      ],
      headers: [],
      headers_default: [
        { text: '排名', value: 'rank' },
        { text: '乐曲名', value: 'title' },
        { text: '难度', value: 'level' },
        { text: '定数', value: 'ds' },
        { text: '分数', value: 'score' },
        { text: 'Rating', value: 'ra' },
      ]
    }
  },
  computed: {
    versions: function () {
      return Array.from(
          new Set(
              this.music_data.map((elem) => {
                return elem.basic_info.from;
              })
          )
      );
    },
    genres: function () {
      return Array.from(
          new Set(
              this.music_data.map((elem) => {
                return elem.basic_info.genre;
              })
          )
      );
    },
  },
  methods: {
    f(item) {
      return (
          this.level_filter.findIndex((i) => i == item.level_index) !== -1 &&
          (!this.version ||
              this.music_data_dict[item.mid] &&
              this.music_data_dict[item.mid].basic_info.from == this.version) &&
          (!this.genre ||
              this.music_data_dict[item.mid] &&
              this.music_data_dict[item.mid].basic_info.genre == this.genre)
      )
    },
    getLevel(index) {
      return ["#22bb5b", "#fb9c2d", "#f64861", "#9e45e2", "#1B1B1B", "cyan"][index];
    },
    reset() {
      this.level_filter = [0, 1, 2, 3, 4, 5];
    },
    created: function () {
      this.reset()
    }
  },
  name: "ProSettingsChuni"
}
</script>

<style>
.v-item-group__next,
.v-item-group__prev {
  min-width: 32px !important;
}
</style>

<style scoped>
.v-list-subheader {
  float: right;
  min-width: 102px;
  justify-content: right;
  padding: 0px !important;
}
</style>