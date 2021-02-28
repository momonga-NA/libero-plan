<template>
<div class="information">
  <v-app>
    <C_Bar/>
    <v-container class="pl-0 pr-0">
      <v-container>
        <v-card class="mx-auto" max-width="400">
          <v-card-text class="px-5 py-5">
            <div><v-icon small color="orange">mdi-cursor-pointer</v-icon><span class="font-weight-bold">サイト情報</span></div>
            <p class="text--primary px-3 pt-2">このサイトは関東周辺の日帰り旅行とその関連情報を提供するサイトです。</p>
            <p class="text--primary px-3">自由に参考にしていただければと思いますが、以下同意のうえご利用ください。</p>
            <div class="px-3 py-5">
              <router-link to="/information/disclaimer">>免責事項</router-link><br />
              <router-link to="/information/privacy_policy">>プライバシーポリシー</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-container>
    <C_Bottom_Nav/>
  </v-app>
</div>
</template>
<script>
import C_Bar from "@/components/C_Bar"
import C_Bottom_Nav from "@/components/C_Bottom_Nav"

export default {
  components: {
    C_Bar,
    C_Bottom_Nav
  }
}
</script>