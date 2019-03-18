<template>
  <div>
    <button v-on:click="match">快速开始</button>
    <button v-on:click="create">创建新游戏</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Event, Client } from "@leancloud/play";
import { configs } from "../configs";
import { errorHandler, listen } from "../utils";

@Component
export default class Lobby extends Vue {
  @Prop() private client!: Client;
  @Prop() private onRoomJoined!: () => any;

  id = Date.now().toString();

  async match() {
    const { roomName } = await (await fetch(
      `${configs.clientEngineServer}/reservation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          playerId: this.client.userId
        })
      }
    )).json();
    return this.joinRoom(roomName)
      .then(() => this.onRoomJoined())
      .catch(errorHandler);
  }

  async create() {
    const { roomName } = await (await fetch(
      `${configs.clientEngineServer}/game`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          playerId: this.client.userId
        })
      }
    )).json();
    return this.joinRoom(roomName)
      .then(() => this.onRoomJoined())
      .catch(errorHandler);
  }

  joinRoom(roomName: string) {
    return this.client.joinRoom(roomName);
  }
}
</script>

<style>
</style>
