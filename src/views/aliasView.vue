<script setup>
import {useAliasDataStore} from "../store";
import {onMounted, ref} from "vue";
const store = useAliasDataStore();
const headers = [
  {text: "id", value: "id", sortable: true},
  {text: "标题", value: "song_name", sortable: true},
  {text: "别名", value: "alias"},
]
const searchKey = ref("");
onMounted(async ()=>{
  await store.fetchAliasData();
})
</script>

<template>
  <v-card>
    <v-card-title>别名速查</v-card-title>
    <v-card-subtitle>数据来源 <a href="https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB">https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB</a></v-card-subtitle>
    <v-container>
      <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称/别名" single-line hide-details class="mb-4"/>
      <EasyDataTable :headers="headers" :items="store.alias_list" :search-value="searchKey">
        <template #item-id="data">
          <a :href="`/song/id/${data.id}`" target="_blank"><p class="hover:underline">{{data.id}}</p></a>
        </template>
        <template #item-song_name="data">
          <a :href="`/song/id/${data.id}`" target="_blank"><p class="hover:underline">{{data.song_name}}</p></a>
        </template>
      </EasyDataTable>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
