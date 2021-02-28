<template>
<div class="search">
  <v-app>
    <C_Bar/>
    <v-card color="transparent" class="mx-auto mb-2" width="500">
      <v-card-text class="px-5">
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-select dense v-model="select_prefecture" :items="prefectures" label="都道府県"></v-select>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-select dense v-model="select_season" :items="seasons" label="季節"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" class="py-0 pl-6">
            <v-switch dense v-model="cost_flg" class="ma-2" label="費用"></v-switch>
          </v-col>
          <v-col cols="7">
            <span v-if="cost_flg" id="cost">～{{ select_cost }}円</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0 px-6">
            <v-slider dense :disabled="!cost_flg" v-model="select_cost" class="align-center" step="1000" :max="max" :min="min" hide-details ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="error" dark width="150" @click="search()">検索</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div v-for="(result,index) in results" :key="index">
      <v-card　class="mx-auto" mx-0　max-width="600" outlined @click="openPlan(result)" transition="slide-x-transition">
        <v-list-item three-line>
          <v-list-item-content class="pb-0">
            <div class="overline mb-2" dense>{{ result.title }}</div>
            <v-list-item-title class="overline mb-1" dense>季節：{{ getSeason(result.season) }}</v-list-item-title>
            <v-list-item-subtitle class="overline mb-2">予算：{{ result.cost}}円</v-list-item-subtitle>
          </v-list-item-content>
          <v-img :src="'/img/thumbnail/thumbnail_' + result.src + '.jpg'" max-height="80" max-width="120"/>
        </v-list-item>
      </v-card>
    </div>

    <!-- エラーメッセージ -->
    <v-snackbar v-model="snackbar" top :timeout=3000 color="gray">
      <span >検索条件を入力してください</span>
    </v-snackbar>
    <C_Bottom_Nav/>
  </v-app>
</div>
</template>
<script>
import axios from "axios";
import C_Bar from "@/components/C_Bar";
import C_Bottom_Nav from "@/components/C_Bottom_Nav";
import endpoint from "@/config/endpoint";

const PREFECTURES = [
  "",
  "東京",
  "神奈川",
  "千葉",
  "埼玉",
  "静岡",
  "山梨",
  "長野",
  "岐阜",
  "茨城",
  "栃木",
  "群馬",
  "新潟",
  "福島",
];
const SEASONS = ["", "春", "夏", "秋", "冬"];
const COST_MIN = 5000;
const COST_MAX = 20000;

export default {
  components: {
    C_Bar,
    C_Bottom_Nav,
  },
  data() {
    return {
      min: COST_MIN,
      max: COST_MAX,
      cost_flg: false,
      prefectures: PREFECTURES,
      seasons: SEASONS,
      select_cost: 5000,
      select_season: null,
      select_prefecture: null,
      snackbar: false,
      thumbnails: [],
      results: [], // 検索条件に合致した結果
    };
  },
  methods: {
    async search() {
      if (
        !this.select_prefecture &&
        !this.select_season &&
        this.select_cost == COST_MIN
      ) {
        // 検索条件が未入力の場合はメッセージを出して終了
        this.snackbar = true;
        return;
      }
      var thumbnails = [];
      if (!this.$store.getters["isThumbnailsEmpty"]) {
        // ストアに保存されている場合は取り出す
        thumbnails = this.$store.getters["getThumbnails"];
      } else {
        // APIを叩いて取得
        await axios.get(endpoint.API.THUMBNAIL).then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            thumbnails.push(res.data[i]);
          }
          // DB接続はできるだけ節約したいため、ストアにセット
          this.$store.dispatch("setThumbnails", thumbnails);
        });
      }

      // 初期化
      this.results.splice(0);
      // 条件に基づいて表示
      for (var i = 0; i < thumbnails.length; i++) {
        // 都道府県
        if (
          this.select_prefecture &&
          this.select_prefecture != thumbnails[i].pref
        ) {
          continue;
        }
        // 季節
        if (
          this.select_season &&
          this.select_season != this.getSeason(thumbnails[i].season)
        ) {
          continue;
        }
        // 費用
        if (
          this.select_cost != COST_MIN &&
          this.select_cost < thumbnails[i].cost
        ) {
          continue;
        }
        // 全ての条件に合致した場合
        this.results.push(thumbnails[i]);
      }
      // ソート
      this.results.sort(function (a, b) {
        return a.cost >= b.cost ? 1 : -1;
      });
      this.results.sort(function (a, b) {
        return a.season >= b.season ? 1 : -1;
      });
    },
    openPlan(plan_header) {
      this.$router.push({ path: `/trip_plan/${plan_header.id}` });
    },
    getSeason(index) {
      return SEASONS[index];
    },
  },
};
</script>
<style scoped>
#cost {
  font-size: 19px;
}
</style>