<template>
  <section class="ui-card">
    <h1 class="mb-4 text-xl font-semibold">实验室</h1>
    <TabsRoot v-model="labTab" :unmount-on-hide="false">
      <TabsList class="ui-tabs" aria-label="实验室功能">
        <TabsTrigger class="ui-tab" value="randomSong">随机歌曲</TabsTrigger>
        <TabsTrigger class="ui-tab" value="more">更多功能</TabsTrigger>
      </TabsList>
      <TabsContent value="randomSong" class="pt-4">
        <RandomSong />
      </TabsContent>
      <TabsContent value="more" class="pt-4">
        <div class="flex h-[50vh] items-center justify-center">
          <p class="text-2xl">Work in progress...</p>
        </div>
      </TabsContent>
    </TabsRoot>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui';
import RandomSong from '../components/randomSong.vue';

const labTab = ref('randomSong');
</script>
