<template>
<div id="trip_plan">
  <v-app>
    <C_Bar/>
    <v-card class="mx-auto" width="400">
        <v-card light flat>
          <v-container>
            <v-layout align-center>
              <v-layout column justify-end>
                <div class="title font-weight-light">{{ title }}</div>
                <div>おすすめ季節：{{ season }}</div>
                <div class="font-weight-light">
                  <span class="pr-5">平均予算：{{ cost }}円</span>
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
            <v-timeline-item v-for="(spot,index) in spots" :key="index" :color="dot_colors[index]" small>
              <v-layout pt-0>
                <v-flex xs4>
                  <strong class="time">{{ spot.time_from }}-{{ spot.time_to }}</strong>
                </v-flex>
                <v-flex pl-2>
                  <strong>{{ spot.name }}</strong>
                </v-flex>
              </v-layout>
              <v-layout>
                <img v-if="spot.img_src != null" :src="spot.img_src" width="250" height="166">
              </v-layout>
              <v-layout>
                <pre class="overline pt-1">{{ spot.caption }}</pre>
              </v-layout>
              <v-btn class="pl-0" v-if="spot.address || spot.url || spot.description" text small @click.stop="display_mdoal(spot)">> スポット詳細</v-btn>
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

          <v-container d-flex flex-row-reverse class="pt-0">
            <v-btn text color="grey" @click="backToPlanning()">> 作成画面に戻る</v-btn>
          </v-container>

        </v-card-text>
      </v-card>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">スポット詳細</v-card-title>
        <v-card-text>
          <v-list-item class="pl-0">
            <v-list-item-content>
              <v-list-item-title>住所</v-list-item-title>
               <v-list-item-subtitle id="address">{{ md_address }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pl-0">
            <v-list-item-content>
              <v-list-item-title>URL</v-list-item-title>
               <v-list-item-subtitle><a :href="md_url" target="_blank" >{{ md_url }}</a></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>                
          <v-list-item class="pl-0">
            <v-list-item-content class="pb-0">
              <v-list-item-title>備考</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
            <pre class="caption">{{ md_description }}</pre> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</div>
</template>
<script>
import C_Bar from "@/components/C_Bar"
import C_Bottom_Nav from "@/components/C_Bottom_Nav"
import C_Btn_BackToTop from '@/components/C_Btn_BackToTop'

const DOT_COLORS = ["orange darken-2","purple","orange darken-2","purple","orange darken-2"];

export default {
  components:{
    C_Bar,
    C_Bottom_Nav,
    C_Btn_BackToTop
  },
  data () {
    return {
      dot_colors: DOT_COLORS,
      start : '',
      goal : '',
      title : '',
      season : '',
      cost : '',
      summery : '',
      spots : [],
      dialog : false,
      md_address : '',
      md_url : '',
      md_description : ''
    }
  },
  // ページ読込時にデータ取得
  created() {
    if(this.$store.getters['getPlanning']){
      var planning =  this.$store.getters['getPlanning']
      this.start   = planning.start;
      this.goal    = planning.goal;
      this.title   = planning.thumbnail.title;
      this.season  = planning.thumbnail.season;
      this.cost    = planning.thumbnail.cost;
      this.summery = planning.thumbnail.summery;
      if(planning.spots[0] != null && planning.spots[0] != "") this.spots.push(planning.spots[0]);
      if(planning.spots[1] != null && planning.spots[1] != "") this.spots.push(planning.spots[1]);
      if(planning.spots[2] != null && planning.spots[2] != "") this.spots.push(planning.spots[2]);
      if(planning.spots[3] != null && planning.spots[3] != "") this.spots.push(planning.spots[3]);
      if(planning.spots[4] != null && planning.spots[4] != "") this.spots.push(planning.spots[4]);
    }
  },
  methods : {
    display_mdoal(spot){
      this.md_address = spot.address;
      this.md_url = spot.url;
      this.md_description = spot.description;
      this.dialog = true;
    },
    backToPlanning(){
      this.$router.push({ path: '/planning'})
    }
  }
}
</script>
<style scoped>
.time{
  font-size: 10px;
}
.test{
    color:lightcoral
}
pre {
	white-space: pre-wrap ;
}
</style>