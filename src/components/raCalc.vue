<template>
  <div style="display: flex;justify-content: center">
    <div style="text-align: center;margin: 15px">
      <h1 style="font-size: 100px;margin: 70px 0px 70px 0px">🏗️</h1>
      <h2>该页面正在施工</h2>
      <v-btn @click="this.$router.push({path:'/'})" color="primary" style="margin: 20px 0px 10px 0px">回到主页</v-btn>
    </div>
  </div>
  <!--
  <v-row class="d-flex justify-center">
    <v-col>
      <v-text-field v-model="achievements_input" label="分数" :rules="[(u) =>(isFinite(+u) && +u >= 0 && +u <= 1010000) || '请输入合法数据',]"/>
    </v-col>
  </v-row>
  <EasyDataTable :headers="tableHeader" :items="tableData" :hide-footer="true"></EasyDataTable>
  -->
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
