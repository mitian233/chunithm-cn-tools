<template>
  <v-card>
    <v-card-title>中二 Rating 线计算工具</v-card-title>
    <v-container>
      <v-spacer/>
      <v-container class="pa-1">
        <v-tabs v-model="rating_mode">
          <v-tab label="按分数计算" value="from_achievements">按分数计算</v-tab>
          <v-tab label="按定数计算" value="from_ds">按定数计算</v-tab>
          <v-tab label="按Rating计算" value="from_rating">按Rating计算</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="rating_mode">
            <v-window-item value="from_achievements">
              <v-row class="d-flex justify-center">
                <v-col class="ma-2">
                  <v-text-field v-model="ds_input" label="定数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 15.5) || '请输入合法数据',]">
                  </v-text-field>
                </v-col>
                <v-col class="ma-2">
                  <v-text-field v-model="achievements_input" label="分数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',]">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-text-field v-model="rating_result" label="计算Rating" readonly></v-text-field>
            </v-window-item>
            <v-window-item value="from_ds">
              暂不可用
            </v-window-item>
            <v-window-item value="from_rating">
              暂不可用
            </v-window-item>
          </v-window>
        </v-card-text>
        <!--
        <v-text-field v-if="rating_mode === 'from_ds'" label="定数" v-model="ds_input" :rules="[
                  (u) =>
                    (isFinite(+u) && +u >= 0 && +u <= 15.5) || '请输入合法数据',
                ]"></v-text-field>
        <v-text-field v-else-if="rating_mode === 'from_achievements'" label="分数" v-model="achievements_input" :rules="[
                  (u) =>
                    (isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',
                ]"></v-text-field>
        <v-text-field v-else label="目标Rating" v-model="rating_input" :rules="[
                  (u) =>
                    (isFinite(+u) && +u >= 0 && +u <= 17.5) || '请输入合法数据',
                ]"></v-text-field>
        <v-data-table class="mt-2" dense :headers="rating_list_headers" :items-per-page="-1" :items="rating_list"
                      hide-default-footer sort-by="achievements" sort-desc item-key="id"
                      no-data-text="没有符合条件的结果"
                      mobile-breakpoint="0">
          <template #item.ds="{ item }">
            {{ item.ds.toFixed(1) }}
          </template>
          <template #item.achievements="{ item }">
            {{ item.achievements.toFixed(4) }}%
          </template>
        </v-data-table>-->
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      visible: false,
      rating_mode: 'from_achievements',
      ds_input: "",
      rating_input: "",
      rating_result: 0,
      achievements_input: "",
      rating_list_headers: [
        {text: "定数", value: "ds"},
        {text: "分数", value: "achievements"},
        {text: "Rating", value: "rating"},
      ],
    }
  },
  computed: {
    rating_list: function () {
      if (this.rating_mode === "from_ds") {
        if (this.ds_input === "") return [];
      } else if (this.rating_mode === "from_achievements") {
        if (this.achievements_input === "") return [];
      } else if (this.rating_mode === "from_rating") {
        if (this.rating_input === "") return [];
      }
      return [];
    }
  },
  methods: {
    get_ra: function (ds, score) {
      let result = 0;
      switch (true) {
        case score >= 1009000:
          result = Number(ds) + 2.15;
          break;
        case score >= 1007500:
          result = Number(ds) + 2 + parseInt((score - 1007500) / 100) * 0.01;
          break;
        case score >= 1005000:
          result = Number(ds) + 1.5 + parseInt((score - 1005000) / 500) * 0.1;
          break;
        case score >= 1000000:
          result = Number(ds) + 1 + parseInt((score - 1000000) / 1000) * 0.1;
          break;
        case score >= 975000:
          result = Number(ds) + parseInt((score - 975000) / 2500) * 0.1;
          break;
        case score >= 925000:
          result = ds - 3;
          break;
        case score >= 900000:
          result = ds - 5;
          break;
        case score >= 800000:
          result = (ds - 5) / 2;
          break;
        default:
          result = 0;
          break;
      }
      return result;
    },
  },watch:{
    achievements_input:function (val) {
      this.rating_result = this.get_ra(this.ds_input, val);
    },
    ds_input:function (val) {
      this.rating_result = this.get_ra(val, this.achievements_input);
    }
  },
  name: "ratingCalculator"
}
</script>

<style scoped>

</style>