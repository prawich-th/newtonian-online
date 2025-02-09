<script lang="ts">
  import ArticleItem from "./article-item.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // console.log(data.articles.main);

  let interesting = data.articles.articles.splice(0, 2);
  let featured = data.articles.articles;
  // console.log(interesting);
</script>

<title>The Newtonian</title>

<div class="home">
  <div class="home__banner">
    <a href={`/articles/${data.articles.main.id}`}>
      <div class="home__main">
        <img src={`${data.articles.main.cover}`} alt="The Newtonian Online" />
        <div class="home__main--info">
          <div class="home__main--tags">
            <span style="background-color: #001a53"
              >{data.articles.main.category}</span
            >
          </div>
          <p class="author">
            {#each data.articles.main.member as m}
              {m.name}{/each} | {new Date(
              data.articles.main.publishingDate
            ).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1>{data.articles.main.headline}</h1>
        </div>
      </div>
    </a>
    <div class="home__other">
      {#each interesting as i}
        <a href={`/articles/${i.id}`}>
          <div class="home__other--item">
            <img src={`${i.cover}`} alt="The Newtonian Online" />
            <div class="home__other--item--info">
              <div class="home__other--item--tags">
                <span style="background-color: #001a53">{i.category}</span>
              </div>
              <p class="author">
                {#each i.member as m}
                  {m.name}{/each} | {new Date(
                  data.articles.main.publishingDate
                ).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1>{i.headline}</h1>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <div class="home__articles">
    <h2>Featuring</h2>

    <div class="home__articles--list">
      {#each featured as f}
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
</div>
