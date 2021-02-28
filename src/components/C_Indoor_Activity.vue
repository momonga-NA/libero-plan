<template>
  <div id="rainy_activity">
    <v-row class="ma-1">
      <v-col
        v-for="(activity, index) in activities"
        :key="index"
        class="d-flex child-flex activity"
        xs="6"
        sm="6"
      >
        <v-card flat tile hover class="d-flex" @click="openDialog(activity)">
          <v-img
            class="white--text align-end"
            :src="'/img/activity/indoor/' + activity.img + '.jpg'"
          >
            <v-card-title class="font-italic pb-0 pl-2 overline">{{
              activity.name
            }}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- ダイアログ -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title
            class="headline grey lighten-2 font-weight-light title"
            primary-title
            >{{ target_activity.name }}</v-card-title
          >
          <v-card-text class="pt-2">
            <p>{{ target_activity.description }}</p>
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
const EXIT_GAME = endpoint.AFL.EXIT_GAME;
const BOARDGAME_BAR = endpoint.AFL.BOARDGAME_BAR;
const POTTERY = endpoint.AFL.POTTERY;
const BOULDERING = endpoint.AFL.BOULDERING;
const CASINO_BAR = endpoint.AFL.CASINO_BAR;
const DESTRUCTION = endpoint.AFL.DESTRUCTION;

export default {
  data() {
    return {
      // ダイアログに表示するアクティビティ
      target_activity: "",
      dialog: false,
      activities: [
        {
          img: "exit_game",
          name: "脱出ゲーム",
          url: EXIT_GAME.url,
          src: EXIT_GAME.src,
          description:
            "脱出ゲームとは、部屋の中に仕込まれた謎を解き、部屋から脱出するアクティビティです",
        },
        {
          img: "boardgame_bar",
          name: "ボードゲームカフェ",
          url: BOARDGAME_BAR.url,
          src: BOARDGAME_BAR.src,
          description:
            "ボードゲームカフェとは、数百種類ものボードゲームを楽しむことができるカフェでｚ、困ったときは店員さんがおすすめを紹介してくれるため、初心者でも楽しむ事ができます。",
        },
        {
          img: "pottery",
          name: "陶芸体験",
          url: POTTERY.url,
          src: POTTERY.src,
          description:
            "陶芸体験では、粘土を整形し、オリジナルの造形物を作ることができます。",
        },
        {
          img: "bouldering",
          name: "ボルダリング",
          url: BOULDERING.url,
          src: BOULDERING.src,
          description:
            "ボルダリングとは、主に壁に埋め込まれたホールドを駆使して目的地点まで登り切るアクティビティです。",
        },
        {
          img: "casino_bar",
          name: "カジノバー",
          url: CASINO_BAR.url,
          src: CASINO_BAR.src,
          description:
            "カジノバーでは、遊び用のチップを用いてルーレットやポーカーなど、本物さながらのカジノゲームを楽しめることができます。",
        },
        {
          img: "destruction",
          name: "ものぶっ壊し体験",
          url: DESTRUCTION.url,
          src: DESTRUCTION.src,
          description:
            'ものぶっ壊し体験では、普段壊すことのできない"物を壊す"ことができます。',
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
  padding: 0px;
}
</style>