<template>
  <div class="mt-0 c">
    <v-btn color="orange darken-2">
      <v-icon class="pr-2" color="white">mdi-home-variant</v-icon>
      <a id="activity" :href="rentalSpace.url" target="_blank" rel="nofollow"
        >レンタルスペースを探す</a
      >
      <img :src="rentalSpace.src" width="1" height="1" style="border: none" />
    </v-btn>
  </div>
</template>

<script>
import endpoint from "@/config/endpoint";
const RENTAL_SPACE = endpoint.AFL.RENTAL_SPACE;

export default {
  data() {
    return {
      rentalSpace: RENTAL_SPACE,
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