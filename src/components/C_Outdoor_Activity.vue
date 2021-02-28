<template>
  <div id="outdoor_activity">
    <v-row class="ma-1">
      <v-col
        v-for="(activity, index) in activities"
        :key="index"
        class="d-flex child-flex activity"
        xs="6"
        sm="6"
      >
        <v-card flat tile class="d-flex" hover @click="openDialog(activity)">
          <v-img
            class="white--text align-end"
            :src="'/img/activity/outdoor/' + activity.img + '.jpg'"
          >
            <v-card-title class="font-italic pb-0 pl-2 overline">{{
              activity.name
            }}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2 font-weight-light title"
            >{{ target_activity.name }}</v-card-title
          >
          <v-card-text class="pt-4">
            <p>{{ target_activity.description }}</p>
            <p class="font-weight-bold">関東近郊の主なスポット</p>
            <ul v-for="(spot, index) in target_activity.spots" :key="index">
              <li>{{ spot }}</li>
            </ul>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text>
              <a
                id="activity"
                :href="target_activity.url"
                rel="nofollow"
                target="_blank"
                >アクティビティを探す</a
              >
              <img
                border="0"
                width="1"
                height="1"
                :src="target_activity.src"
                alt="activity"
              />
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import endpoint from "@/config/endpoint";
const SKI_AND_SNOWBOARD = endpoint.AFL.SKI_AND_SNOWBOARD;
const LANTHANUM = endpoint.AFL.LANTHANUM;
const DIVING = endpoint.AFL.DIVING;
const SNOWSHOES = endpoint.AFL.SNOWSHOES;

export default {
  data() {
    return {
      target_activity: "", // ダイアログに表示するアクティビティ
      dialog: false,
      activities: [
        {
          img: "ski_and_snowboard",
          name: "スキー・スノボ",
          url: SKI_AND_SNOWBOARD.url,
          src: SKI_AND_SNOWBOARD.src,
          description:
            "もはや説明不要の定番アクティビティ！今年も雪原を巡りましょう！",
          spots: ["志賀高原エリア", "軽井沢エリア", "白馬・栂池エリア"],
        },
        {
          img: "lanthanum",
          name: "ランタン打ち上げ",
          url: LANTHANUM.url,
          src: LANTHANUM.src,
          description:
            "雪の中、ランタンを飛ばすイベントです！幻想的な景色が観たい人におすすめです！",
          spots: ["ニュー・グリーンピア津南(新潟県)のみ"],
        },
        {
          img: "diving",
          name: "ダイビング",
          url: DIVING.url,
          src: DIVING.src,
          description:
            "実はダイビングは冬でもできるんですよ！冬の方が透明度が高く、夏より楽しめる人もいるのだとか！",
          spots: [
            "神奈川県相模湾周辺",
            "静岡県伊豆半島周辺",
            "千葉県南房総半島周辺",
          ],
        },
        {
          img: "snowshoes",
          name: "スノーシュー",
          url: SNOWSHOES.url,
          src: SNOWSHOES.src,
          description:
            "スノーシューは雪の中を散策するアクティビティです。スキーとは違い平坦な道なので、誰でも楽しめますよ！",
          spots: ["長野県各所", "新潟県各所", "群馬県各所"],
        },
      ],
    };
  },
  methods: {
    openDialog(activity) {
      this.target_activity = activity;
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.v-application a {
  text-decoration: none;
  color: purple;
}

.activity {
  padding: 0;
}
</style>