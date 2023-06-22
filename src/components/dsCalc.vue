<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-text-field v-model="ds_input" prepend-icon="mdi-magnify" label="定数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 15.5) || '请输入合法数据',]"/>
    </v-col>
  </v-row>
  <EasyDataTable :headers="tableHeader" :items="tableData" :hide-footer="true" :rows-per-page="26"></EasyDataTable>
</template>

<script>
const archivementsList = [
    1010000,
    1008500,
    1008000,
    1007750,
    1007500,
    1007000,
    1006000,
    1005000,
    1003000,
    1001000,
    1000000,
    997500,
    995000,
    992500,
    990000,
    985000,
    980000,
    975000,
]
export default {
  data: () => {
    return {
      ds_input: "",
      tableHeader: [
        {text:"定数",value:"ds"},
        {text:"分数",value:"achievements"},
        {text:"Rating",value:"rating"},
      ],
      tableData:[],
    }
  }, methods: {
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
    }
  },
  watch:{
    ds_input:function (val) {
      this.tableData = [];
      for (let i = 0; i <= 17; i++) {
        let cache = {};
        cache.ds = val;
        cache.achievements = archivementsList[i];
        cache.rating = this.get_ra(val, archivementsList[i]).toFixed(2);
        this.tableData.push(cache)
      }
    }
  },
  name: "dsCalc",
}
</script>

<style scoped>

</style>
