<script>
  import { onDestroy, onMount } from "svelte";
  import { initSketch } from "./_sketch";

  let sketchEl;
  let sketchRef;

  onMount(() => {
    sketchRef = initSketch(sketchEl);
  });

  onDestroy(() => {
    sketchRef.remove();
  });
</script>

<div class="sketch" bind:this={sketchEl} />

<style>
  .sketch {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style>
