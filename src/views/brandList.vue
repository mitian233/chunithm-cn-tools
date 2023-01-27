<template>
  <v-card>
    <v-card-title>称号列表</v-card-title>
    <v-card-subtitle>数据来源：<a href="https://space.bilibili.com/32772298/article" >losffa</a></v-card-subtitle>
    <v-container>
      <v-spacer />
      <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
      <brand-table :search="searchKey" :brand-list="listItem"/>
    </v-container>
  </v-card>
</template>

<script>
import brandList from "../assets/brandList.js";
import brandTable from "../components/brandTable.vue";
export default {
  components: {
    brandTable,
  },
  data: () =>{
    return {
      searchKey: "",
      listItem: brandList,
    }
  },
  name: "brandList"
}
</script>

<style scoped>

</style>