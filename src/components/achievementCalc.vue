<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-text-field v-model="ds_input" label="定数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 15.5) || '请输入合法数据',]"/>
    </v-col>
    <v-col>
      <v-text-field v-model="achievements_input" label="分数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',]"/>
    </v-col>
  </v-row>
  <v-text-field v-model="rating_result" label="计算Rating" readonly/>
</template>

<script>
export default {
  props:{
    ds: Number
  },
  data: () => {
    return {
      ds_input: "",
      achievements_input: "",
      rating_result: 0,
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
  },
  created() {
    this.ds_input = this.ds || "";
  },
  watch:{
    achievements_input:function (val) {
      this.rating_result = this.get_ra(this.ds_input, val)
    },
    ds_input:function (val) {
      this.rating_result = this.get_ra(val, this.achievements_input)
    }
  },
  name: "achievementCalc"
}
</script>

<style scoped>

</style>
