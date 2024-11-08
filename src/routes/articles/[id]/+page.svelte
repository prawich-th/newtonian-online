<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.article.title} | The Newtonian</title>
  <meta name="title" content={data.article.title} />
  <meta name="image" content={data.article.cover} />
  <meta
    name="url"
    content={`https://news.newton.ac.th/articles/${data.article.id}`}
  />
  <meta name="author" content={data.article.authors[0].name} />
  <meta property="og:image" content={data.article.cover} />
  <meta
    property="og:url"
    content={`https://news.newton.ac.th/articles/${data.article.id}`}
  />
  <meta property="og:author" content="Sakulya Kovitkoolkri" />
  <meta property="dateCreated" content="2024-06-22" />
  <meta property="datePublished" content="2024-06-22" />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="2024-06-22" />
  <meta property="article:modified_time" content="2024-06-22" />
  <meta property="article:author" content="Sakulya Kovitkoolkri" />
  <meta property="og:site_name" content="The Newtonian" />
</svelte:head>

<div class="article">
  <div class="article__info">
    <h1 class="article__info--title">{data.article.title}</h1>

    <img class="article__info--banner" src={data.article.cover} alt="Cover" />
    <div class="article__info--authors">
      {#each data.article.authors as author}
        <a href={`/members/${author.id}`}>
          <div class="article__info--authors--item">
            <img src={author.profile} alt={author.name} />
            <span>
              <h2>{author.name}</h2>
              <p>
                {author.nickname} | Year {author.year}
                {author.track}
              </p>
            </span>
          </div>
        </a>
      {/each}
    </div>
    <p class="article__info--editor">
      Edited By
      {#each data.article.editors as editor}
        <a href={`/members/${editor.id}`}>{editor.name}</a>
      {/each}
    </p>
    <p class="article__info--date">Published: 22nd June 2024, 15:20</p>
  </div>
  <main class="article__content">
    <SvelteMarkdown source={data.article.content} />
  </main>
</div>
