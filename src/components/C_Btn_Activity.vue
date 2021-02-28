<template>
  <div class="mt-0">
    <v-btn color="orange darken-2">
      <v-icon class="pr-2" color="white">mdi-run</v-icon>
      <a id="activity" :href="asoview.url" rel="nofollow" target="_blank"
        >アクティビティを探す</a
      >
      <img border="0" width="1" height="1" :src="asoview.src" alt="" />
    </v-btn>
  </div>
</template>

<script>
import endpoint from "@/config/endpoint";
const ASOVIEW = endpoint.AFL.ASOVIEW;

export default {
  data() {
    return {
      asoview: ASOVIEW,
    };
  },
};
</script>

<style scoped>
a#activity {
  text-decoration: none;
  color: white;
}
</style>