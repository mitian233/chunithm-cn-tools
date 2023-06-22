<template>
  <div style="display: flex;justify-content: center">
    <div style="text-align: center; margin: 15px; ">
      <h3>该乐曲总Combo数</h3>
      <p>{{ this.combo }}</p>
      <v-text-field v-model="target_score" label="输入目标分数线" single-line hide-details class="mb-4" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',]"/>
      <div v-if="show_result">
        <h3>允许的最多Justice数</h3>
        <p>{{ this.justice_count }}</p>
        <h3>等效的最多Attack数</h3>
        <p>{{ this.attack_count }}</p>
        <h3>等效的最多Miss数</h3>
        <p>{{ this.miss_count }}</p>
      </div>
      <div v-else>
        <p>未输入数据或数据不合法！请检查输入！</p>
      </div>
      <v-btn @click="this.$router.back()" color="primary" style="margin: 10px 0px 10px 0px">回到上一页</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    combo: Number,
     },
  data: () => {
    return {
      justice_count: 0,
      attack_count: 0,
      miss_count: 0,
      target_score: "",
      show_result: false,
    }
  },
  methods:{
    calcByCombo(target, full_combo) {
      const basic = 1000000 / full_combo;
      const justice_count = 101 * full_combo - 100 * target / basic;
      const attack_count = (101 * full_combo - 100 * target / basic) / 51;
      const miss_count = full_combo - target / basic / 1.01;
      this.justice_count = Math.floor(justice_count * 100) / 100;
      this.attack_count = Math.floor(attack_count * 100) / 100;
      this.miss_count = Math.floor(miss_count * 100) / 100;
    },
  },
  created() {
  },
  watch: {
    target_score: function () {
      if (this.target_score === "") {
        this.show_result = false;
      } else if (this.target_score >= 0 && this.target_score <= 1010000) {
        this.show_result = true;
        this.calcByCombo(this.target_score, this.combo);
      } else {
        this.show_result = false;
      }
    },
  },
  name: "lineCalc",
}
</script>

<style scoped>

</style>
