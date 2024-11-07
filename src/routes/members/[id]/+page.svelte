<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let status = $state(data.member.subscribed);
</script>

<div class="member">
  <div class="member__banner">
    <div class="member__banner--image">
      <img src="/DSC_0472.jpg" alt="Prawich" />
    </div>

    <div class="member__banner--info">
      <span>
        <h2>{data.member.position}</h2>
        <h1>
          <span class="first">{data.member.firstname}</span> <br />
          <span class="last">{data.member.lastname}</span>
        </h1>
        <h3>
          "{data.member.nickname}" Year {data.member.year}
          {data.member.track}
        </h3>
      </span>
      <p>{data.member.bio}</p>
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
        <input type="hidden" name="subscribed" value={data.member.subscribed} />
        <input type="hidden" name="id" value={data.member.id} />
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
        <div class="member__articles--item">
          <a href="/members/2">
            <img src={article.cover} alt="Cover" />
          </a>
          <h4>
            <a href="/members/2">{article.author}</a> | {new Date(
              article.date
            ).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </h4>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
