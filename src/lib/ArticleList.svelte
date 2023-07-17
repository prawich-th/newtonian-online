<script lang="ts">
  import ArticleCard from "./ArticleCard.svelte";

  export let title: string;
  export let error: string = "We do not have any published article(s) related to this topic yet.";
  export let articles: {
    id: string;
    cover: string;
    headline: string;
    content: string;
    member: [{ name: string; id: string }];
    publishingDate: string;
    // categories: string;
  }[];
</script>

<section class="home__articles">
  <div class="home__articles--title">
    <h2>{title}</h2>
  </div>
  {#if articles.length === 0}
    <div class="home__articles--no">
      <p>{error}</p>
    </div>
  {:else}
    <div class="home__articles--list">
      {#each articles as e}
        <ArticleCard
          id={e.id}
          cover={e.cover}
          headline={e.headline}
          text={e.content}
          member={e.member}
          publishingDate={e.publishingDate}
        />
      {/each}
    </div>
  {/if}
</section>
