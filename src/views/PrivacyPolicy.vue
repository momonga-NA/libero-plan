<template>
<div class="information">
  <v-app>
    <C_Bar/>
    <v-container class="pl-0 pr-0">
      <v-container>
        <v-card class="mx-auto" max-width="600">
          <v-card-text class="py-5　pb-5">
            <h2>プライバシーポリシー</h2>
            <br />
            <p>libero-tokyo（以下、「当サイト」とします。）におけるプライバシーポリシーは、下記の通りです。</p>
            <br />
            <h3>広告について</h3>
            <br />
            <p>当サイトでは、第三者配信の広告サービス（A8.net、もしもアフィリエイト）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。</p>
            <p>クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。</p>
            <p>Cookieを無効にする方法やGoogleアドセンスに関する詳細は<a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank">「広告 – ポリシーと規約 – Google」</a>をご確認ください。</p>
            <br />
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