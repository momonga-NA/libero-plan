<template>
  <div class="mt-0">
    <v-btn color="orange darken-2">
      <v-icon class="pr-2" color="white">mdi-car</v-icon>
      <a id="rentcar" :href="rentcar.url" rel="nofollow" target="_blank"
        >レンタカー予約</a
      >
      <img border="0" width="1" height="1" :src="rentcar.src" alt="rentcar" />
    </v-btn>
  </div>
</template>


<script>
import endpoint from "@/config/endpoint";
const RENTCAR = endpoint.AFL.RENTCAR;

export default {
  data() {
    return {
      rentcar: RENTCAR,
    };
  },
};
</script>

<style scoped>
a#rentcar {
  text-decoration: none;
  color: white;
}
</style>