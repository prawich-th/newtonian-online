<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import ArticleCard from "$lib/ArticleCard.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<title>Home | The Newtonian</title>

<div class="home__wrapper">
  <div class="home">
    <section class="home__banner">
      <div class="home__banner--cover">
        <a href={`/articles/${data.main.id}`}>
          <img
            src={`https://apis.news.newton.ac.th/images${data.main.cover}`}
            alt={data.main.headline + "'s cover"}
          />
        </a>
      </div>
      <div class="home__banner--info">
        <span>
          <h1>{data.main.headline}</h1>
          <h5>
            By:{" "}
            {#each data.main.member as member, i}
              {i > 0 ? ", " : ""}
              <a href={`/members/${member.id}`}>{member.name}</a>
            {/each}
          </h5>
          <p>
            <SvelteMarkdown source={data.main.content.split(" ").slice(0, 50).join(" ")} isInline />
          </p>
        </span>

        <span class="home__banner--readmore">
          <a href={`/articles/${data.main.id}`}>Read More</a>
        </span>
      </div>
    </section>
    <section class="home__articles">
      <div class="home__articles--title">
        <h2>Articles</h2>
      </div>
      <div class="home__articles--list">
        {#each data.articles as e}
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
    </section>
  </div>
</div>
