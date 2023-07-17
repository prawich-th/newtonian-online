<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  export let cover: string;
  export let text: string;
  export let headline: string;
  export let member: { name: string; id: string }[];
  export let publishingDate: string;
  export let id: string;
</script>

<div class="article-card">
  <span>
    <div class="article-card__image">
      <a href={`/articles/${id}`}>
        <img
          src={`https://apis.news.newton.ac.th/images/${cover}`}
          alt={`Preview Image of the article ${headline}`}
        />
      </a>
    </div>
    <div class="article-card__info">
      <div class="article-card__info--content">
        <h4>{headline}</h4>
        <p>
          <SvelteMarkdown source={text.split(" ").slice(0, 18).join(" ") + "..."} isInline />
        </p>
      </div>
    </div>
  </span>
  <!-- <div class="article-card__author" style={{ display: "inline-flex", alignItems: "flex-end" }}> -->
  <div class="article-card__author" style="display: inline-flex; align-items: flex-end;">
    <h5>
      {#each member as member, i}
        {i > 0 ? ", " : ""}
        <a href={`/members/${member.id}`}>{member.name}</a>
      {/each}
      {" - "}
      {new Date(publishingDate).toLocaleString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </h5>
  </div>
</div>
