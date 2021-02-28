<template>
  <div id="planning">
    <C_Loading v-show="loading" />
    <v-app v-show="!loading">
      <C_Bar />
      <v-form v-model="valid" enctype="multipart/form-data">
        <!-- サムネイル部分 -->
        <v-card class="mx-auto" width="500">
          <v-container class="my-3 pb-7 pt-0 px-4 grey lighten-5">
            <v-container d-flex flex-row-reverse class="pb-0 px-0">
              <v-btn
                text
                color="orange darken-2"
                @click="display_question_dialog()"
                ><v-icon>mdi-comment-question</v-icon></v-btn
              >
            </v-container>
            <v-row>
              <v-col cols="12" class="pt-0 pb-0">
                <v-text-field
                  class="pt-0"
                  v-model="input.thumbnail.title"
                  :rules="titleRules"
                  :counter="15"
                  label="タイトル"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pt-0">
                <v-select
                  v-model="input.thumbnail.season"
                  :items="seasons"
                  :rules="seasonRules"
                  label="季節"
                  required
                ></v-select>
              </v-col>
              <v-col cols="4" class="pt-0">
                <v-select
                  v-model="input.thumbnail.pref"
                  :items="prefs"
                  :rules="seasonRules"
                  label="都道府県"
                  required
                ></v-select>
              </v-col>
              <v-col cols="5" class="pt-0">
                <v-text-field
                  v-model="input.thumbnail.cost"
                  :rules="costRules"
                  :counter="5"
                  type="number"
                  label="予算(円)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12 pt-0 pb-2">
                <div class="text-center">
                  <v-img
                    v-if="input.thumbnail.src"
                    :src="input.thumbnail.src"
                    width="240"
                    height="160"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pt-0">
                <div class="text-center">
                  <div class="uploadButton caption">
                    <v-icon dark small class="pr-1">mdi-camera</v-icon>
                    サムネイルを選択
                    <input
                      type="file"
                      ref="thumbnail_input"
                      class="pt-0"
                      @change="resize('thumbnail', $event)"
                    />
                  </div>
                </div>
              </v-col>
              <v-col cols="3" class="pt-1 pl-0">
                <v-icon color="grey" @click="reset('thumbnail')"
                  >mdi-close-circle</v-icon
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 pb-0">
                <v-textarea
                  v-model="input.thumbnail.summery"
                  :rules="summeryRules"
                  :counter="0"
                  label="概要"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="pl-0">
            <!-- スポット部分 -->
            <v-timeline align-top dense mx-auto class="mr-3 pt-0">
              <!-- Start -->
              <v-timeline-item color="pink accent-2" small>
                <v-layout pt-0>
                  <v-row>
                    <v-col cols="6" class="pt-0">
                      <v-text-field
                        v-model="input.start"
                        label="東京出発"
                        :rules="timeRules"
                        type="time"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-layout>
              </v-timeline-item>
              <!-- Spot -->
              <v-slide-x-transition group>
                <v-timeline-item
                  v-for="(spot, index) in input.spots"
                  :key="index"
                  class="mb-12"
                  :color="colors[index]"
                  small
                >
                  <div class="grey lighten-5">
                    <v-chip
                      small
                      class="ma-2"
                      color="blue-grey"
                      label
                      text-color="white"
                      ><v-icon left>mdi-car-hatchback</v-icon>Spot{{
                        index + 1
                      }}</v-chip
                    >
                    <v-row class="px-2">
                      <v-col cols="6" class="pb-0">
                        <v-text-field
                          v-model="spot.time_from"
                          :rules="timeRules"
                          type="time"
                          label="到着時間"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="pl-0 pb-0">
                        <v-text-field
                          v-model="spot.time_to"
                          :rules="timeRules"
                          type="time"
                          label="出発時間"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="px-2 py-2">
                      <v-col cols="12" class="pt-0 pb-0">
                        <v-text-field
                          dense
                          v-model="spot.name"
                          label="観光スポット名"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12 pt-0 pb-2">
                        <div class="text-center">
                          <v-img
                            v-if="input.spots[index].img_src"
                            :src="input.spots[index].img_src"
                            width="240"
                            height="160"
                          />
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="px-2">
                      <v-col cols="9" class="pt-0 pb-5">
                        <div class="uploadButton caption">
                          <v-icon dark small class="pr-3">mdi-camera</v-icon
                          >画像を選択
                          <input
                            type="file"
                            ref="spot_input"
                            class="pt-0"
                            @change="resize(index, $event)"
                          />
                        </div>
                      </v-col>
                      <v-col cols="3" class="pt-1 pl-0">
                        <v-icon color="grey" @click="reset(index)"
                          >mdi-close-circle</v-icon
                        >
                      </v-col>
                    </v-row>
                    <v-row class="px-2 py-2">
                      <v-col cols="12" class="pt-0 pb-0">
                        <v-textarea
                          class="pt-0 mt-0"
                          v-model="spot.caption"
                          :rules="captionRules"
                          :counter="200"
                          label="観光スポット説明"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row class="px-2 py-2">
                      <v-btn
                        text
                        x-small
                        class="pl-3"
                        @click.stop="display_spot_dialog(index)"
                        ><v-icon>mdi-pen-plus</v-icon>詳細</v-btn
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        x-small
                        class="pr-0 pr-3"
                        @click="addSpot(index)"
                        ><v-icon>mdi-plus</v-icon></v-btn
                      >
                      <v-btn
                        text
                        x-small
                        class="pl-0 pr-3"
                        @click="deleteSpot(index)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      >
                    </v-row>
                  </div>
                </v-timeline-item>
              </v-slide-x-transition>
              <!-- Goal -->
              <v-timeline-item class="pb-0" color="pink accent-2" small>
                <v-layout pt-0>
                  <v-row>
                    <v-col cols="6" class="pt-0">
                      <v-text-field
                        v-model="input.goal"
                        label="東京到着"
                        :rules="timeRules"
                        type="time"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-container>
          <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
              <div class="text-center pb-2">
                <v-btn
                  class="ma-2"
                  outlined
                  color="orange darken-2"
                  :disabled="!valid"
                  v-on="on"
                  ><v-icon class="pr-1" dense>mdi-send</v-icon>旅程を投稿</v-btn
                >
              </div>
            </template>
            <v-sheet class="text-center" height="150px">
              <div class="py-3 pb-0 caption">
                Web上に公開されます、個人情報の記載はありませんか？
              </div>
              <div class="py-3 pt-0 pb-6 caption">
                公開されたプランは削除できません、間違いはないですか？
              </div>
              <v-btn
                class="mt-2"
                outlined
                color="orange darken-2"
                @click="previewPlan()"
                ><v-icon class="pr-1" dense>mdi-file-find</v-icon
                >プレビュー</v-btn
              >
              <v-btn
                class="mt-2 ml-5"
                outlined
                color="orange darken-2"
                @click="registerTripPlan()"
                ><v-icon class="pr-1" dense>mdi-send</v-icon>投稿する</v-btn
              >
            </v-sheet>
          </v-bottom-sheet>
          <div class="text-center pb-2 caption" :visibility="valid">
            <span>必須項目を満たすと押せるようになります</span>
          </div>
        </v-card>
        <!-- spot-dialog -->
        <v-dialog v-model="spot_dialog" max-width="350">
          <v-card>
            <v-card-title class="title">スポット詳細</v-card-title>
            <v-card-text class="pb-0">
              <v-list-item class="pl-0">
                <v-list-item-content class="pt-0 pb-0">
                  <v-list-item-title
                    ><v-icon color="pink accent-2">mdi-map-marker</v-icon
                    >住所</v-list-item-title
                  >
                  <v-list-item-subtitle id="address">
                    <v-text-field
                      :rules="addressRules"
                      class="pt-0"
                      v-model="input.spots[arr_no].address"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="pl-0">
                <v-list-item-content class="pt-0 pb-0">
                  <v-list-item-title
                    ><v-icon color="orange darken-2">mdi-link-variant</v-icon
                    >URL</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <v-text-field
                      class="pt-0"
                      :rules="urlRules"
                      v-model="input.spots[arr_no].url"
                    ></v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="pl-0">
                <v-list-item-content class="pt-1 pb-0">
                  <v-list-item-title
                    ><v-icon color="purple">mdi-information-variant</v-icon
                    >備考(料金や注意事項)</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <v-textarea
                      :rules="descriptionRules"
                      class="pt-0"
                      outlined
                      v-model="input.spots[arr_no].description"
                    ></v-textarea>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn color="purple" text @click="spot_dialog = false"
                >戻る</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <v-container d-flex flex-row-reverse>
        <C_Bottom_Nav />
      </v-container>

      <!-- question-dialog -->
      <v-dialog v-model="qustion_dialog" max-width="350">
        <v-card>
          <v-card-title class="title">説明</v-card-title>
          <v-card-text class="pb-0">
            <p class="mb-0 caption">
              作成にご協力いただきありがとうございます。
            </p>
            <p class="mb-0 caption">
              このページはモデルプランを投稿するページです。作成されたプランはホーム画面や検索画面にて表示されますので、個人情報の記載には注意してください。
            </p>
            <p class="mb-0 caption">
              モデルプランを投稿するためには以下必須項目の入力が必要です。
            </p>
            <p class="px-1 pt-3 caption">
              タイトル/季節/都道府県/予算/概要/観光スポット名/各種時間
            </p>
            <p class="px-1 pt-3 caption">
              <v-icon class="pr-1" dense color="yellow darken-3"
                >mdi-alert</v-icon
              >アップロードされた画像は250px-166pxで保存するため、このサイズより小さい場合は画像がぼやける可能性があります。なるべく大きな画像をアップロードされるよう、ご協力お願いいたします。
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="purple" text @click="qustion_dialog = false"
              >戻る</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- SnackBar -->
      <v-snackbar v-model="error_bar" top :timeout="2000" color="gray">
        <span>{{ error_msg }}</span>
      </v-snackbar>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import C_Loading from "@/components/C_Loading";
