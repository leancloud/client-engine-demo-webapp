<template>
  <form id="login" v-on:submit.prevent="login">
    <details>
      <summary>Configs</summary>
      <label>APP_ID:
        <input type="text" v-model="configs.appId" required/>
      </label><br/>
      <label>APP_KEY:
        <input type="text" v-model="configs.appKey" required/>
      </label><br/>
      <label>Client Engine Server:
        <input type="text" v-model="configs.clientEngineServer" required/>
      </label><br/>
    </details><br/>
    <label>ID:
      <input type="text" v-model="id" required placeholder="[A-Za-z0-9_]{1,36}"/>
    </label><br/>
    <button type="submit">Login to Play</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Client, Event } from "@leancloud/play";
import { errorHandler, listen } from "../utils";
import { configs } from "../configs";

@Component
export default class Login extends Vue {
  id = Date.now().toString();
  configs = configs;

  @Prop() private onLogin!: (client: Client) => any;

  login() {
    const client = new Client({
      appId: configs.appId,
      appKey: configs.appKey,
      userId: this.id
    });

    client
      .connect()
      .then(() => this.onLogin(client))
      .catch(errorHandler);
  }
}
</script>

<style>
</style>
