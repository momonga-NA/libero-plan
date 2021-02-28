<template>
  <div id="bottom_navigation" class="mt-12">
    <v-bottom-navigation grow fixed class="pt-2">
      <v-btn>
        <span>ホーム</span>
        <v-icon @click="moveTo('/')">mdi-home</v-icon>
      </v-btn>
      <v-btn>
        <span>検索</span>
        <v-icon @click="moveTo('/search')">mdi-magnify</v-icon>
      </v-btn>
      <v-btn>
        <span>ツール</span>
        <v-icon @click="sheet = true">mdi-shape-plus</v-icon>
      </v-btn>
      <v-btn>
        <span>サイト情報</span>
        <v-icon @click="moveTo('/information')">mdi-information-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Tool Sheet -->
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-list>
          <v-list-item>
            <v-icon class="pr-2" color="red darken-2">mdi-car</v-icon>
            <v-list-item-title>
              <v-btn text>
                <a
                  id="rentcar"
                  :href="rentcar.url"
                  rel="nofollow"
                  target="_blank"
                  >レンタカー比較＆予約</a
                >
                <img
                  border="0"
                  width="1"
                  height="1"
                  :src="rentcar.src"
                  alt="rentcar"
                />
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="pr-2" color="yellow darken-2">mdi-run</v-icon>
            <v-list-item-title>
              <v-btn text>
                <a :href="asoview.url" rel="nofollow" target="_blank"
                  >アクティビティ予約</a
                >
                <img
                  border="0"
                  width="1"
                  height="1"
                  :src="asoview.src"
                  alt="activity"
                />
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="pr-2" color="light-blue darken-2">mdi-clock</v-icon>
            <v-list-item-title>
              <v-btn text :href="navitime.url" target="_blank"
                >移動時間確認</v-btn
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="pr-2" color="purple darken-2"
              >mdi-border-color</v-icon
            >
            <v-list-item-title>
              <v-btn text color="grey darken-1" @click="moveTo('/planning')"
                >旅程作成</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import endpoint from "@/config/endpoint";

const RENTCAR = endpoint.AFL.RENTCAR;
const ASOVIEW = endpoint.AFL.ASOVIEW;
const NAVITIME = {
  url: "https://www.navitime.co.jp",
  src: null,
};

export default {
  data() {
    return {
      rentcar: RENTCAR,
      asoview: ASOVIEW,
      navitime: NAVITIME,
      activeBtn: 1,
      sheet: false,
    };
  },
  methods: {
    moveTo(page) {
      // 元ページと同じならば処理は行わない
      if (this.$route.path == page) {
        return;
      }
      this.$router.push({ path: page });
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
  color: gray;
}
span {
  font-size: 10px;
}
</style>
