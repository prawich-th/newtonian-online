<script lang="ts">
  import ImageC from "$lib/ImageC.svelte";
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;

  $: console.log(data);
</script>

<title>{data.headline} | The Newtonian</title>

{#if !data}
  <h1>Loading</h1>
{:else}
  <div class="article">
    <div class="article__wrapper">
      <div class="article__heading">
        <h2>{data.headline}</h2>
        <h3>
          {#each data.member as member, i}
            <span>
              {i > 0 ? ", " : " "}
              <a href={`/members/${member.id}`}>{member.name}</a>
            </span>
          {/each}
          {" - "}
          {new Date(data.publishingDate).toLocaleDateString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" - "}
          {Math.round(data.content.split(" ").length / 300)} min. read
        </h3>
        <ImageC
          image="https://apis.news.newton.ac.th/images{data.cover}"
          caption={`Preview Image of the article ${data.headline}`}
          notfound="gone"
        />
      </div>
      <div class="article__content">
        <SvelteMarkdown source={data.content} />
      </div>
    </div>
  </div>
{/if}
