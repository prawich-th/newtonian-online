<script lang="ts">
  let {
    title,
    id,
    author,
    date,
    cover,
    content,
    tags,
  }: {
    title: string;
    id: string;
    author: { name: string; id: string };
    date: string;
    cover: string;
    content?: string;
    tags: { name: string; color: string }[];
  } = $props();
</script>

<div class="article-item">
  <div>
    <a href=" /articles/{id}">
      <div class="article-item__image">
        <img src={cover} alt="Cover" />
        <div class="article-item__tags">
          {#each tags as tag}
            <span style="background-color: {tag.color}">{tag.name}</span>
          {/each}
        </div>
      </div>
    </a>
  </div>
  <h4 class="author">
    <a href="/members/{author.id}">
      {author.name}
    </a>
    | {new Date(date).toLocaleDateString("en-UK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </h4>
  <a href=" /articles/{id}">
    <h2>{title}</h2>
    {#if content}
      <p>{content.slice(0, 100)}...</p>
    {/if}
  </a>
</div>
