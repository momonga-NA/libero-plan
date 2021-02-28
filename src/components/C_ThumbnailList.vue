<template>
  <div id="list">
    <div id="slide-wrap" class="pt-2 pb-2 mb-6">
      <v-slide-item v-for="(thumbnail, index) in thumbnails" :key="index">
        <div class="pl-1">
          <v-card
            class="mx-auto"
            width="200"
            max-width="160"
            @click="openPlan(thumbnail)"
          >
            <v-img
              class="white--text align-end"
              height="110"
              ref="picture"
              :src="'/img/thumbnail/thumbnail_' + thumbnail.src + '.jpg'"
            >
              <v-card-title class="pb-1">{{
                getSeason(thumbnail.season)
              }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-1">{{ thumbnail.pref }}</v-card-subtitle>
            <v-card-text class="text--primary px-0 pb-0 text-center">
              <p id="title" class="mb-0 px-1">{{ thumbnail.title }}</p>
            </v-card-text>
            <v-card-actions class="pb-3"> </v-card-actions>
          </v-card>
        </div>
      </v-slide-item>
    </div>
  </div>
</template>
<script>
const SEASONS = ["春", "夏", "秋", "冬"];

export default {
  props: ["thumbnails"],
  data() {
    return {};
  },
  methods: {
    getSeason(index) {
      return SEASONS[index - 1];
    },
    openPlan(thumbnail) {
      this.$router.push({ path: `/trip_plan/${thumbnail.id}` });
    },
  },
};
</script>
<style scoped>
h2#group-theme {
  color: gray;
}
#title {
  font-size: 9.5px;
}
#slide-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0 0 1em;
  margin: 0 0 2em 0;
  scroll-behavior: smooth;
}

@media screen and (max-width: 480px) {
  #slide-wrap #slide-content {
    flex: 0 0 25%;
    margin: 0px 5px;
    scroll-snap-align: center;
  }
}
</style>