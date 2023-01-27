<template>
  <v-card>
    <v-card-title>称号列表</v-card-title>
    <v-card-subtitle>数据来源：<a href="https://space.bilibili.com/32772298/article" >losffa</a></v-card-subtitle>
    <v-container>
      <v-spacer />
      <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
      <title-table :search="searchKey" :title-list="listItem"/>
    </v-container>
  </v-card>
</template>

<script>
import titleList from "../assets/titleList.js";
import titleTable from "../components/titleTable.vue";
export default {
  components: {
    titleTable,
  },
  data: () =>{
    return {
      searchKey: "",
      listItem: titleList,
    }
  },
  name: "titleList"
}
</script>

<style scoped>

</style>