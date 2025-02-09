<script lang="ts">
  import ArticleItem from "../article-item.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="articles">
  <h1>All <em style="text-transform: capitalize;">{data.category}</em></h1>

  <div class="articles__list">
    {#each data.articles as f}
      <ArticleItem
        title={f.headline}
        author={f.member[0]}
        date={f.publishingDate}
        cover={f.cover}
        id={f.id}
        tags={[{ name: f.category, color: "#001a53" }]}
      />
    {/each}
  </div>
</div>
