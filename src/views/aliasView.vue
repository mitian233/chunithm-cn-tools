<script setup>
import {useAliasDataStore} from "../store";
import {onMounted, ref} from "vue";
const store = useAliasDataStore();
const isLoading = ref(true);
const headers = [
  {title: "ID", value: "id", sortable: true},
  {title: "标题", value: "song_name", sortable: true},
  {title: "别名", value: "alias"},
]
const searchKey = ref("");
onMounted(async ()=>{
  await store.fetchAliasData();
  isLoading.value = false;
})
</script>

<template>
  <v-card>
    <v-card-title>别名速查</v-card-title>
    <v-card-subtitle>数据来源 <a href="https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB">https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB</a></v-card-subtitle>
    <v-container>
      <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称/别名" single-line hide-details class="mb-4"/>
      <v-data-table :headers="headers" :items="store.alias_list" :search="searchKey" :loading="isLoading">
        <template #item.id="{item}">
          <router-link :to="`/song/id/${item.id}`"><p class="hover:underline">{{item.id}}</p></router-link>
        </template>
        <template #item.song_name="{item}">
          <router-link :to="`/song/id/${item.id}`"><p class="hover:underline">{{item.song_name}}</p></router-link>
        </template>
        <template #item.alias="{item}">
          {{item.alias.toString()}}
        </template>
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
