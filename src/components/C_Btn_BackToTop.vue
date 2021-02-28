<template>
  <div id="back_to_top_btn">
    <v-btn text color="grey" @click="goBackToTop()">> ホームに戻る</v-btn>
  </div>
</template> 
<script>
export default {
  methods: {
    goBackToTop() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>