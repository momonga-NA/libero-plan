<template>
  <div id="top">
    <C_Loading v-show="loading" />
    <v-app v-show="!loading">
      <C_Bar />
      <v-container id="main-contents">
        <!-- section-モデルプラン-->
        <section>
          <div class="plan">
            <v-img src="/img/home/plan.jpg" />
            <h2 class="front">Itinerary</h2>
          </div>
          <div class="pt-5">
            <pre class="caption">
東京を中心とした日帰りモデルプランを集めました！
面倒な経路設定やスケジュール管理はもう不要！
車を手配するだけで旅行を楽しむことができます。</pre
            >
          </div>

          <div>
            <h3 class="pl-2 pt-10">
              <v-icon medium color="orange" class="pr-1"
                >mdi-flag-variant</v-icon
              ><span class="font-weight-bold">今季のプラン</span>
            </h3>
          </div>
          <C_ThumbnailList :thumbnails="season_thumbnails" />
          <div>
            <h3 class="pl-2 pt-10">
              <v-icon medium color="orange" class="pr-1"
                >mdi-flag-variant</v-icon
              ><span class="font-weight-bold">最近投稿されたプラン</span>
            </h3>
          </div>
          <C_ThumbnailList :thumbnails="latest_thumbnails" />
          <div class="text-center pb-2 mb-10">
            <v-btn dark class="ma-2" color="orange darken-2" to="/search"
              ><v-icon class="pr-1" dense>mdi-magnify</v-icon
              >日帰りプランを探す</v-btn
            >
          </div>
        </section>

        <!-- section-アクティビティ-->
        <section>
          <div class="activity">
            <v-img src="/img/home/activity.jpg" />
            <h2>Activity</h2>
          </div>
          <v-row class="pt-10">
            <v-col cols="12" xs="12" sm="6" class="pa-1">
              <h3 class="pl-2 pt-5">
                <v-icon medium color="orange" class="pr-1"
                  >mdi-flag-variant</v-icon
                ><span class="font-weight-bold">今人気のアウトドア</span>
              </h3>
              <pre class="caption">
旅行にはアクティビティも外せない！
普段できない体験を楽しみましょう！</pre
              >
              <C_Outdoor_Activity class="pt-1" />
            </v-col>
            <v-col cols="12" xs="12" sm="6" class="pa-1">
              <h3 class="pl-2 pt-5">
                <v-icon medium color="orange" class="pr-1"
                  >mdi-flag-variant</v-icon
                ><span class="font-weight-bold">雨の日でもOK</span>
              </h3>
              <pre class="caption">
急な悪天候で週末が旅行できなんてこと、ありますよね？
雨が降っても楽しめるインドアアクティビティを厳選しました！</pre
              >
              <C_Indoor_Activity class="pt-1" />
            </v-col>
          </v-row>

          <div class="text-center mt-2 mb-10">
            <C_Btn_Activity />
          </div>
        </section>
        <!-- section-レンタルスペース-->
        <section>
          <div class="rental-space">
            <v-img src="/img/home/rentalspace.jpg" />
            <h2>Rental Space</h2>
          </div>
          <v-row>
            <v-col cols="12" xs="12" sm="8" class="pa-1">
              <div class="pt-5">
                <pre class="caption">
雨の日はレンタルスペースというのもおすすめです！
お洒落な部屋が借りたい時間だけ借りられます！
リーズナブルな値段で友達と豪華にパーティを楽しみませんか？</pre
                >
              </div>
            </v-col>
            <v-col cols="12" xs="12" sm="4" class="pa-1">
              <div class="text-center mt-10 mb-10">
                <C_Btn_RentalSpace />
              </div>
            </v-col>
          </v-row>
        </section>
      </v-container>
      <C_Bottom_Nav />
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import C_Loading from "@/components/C_Loading";
import C_Bar from "@/components/C_Bar";
import C_ThumbnailList from "@/components/C_ThumbnailList";
import C_Outdoor_Activity from "@/components/C_Outdoor_Activity";
import C_Indoor_Activity from "@/components/C_Indoor_Activity";
import C_Btn_Activity from "@/components/C_Btn_Activity";
import C_Btn_RentalSpace from "@/components/C_Btn_RentalSpace";
import C_Bottom_Nav from "@/components/C_Bottom_Nav";
import endpoint from "@/config/endpoint";

const ASOVIEW = endpoint.API.ASOVIEW;
const API_THUMBNAIL = endpoint.API.THUMBNAIL;

export default {
  components: {
    C_Loading,
    C_Bar,
    C_ThumbnailList,
    C_Outdoor_Activity,
    C_Indoor_Activity,
    C_Btn_Activity,
    C_Btn_RentalSpace,
    C_Bottom_Nav,
  },
  data() {
    return {
      loading: true,
      asoview_url: ASOVIEW,
      thumbnails: [],
      season_thumbnails: [],
      latest_thumbnails: [],
    };
  },
  mounted() {
    // 初回ロード時はロード画面を表示
    if (this.$store.getters["isThumbnailsEmpty"]) {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    } else {
      this.loading = false;
    }
  },
  methods: {
    // 季節でフィルターをして取得
    filterBySeason() {
      var now = new Date();
      var month = now.getMonth() + 1;
      var season = null;
      switch (month) {
        case 3:
        case 4:
        case 5:
          season = 1; // 春
          break;
        case 6:
        case 7:
        case 8:
          season = 2; // 夏
          break;
        case 9:
        case 10:
        case 11:
          season = 3; // 秋
          break;
        case 12:
        case 1:
        case 2:
          season = 4; // 冬
          break;
      }
      this.season_thumbnails = this.thumbnails.filter((v) => {
        return v.season === season;
      });
      this.season_thumbnails = this.shuffle(this.season_thumbnails);
      this.season_thumbnails = this.season_thumbnails.slice(0, 9);
    },
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    // 作成時間を昇順にソートする
    sortByLatest() {
      this.thumbnails.sort(function (a, b) {
        return a.create >= b.create ? -1 : 1;
      });
      this.latest_thumbnails = this.thumbnails.slice(0, 9);
    },
  },
  async created() {
    // ストアに保存されている場合はストアから取り出して終了
    if (!this.$store.getters["isThumbnailsEmpty"]) {
      this.thumbnails = this.$store.getters["getThumbnails"];
    } else {
      // API
      await axios.get(API_THUMBNAIL).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.thumbnails.push(res.data[i]);
        }
        // DB接続はできるだけ節約したいため、ストアにセット
        this.$store.dispatch("setThumbnails", this.thumbnails);
      });
    }
    // ソート
    this.filterBySeason();
    this.sortByLatest();
  },
};
</script>
<style scoped>
#main-contents {
  max-width: 960px;
  margin: 0px auto;
}

pre {
  white-space: pre-wrap;
  color: #f57c00;
  background-color: #ffeead;
  padding: 15px;
  max-width: 450px;
  border-radius: 20px;
  border: transparent;
  margin: 5px auto;
  text-align: center;
}

div.plan {
  position: relative;
}

div.activity {
  position: relative;
}

div.rental-space {
  position: relative;
}

h2 {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  font-family: "Arial", "メイリオ";
}

h3 {
  font-size: 20px;
  color: #f57c00;
  line-height: 30px;
}
</style>