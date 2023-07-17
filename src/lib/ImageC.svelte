<script lang="ts">
  export let image: string;
  export let caption: string;
  export let notfound: "gone" | "img" = "img";

  let gone = false;
</script>

{#if gone}
  <div class="image-c" />
{:else}
  <div class="image-c">
    <img
      src={image}
      alt={caption}
      on:error={(e) => {
        if (notfound === "gone") {
          gone = true;
          return;
        }
        //@ts-ignore
        e.currentTarget.onerror = null;
        //@ts-ignore
        e.src = "/notfound.webp";
      }}
    />
    <p>{caption}</p>
  </div>
{/if}
