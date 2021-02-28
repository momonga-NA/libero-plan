<template>
  <div id="trip_plan">
    <C_Loading v-show="loading" />
    <v-app v-show="!loading">
      <C_Bar />
      <v-card class="mx-auto" width="400">
        <v-card light flat>
          <v-container>
            <v-layout align-center>
              <v-layout column justify-end>
                <div class="title font-weight-light">{{ title }}</div>
                <div class="font-weight-light">
                  <span class="pr-1 body-2">平均予算：{{ cost }}円</span>
                  <v-btn
                    text
                    color="orange darken-2"
                    @click="display_question_dialog()"
                    ><v-icon>mdi-comment-question</v-icon></v-btn
                  >
                </div>
                <div>
                  <v-chip small class="ma-1 ml-0">{{ pref }}</v-chip>
                  <v-chip small class="ma-1 ml-0">{{
                    getSeason(season)
                  }}</v-chip>
                </div>
                <div>
                  <pre class="caption pr-2 py-2">{{ summery }}</pre>
                </div>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card>
        <v-card-text class="pa-0">
          <v-timeline align-top dense mx-auto class="mr-10">
            <!-- Start -->
            <v-timeline-item color="pink accent-2" small>
              <v-layout pt-0>
                <v-flex xs4>
                  <strong class="time">{{ start }}</strong>
                </v-flex>
                <v-flex pl-2>
                  <strong>東京出発</strong>
                </v-flex>
              </v-layout>
            </v-timeline-item>
            <!-- Spot -->
            <v-timeline-item
              v-for="(spot, index) in spots"
              :key="spot.spot_id"
              :color="dot_colors[index]"
              small
            >
              <v-layout pt-0>
                <v-flex xs4>
                  <strong class="time"
                    >{{ spot.time_from }}-{{ spot.time_to }}</strong
                  >
                </v-flex>
                <v-flex pl-2>
                  <strong>{{ spot.name }}</strong>
                </v-flex>
              </v-layout>
              <v-layout>
                <img
                  v-if="spot.img_sq != null"
                  :src="'/img/spot/' + spot.img_sq + '.jpg'"
                  width="240"
                  height="160"
                />
              </v-layout>
              <v-layout>
                <pre class="overline pt-1">{{ spot.caption }}</pre>
              </v-layout>
              <v-btn
                class="pl-0"
                v-if="spot.address || spot.url || spot.description"
                text
                small
                @click.stop="display_mdoal(spot)"
                >> スポット詳細</v-btn
              >
            </v-timeline-item>
            <!-- Goal -->
            <v-timeline-item color="pink accent-2" small>
              <v-layout pt-0>
                <v-flex xs4>
                  <strong class="time">{{ goal }}</strong>
                </v-flex>
                <v-flex pl-2>
                  <strong>東京到着</strong>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>

          <v-container class="text-center pb-0">
            <v-btn text color="purple" @click="copyPath()"
              ><v-icon>mdi-link-variant</v-icon>URLコピー</v-btn
            >
          </v-container>
          <v-container d-flex flex-row-reverse class="pt-0">
            <C_Btn_BackToTop />
          </v-container>
        </v-card-text>
      </v-card>

      <!-- dialog -->
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">スポット詳細</v-card-title>
          <v-card-text>
            <v-list-item class="pl-0" v-if="md_address">
              <v-list-item-content>
                <v-list-item-title
                  >住所<v-icon class="pl-2" @click="copyAddress()"
                    >mdi-content-copy</v-icon
                  ></v-list-item-title
                >
                <v-list-item-subtitle id="address">{{
                  md_address
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pl-0" v-if="md_url">
              <v-list-item-content>
                <v-list-item-title>URL</v-list-item-title>
                <v-list-item-subtitle
                  ><a :href="md_url" target="_blank">{{
                    md_url
                  }}</a></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pl-0" v-if="md_description">
              <v-list-item-content class="pb-0">
                <v-list-item-title>備考</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <pre class="caption">{{ md_description }}</pre>
          </v-card-text>
          <v-card-actions>
            <v-btn text v-if="md_activity_url && md_activity_src">
              <a
                id="rentcar"
                :href="md_activity_url"
                rel="nofollow"
                target="_blank"
                >アクティビティ予約</a
              >
              <img
                border="0"
                width="1"
                height="1"
                :src="md_activity_src"
                alt="activity"
              />
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <C_Bottom_Nav />
      <v-snackbar v-model="snackbar" top :timeout="2000" color="gray">
        <span>コピーに成功しました</span>
      </v-snackbar>

      <!-- question-dialog -->
      <v-dialog v-model="question_dialog" max-width="350">
        <v-card>
          <v-card-title class="title">説明</v-card-title>
          <v-card-text class="pb-0">
            <p class="mb-3">金額は以下モデルとして算出しています。</p>
            <ul>
              <li>24時間8,000円のレンタカーを利用</li>
              <li>5人乗りで、5人で割り勘とする</li>
              <li>最速ルートが基準</li>
              <li>高速道路区画はETCを利用</li>
            </ul>
            <br />
            <p class="mb-3">時間は以下モデルとして算出しています。</p>
            <ul>
              <li>車での移動は地図ポータルサイト「NAVITIME」を使って算出</li>
              <li>ルートは最速ルートを選択</li>
              <li>滞在時間は実際に訪れた時を参考に記載</li>
            </ul>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="purple" text @click="question_dialog = false"
              >戻る</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import C_Loading from "@/components/C_Loading";
import C_Bar from "@/components/C_Bar";
import C_Bottom_Nav from "@/components/C_Bottom_Nav";
import C_Btn_BackToTop from "@/components/C_Btn_BackToTop";
import endpoint from "@/config/endpoint";

const SEASONS = ["春", "夏", "秋", "冬"];
const DOT_COLORS = [
  "orange darken-2",
  "purple",
  "orange darken-2",
  "purple",
  "orange darken-2",
];

export default {
  components: {
    C_Loading,
    C_Bar,
    C_Bottom_Nav,
    C_Btn_BackToTop,
  },
  data() {
    return {
      loading: true,
      dot_colors: DOT_COLORS,
      start: "",
      goal: "",
      title: "",
      season: "",
      cost: "",
      pref: "",
      summery: "",
      spots: [],
      dialog: false,
      md_address: "",
      md_url: "",
      md_description: "",
      md_activity_url: "",
      md_activity_src: "",
      snackbar: false,
      question_dialog: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  // ページ読込時にデータ取得
  created() {
    axios
      .get(endpoint.API.TRIP_SPOT, { params: { id: this.$route.params.id } })
      .then((res) => {
        this.start = res.data.start;
        this.goal = res.data.goal;
        this.title = res.data.title;
        this.cost = res.data.cost;
        this.pref = res.data.pref;
        this.season = res.data.season;
        this.summery = res.data.summery;
        if (res.data.spot1 != null && res.data.spot1 != "")
          this.spots.push(res.data.spot1);
        if (res.data.spot2 != null && res.data.spot2 != "")
          this.spots.push(res.data.spot2);
        if (res.data.spot3 != null && res.data.spot3 != "")
          this.spots.push(res.data.spot3);
        if (res.data.spot4 != null && res.data.spot4 != "")
          this.spots.push(res.data.spot4);
        if (res.data.spot5 != null && res.data.spot5 != "")
          this.spots.push(res.data.spot5);
      });
  },
  methods: {
    display_mdoal(spot) {
      this.md_address = spot.address;
      this.md_url = spot.url;
      this.md_description = spot.description;
      this.md_activity_url = spot.activity_url;
      this.md_activity_src = spot.activity_src;
      this.dialog = true;
    },
    getSeason(index) {
      return SEASONS[index - 1];
    },
    copyAddress() {
      const txt = document.querySelector("#address").innerText;
      navigator.clipboard.writeText(txt);
      this.snackbar = true;
    },
    copyPath() {
      const root = "https://libero-trip.tokyo";
      navigator.clipboard.writeText(root + this.$route.path);
      this.snackbar = true;
    },
    display_question_dialog() {
      this.question_dialog = true;
    },
  },
};
</script>
<style scoped>
.time {
  font-size: 10px;
}
pre {
  white-space: pre-wrap;
}
a#rentcar {
  text-decoration: none;
  color: purple;
}
</style>