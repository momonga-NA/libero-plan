<template>
  <v-card flat class="px-0">
    <v-app-bar color="white" flat elevate-on-scroll height="100">
      <v-img
        src="/img/header.jpg"
        max-height="60"
        max-width="100"
        @click="goBackToTop()"
      />
    </v-app-bar>
  </v-card>
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