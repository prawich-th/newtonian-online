<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  // console.log(data.article.member);
</script>

<svelte:head>
  <title>{data.article.headline} | The Newtonian</title>
  <meta name="title" content={data.article.headline} />
  <meta name="image" content={data.article.cover} />
  <meta
    name="url"
    content={`https://news.newton.ac.th/articles/${data.article.id}`}
  />
  <meta name="author" content={data.article.member[0].name} />
  <meta property="og:image" content={data.article.cover} />
  <meta
    property="og:url"
    content={`https://news.newton.ac.th/articles/${data.article.id}`}
  />
  <meta property="og:author" content={data.article.member[0].name} />
  <meta property="dateCreated" content={data.article.publishingDate} />
  <meta property="datePublished" content={data.article.publishingDate} />
  <meta property="og:type" content="article" />
  <meta
    property="article:published_time"
    content={data.article.publishingDate}
  />
  <meta
    property="article:modified_time"
    content={data.article.publishingDate}
  />
  <meta property="article:author" content={data.article.member[0].name} />
  <meta property="og:site_name" content="The Newtonian" />
</svelte:head>

<div class="article">
  <div class="article__info">
    <div class="article__info--tags">
      <!-- {#each data.article.category as tag} -->
      <span style="background-color: #A20000">{data.article.category}</span>
      <!-- {/each} -->
    </div>
    <h1 class="article__info--title">{data.article.headline}</h1>

    <img
      class="article__info--banner"
      src={`${data.article.cover}`}
      alt="Cover"
    />
    <div class="article__info--authors">
      {#each data.article.member as author}
        <a href={`/members/${author.id}`}>
          <div class="article__info--authors--item">
            <img
              src={`${author.profile}`}
              alt={author.name}
              onerror={(event) => {
                // @ts-ignore
                event.target!.src = "/fallback-profile.png";
                console.error("Profile image not found");
                author.profile = "/fallback-profile.png";
              }}
            />

            <span>
              <h2>{author.name}</h2>
              {#if author.year <= 13}
                <p>
                  {author.nickname} | Year {author.year}

                  {#if author.year >= 10}
                    {author.track}
                  {/if}
                </p>
              {:else}
                <p>
                  {author.nickname} | Alumni / Supervisor
                </p>
              {/if}
            </span>
          </div>
        </a>
      {/each}
    </div>
    <p class="article__info--editor">
      Edited By
      <!-- {#each data.article.editors as editor}
        <a href={`/members/${editor.id}`}>{editor.name}</a>
      {/each} -->
      <em>The Newtonian</em>
    </p>
    <p class="article__info--date">
      Published: {new Date(data.article.publishingDate).toLocaleDateString(
        "en-UK",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )}
    </p>
  </div>
  <main class="article__content">
    <SvelteMarkdown source={data.article.content} />
  </main>
</div>
