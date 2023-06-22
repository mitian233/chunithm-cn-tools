<template>
  <v-card>
    <v-card-title>中二 Rating 线计算工具</v-card-title>
    <v-container>
      <v-spacer/>
      <v-container class="pa-1">
        <v-tabs v-model="rating_mode" grow>
          <v-tab label="按分数计算" value="from_achievements">按分数计算</v-tab>
          <v-tab label="按定数计算" value="from_ds">按定数计算</v-tab>
          <v-tab label="按Rating计算" value="from_rating">按Rating计算</v-tab>
          <div v-if="this.$route.query.mode != 'from_line'">
            <v-tab label="计算分数线" value="from_line" disabled>计算分数线</v-tab>
          </div>
          <div v-else>
            <v-tab label="计算分数线" value="from_line">计算分数线</v-tab>
          </div>
        </v-tabs>
        <v-card-text>
          <v-window v-model="rating_mode">
            <v-window-item value="from_achievements">
              <achievement-calc :ds="Number(ds_in_url)"></achievement-calc>
            </v-window-item>
            <v-window-item value="from_ds">
              <ds-calc></ds-calc>
            </v-window-item>
            <v-window-item value="from_rating">
              <ra-calc></ra-calc>
            </v-window-item>
            <v-window-item value="from_line">
              <div v-if="this.$route.query.mode != 'from_line'" style="display: flex;justify-content: center">
                <div style="text-align: center;margin: 15px">
                  <h1 style="font-size: 100px;margin: 70px 0px 70px 0px">⚠️</h1>
                  <p>该功能必须从歌曲列表访问</p>
                  <v-btn @click="this.$router.push({path:'/song'})" color="primary" style="margin: 10px 0px 10px 0px">点此跳转</v-btn>
                </div>
              </div>
              <div v-else>
                <line-calc :combo="Number(combo_in_url)"></line-calc>
              </div>
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
import RaCalc from "../components/raCalc.vue";
import AchievementCalc from "../components/achievementCalc.vue";
import DsCalc from "../components/dsCalc.vue";
import LineCalc from "../components/lineCalc.vue";
export default {
  components: {LineCalc, RaCalc, DsCalc, AchievementCalc},
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
      ds_in_url: NaN,
      combo_in_url: NaN,
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
  created() {
    this.rating_mode = this.$route.query.mode || "from_achievements";
    this.ds_in_url = this.$route.query.ds;
    this.combo_in_url = this.$route.query.combo;
  },
  methods: {
  },
  name: "ratingCalculator"
}
</script>

<style scoped>

</style>
