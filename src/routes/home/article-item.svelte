<script lang="ts">
  let {
    title,
    author,
    date,
    cover,
    content,
  }: {
    title: string;
    author: { name: string; id: string };
    date: string;
    cover: string;
    content?: string;
  } = $props();
</script>

<div class="article-item">
  <img src={cover} alt="Cover" />
  <h4 class="author">
    <a href="/members/{author.id}">{author.name}</a> | {new Date(
      date
    ).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </h4>
  <h2>{title}</h2>
  {#if content}
    <p>{content.slice(0, 100)}...</p>
  {/if}
</div>
