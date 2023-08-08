<script setup>
import {onMounted} from "vue";

window['addAds'] = function() {
  let childList = document.getElementById('adSenseBar');
  for (let i = 0; i < childList.length; i++) {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}

onMounted(() => {
  (adsbygoogle = window.adsbygoogle || []).push({});
  //window.addAds();
});

</script>

<template>
  <v-card class="mt-5">
    <!--<v-card-title>广告</v-card-title>-->
    <v-container id="adSenseBar">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9004116390026603"
           data-ad-slot="5964842462"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
