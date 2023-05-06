<template>
  暂不可用
  <!--
  <v-row class="d-flex justify-center">
    <v-col>
      <v-text-field v-model="achievements_input" label="分数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',]"/>
    </v-col>
  </v-row>
  <EasyDataTable :headers="tableHeader" :items="tableData" :hide-footer="true"></EasyDataTable>-->
</template>

<script>
export default {
  data: () => {
    return {
      tableHeader: [
        {text:"定数",value:"ds"},
        {text:"分数",value:"achievements"},
        {text:"Rating",value:"rating"},
      ],
      achievements_input: "",
      tableData:[],
    }
  },
  methods:{

  },
  name: "raCalc"
}
</script>

<style scoped>

</style>