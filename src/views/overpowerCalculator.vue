<template>
<v-card>
  <v-card-title>单曲 OVER POWER 计算器</v-card-title>
  <v-card-subtitle>若分数为 1010000 自动判定为 AJC（无需自行选择）</v-card-subtitle>
  <v-container>
    <v-spacer/>
    <v-container class="pa-1">
      <v-text-field label="定数" v-model="ds_input" :rules="[
                  (u) =>
                    (isFinite(+u) && +u >= 0 && +u <= 15.5) || '请输入合法数据',
                ]"></v-text-field>
      <v-text-field label="分数" v-model="score_input" :rules="[
                  (u) =>
                    (isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',
                ]"></v-text-field>
      <v-container class="pa-0">
        <v-radio-group v-model="combo_status" row>
          <v-radio label="已完成" value="finished"></v-radio>
          <v-radio label="已达成 FULL COMBO" value="full_combo"></v-radio>
          <v-radio label="已达成 ALL JUSTICE" value="all_justice"></v-radio>
          <v-radio label="已理论" value="all_justice_critical" readonly></v-radio>
        </v-radio-group>
        <v-row class="d-flex justify-center" style="margin-bottom: 10px">
          <v-col>
            <v-btn color="primary" @click="calculateOP" block>计算</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="clear" block>清空</v-btn>
          </v-col>
        </v-row>
        <v-divider style="margin-bottom: 20px"/>
        <v-text-field label="结果" v-model="calc_result" readonly></v-text-field>
      </v-container>
    </v-container>
  </v-container>
</v-card>
</template>

<script>
export default {
  data: () => {
    return {
      visible: false,
      ds_input: "",
      score_input: "",
      combo_status: "finished",
      calc_result: "0",
    }
  },
  methods: {
    clear() {
      this.ds_input = "";
      this.score_input = "";
      this.combo_status = "finished";
      this.calc_result = "0";
    },
    calculateOP() {
      let result = 0;
      if (this.score_input == 1010000) {
        this.combo_status = "all_justice_critical"
      }
      switch (true) {
        case this.score_input >=1007500:
          result = (Number(this.ds_input)+2)*5+(this.score_input-1007500)*0.0015;
          switch (true) {
            case this.combo_status === "full_combo":
              result += 0.5;
              break;
            case this.combo_status === "all_justice":
              result += 0.5+0.5;
              break;
            case this.combo_status === "all_justice_critical":
              result += 0.5+0.5+0.25;
              break;
          }
          break;
        case this.score_input >=975000:
          result = this.raCalculate(Number(this.ds_input),Number(this.score_input))*5;
          break;
        default:
          result = 0;
      }
      this.calc_result = result;
    },
    raCalculate: function(ds,score) {
      let result = 0;
      switch (true) {
        case score >= 1009000:
          result = ds+2.15;
          break;
        case score >= 1007500:
          result = ds+2+parseInt((score-1007500)/100)*0.01;
          break;
        case score >= 1005000:
          result = ds+1.5+parseInt((score-1005000)/500)*0.1;
          break;
        case score >= 1000000:
          result = ds+1+parseInt((score-1000000)/1000)*0.1;
          break;
        case score >= 975000:
          result = ds+parseInt((score-975000)/2500)*0.1;
          break;
        case score >= 925000:
          result = ds-3;
          break;
        case score >= 900000:
          result = ds-5;
          break;
        case score >= 800000:
          result = (ds-5)/2;
          break;
        default:
          result = 0;
          break;
      }
      return result;
    }
  },
  name: "overpowerCalculator"
}
</script>

<style scoped>

</style>