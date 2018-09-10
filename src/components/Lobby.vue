<template>
  <div>
    <button v-on:click="match">快速匹配</button>
    <!-- <button>与好友对战</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { play, Event } from "@leancloud/play";
import { CLIENT_ENGINE_SERVER } from "../configs";
import { listen } from "../utils";

@Component
export default class Lobby extends Vue {
  @Prop() private onLogin!: () => any;

  id = Date.now().toString();

  async match() {
    const { roomName } = await (await fetch(`${CLIENT_ENGINE_SERVER}/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerId: play.userId
      })
    })).json();
    return this.joinRoom(roomName);
  }

  joinRoom(roomName: string) {
    play.joinRoom(roomName);
    return listen(play, Event.ROOM_JOINED, Event.ROOM_JOIN_FAILED);
  }
}
</script>

<style>
</style>