import C_Bar from "@/components/C_Bar";
import C_Bottom_Nav from "@/components/C_Bottom_Nav";
import endpoint from "@/config/endpoint";

const SPOT_RG = endpoint.API.SPOT_PUT;
const THUMBNAIL_RG = endpoint.API.THUMBNAIL_PUT;
const PICTURE_RG = endpoint.API.PICTURE_PUT;

// バリデーションで利用する正規表現
const REG_NUMBER = new RegExp("^[1-9]{1}[0-9]{0,6}$");
const REG_URL = new RegExp("http(s)?://");
// 最大スポット数
const MAX_SPOTS = 5;

export default {
  components: {
    C_Loading,
    C_Bar,
    C_Bottom_Nav,
  },
  data: () => ({
    loading: false,
    // 定数
    seasons: ["春", "夏", "秋", "冬"],
    prefs: [
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
    ],
    colors: [
      "orange darken-2",
      "purple",
      "orange darken-2",
      "purple",
      "orange darken-2",
    ],
    // バリデーション
    valid: false,
    titleRules: [
      (v) => !!v || "入力してください",
      (v) => v.length <= 15 || "タイトルは15文字までです",
    ],
    seasonRules: [(v) => !!v || "選択してください"],
    costRules: [
      (v) => !!v || "入力してください",
      (v) => REG_NUMBER.test(v) || "5桁以内の整数を入力してください",
    ],
    summeryRules: [(v) => v.length <= 200 || "概要欄は200文字までです"],
    nameRules: [(v) => !!v || "入力してください"],
    timeRules: [(v) => !!v || "入力してください"],
    captionRules: [(v) => v.length <= 200 || "説明欄は200文字までです"],
    addressRules: [(v) => v.length <= 35 || "住所は35文字までです"],
    urlRules: [
      (v) => REG_URL.test(v) || v.length <= 0 || "URL形式が不正です",
      (v) => v.length <= 100 || "URLは100文字までです",
    ],
    descriptionRules: [(v) => v.length <= 200 || "備考欄は200文字までです"],
    // 処理データ
    arr_no: 0,
    qustion_dialog: false,
    spot_dialog: false,
    error_bar: false,
    error_msg: "",
    plan_id: "",
    sheet: false,
    // 登録データ
    input: {
      start: "",
      goal: "",
      thumbnail: {
        title: "",
        season: "",
        pref: "",
        cost: "",
        src: null,
        summery: "",
        create: "",
      },
      spots: [
        {
          spot_id: "",
          name: "",
          img_src: null,
          time_from: "",
          time_to: "",
          caption: "",
          address: "",
          url: "",
          description: "",
        },
      ],
    },
  }),
  created() {
    // プラン全体のIDを設定
    this.plan_id = this.generateRamdomId(8);
    // プレビュー対応
    if (this.$store.getters["getPlanning"]) {
      this.input = this.$store.getters["getPlanning"];
    }
  },
  computed: {
    timeline() {
      return this.input.spots.slice().reverse();
    },
  },
  methods: {
    generateRamdomId(length) {
      // 生成する文字列に含める文字セット
      var c = "abcdefghijklmnopqrstuvwxyz0123456789";
      var cl = c.length;
      var r = "";
      for (var i = 0; i < length; i++) {
        r += c[Math.floor(Math.random() * cl)];
      }
      return r;
    },
    checkExtension(value) {
      const file_regex1 = new RegExp(".jp(e)?g$");
      const file_regex2 = new RegExp(".JP(E)?G$");
      const file_regex3 = new RegExp(".png$");
      const file_regex4 = new RegExp(".PNG$");
      var file_regex1_result = file_regex1.test(value);
      var file_regex2_result = file_regex2.test(value);
      var file_regex3_result = file_regex3.test(value);
      var file_regex4_result = file_regex4.test(value);
      return (
        file_regex1_result ||
        file_regex2_result ||
        file_regex3_result ||
        file_regex4_result
      );
    },
    resize(index, e) {
      var file = e.target.files[0];
      this.file = file;

      if (file === undefined) {
        return;
      }

      if ("thumbnail" === index) {
        if (!this.checkExtension(this.$refs.thumbnail_input.value)) {
          this.$refs.thumbnail_input.value = null;
          this.error_msg = "画像は.png/.jpg/.jpegのみ有効です";
          this.error_bar = true;
          return;
        }
      } else {
        if (!this.checkExtension(this.$refs.spot_input[index].value)) {
          this.$refs.spot_input[index].value = null;
          this.error_msg = "画像は.png/.jpg/.jpegのみ有効です";
          this.error_bar = true;
          return;
        }
      }

      const image = new Image();
      const reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        image.src = e.target.result;
        image.onload = function () {
          if (index === "thumbnail") {
            vm.input.thumbnail.src =
              this.width < 250 ? this.src : vm.makeImage(image);
          } else {
            vm.input.spots[index].img_src =
              this.width < 250 ? this.src : vm.makeImage(image);
          }
        };
      };
      reader.readAsDataURL(file);
    },
    makeImage(image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 250;
      canvas.height = 166;
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      return canvas.toDataURL("image/jpeg");
    },
    reset(index) {
      if (index == "thumbnail") {
        this.input.thumbnail.src = null;
      } else {
        this.input.spots[index].img_src = null;
      }
    },
    // パラメータのバリデーション
    validate() {
      this.$refs.form.validate();
    },
    addSpot(index) {
      if (MAX_SPOTS === this.input.spots.length) {
        this.error_msg = "スポットは5つまで登録できます";
        this.error_bar = true;
        return;
      }
      this.input.spots.splice(index + 1, 0, {
        spot_id: "",
        name: "",
        img_src: null,
        time_from: "",
        time_to: "",
        caption: "",
        address: "",
        url: "",
        description: "",
      });
    },
    deleteSpot(index) {
      if (this.input.spots.length === 1) {
        this.error_msg = "スポットは1つ以上登録が必要です";
        this.error_bar = true;
        return;
      }
      this.input.spots.splice(index, 1);
    },
    display_question_dialog() {
      this.qustion_dialog = true;
    },
    display_spot_dialog(index) {
      this.arr_no = index;
      this.spot_dialog = true;
    },
    registerTripPlan() {
      this.convertSeason();
      this.upoloadPictures();
      this.putSpotData();
      this.putThumbnail();
    },
    convertSeason() {
      if ("春" === this.input.thumbnail.season) this.input.thumbnail.season = 1;
      if ("夏" === this.input.thumbnail.season) this.input.thumbnail.season = 2;
      if ("秋" === this.input.thumbnail.season) this.input.thumbnail.season = 3;
      if ("冬" === this.input.thumbnail.season) this.input.thumbnail.season = 4;
    },
    // サムネイルを登録
    async putThumbnail() {
      this.input.thumbnail.src == null
        ? (this.input.thumbnail.src = "dummy")
        : (this.input.thumbnail.src = this.plan_id);
      // 登録用データ
      var data = {
        id: this.plan_id,
        src: this.input.thumbnail.src,
        cost: this.input.thumbnail.cost,
        pref: this.input.thumbnail.pref,
        season: this.input.thumbnail.season,
        title: this.input.thumbnail.title,
      };
      await axios.post(THUMBNAIL_RG, data).then(() => {
        this.input.thumbnail.id = this.plan_id;
        var dt = new Date();
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        this.input.thumbnail.create = y + m + d;
        this.$store.dispatch("addThumbnail", this.input.thumbnail);
        this.$store.dispatch("clearPlanning");
        this.$router.push({ path: `/trip_plan/${this.plan_id}` });
      });
    },
    // スポットデータを登録
    putSpotData() {
      // 登録用に更新
      for (var i = 0; i < this.input.spots.length; i++) {
        this.input.spots[i].spot_id = i + 1;
        if (this.input.spots[i].img_src != null)
          this.input.spots[i].img_sq = this.plan_id + "_" + (i + 1);
        this.input.spots[i].img_src = null;
      }
      // 登録用データ
      var data = {
        id: this.plan_id,
        start: this.input.start,
        goal: this.input.goal,
        title: this.input.thumbnail.title,
        season: this.input.thumbnail.season,
        cost: this.input.thumbnail.cost,
        pref: this.input.thumbnail.pref,
        summery: this.input.thumbnail.summery,
        spot1: this.input.spots[0] != null ? this.input.spots[0] : "",
        spot2: this.input.spots[1] != null ? this.input.spots[1] : "",
        spot3: this.input.spots[2] != null ? this.input.spots[2] : "",
        spot4: this.input.spots[3] != null ? this.input.spots[3] : "",
        spot5: this.input.spots[4] != null ? this.input.spots[4] : "",
      };
      axios.post(SPOT_RG, data);
    },
    // 画像登録
    upoloadPictures() {
      // サムネイル登録
      axios.post(PICTURE_RG, {
        headers: {
          "content-type": "image/jpeg",
        },
        path: "img/thumbnail",
        files: [
          {
            filename: "thumbnail_" + this.plan_id,
            body: this.input.thumbnail.src,
          },
        ],
      });
      // スポット登録
      var files = [];
      for (var i = 0; i < this.input.spots.length; i++) {
        if (this.input.spots[i].img_src == null) {
          continue;
        }
        files.push({
          filename: this.plan_id + "_" + (i + 1),
          body: this.input.spots[i].img_src,
        });
      }
      axios.post(PICTURE_RG, {
        headers: {
          "content-type": "image/jpeg",
        },
        path: "img/spot",
        files,
      });
    },
    previewPlan() {
      this.$store.dispatch("setPlanning", this.input);
      this.$router.push({ path: "/planning/preview" });
    },
  },
};
</script>
<style scoped>
.uploadButton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: black;
  color: #fff;
  text-align: center;
  padding: 7px;
  line-height: 10px;
  width: 150px;
  height: 30px;
  cursor: pointer;
}
.uploadButton input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.uploadValue {
  display: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 3px;
  color: #ffffff;
}
</style>