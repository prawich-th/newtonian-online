<script lang="ts">
  import { enhance } from "$app/forms";
  import ArticleItem from "../../article-item.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // console.log(data);

  let status = $state(false);
</script>

<div class="member">
  <div class="member__banner">
    <div class="member__banner--image">
      <img
        src={`${data.profile}`}
        alt={`Profile Picture of ${data.name}`}
        onerror={(e) => {
          // @ts-ignore
          e.target.src = "/fallback-member.webp";
        }}
      />
    </div>

    <div class="member__banner--info">
      <span>
        <h2>{data.role}</h2>
        <h1>
          <span class="first">{data.name.split(" ")[0]}</span> <br />
          <span class="last">{data.name.split(" ")[1]}</span>
        </h1>
        <h3>
          "{data.nickname}" Year {data.year}
          {data.track}
        </h3>
      </span>
      <p>{data.bio}</p>
    </div>
    <div class="member__actions">
      <form
        action="?/subscribe"
        method="post"
        use:enhance
        onsubmit={() => {
          status = !status;
        }}
      >
        <input type="hidden" name="subscribed" value={status} />
        <input type="hidden" name="id" value={data.id} />
        <button class="member__actions--{status ? 'subscribed' : 'subscribe'}">
          {status ? "Subscribed" : "Subscribe"}
        </button>
      </form>
    </div>
  </div>

  <div class="member__articles">
    <h2>Associated Works</h2>
    <div class="member__articles--list">
      {#each data.articles as article}
        <ArticleItem
          author={{ name: article.member[0].name, id: article.member[0].name }}
          id={article.id}
          title={article.headline}
          date={article.publishingDate}
          cover={article.cover}
          tags={[{ name: article.category, color: " #001a53" }]}
        />
      {/each}
    </div>
  </div>
</div>
