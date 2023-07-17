<script lang="ts">
  import ArticleList from "$lib/ArticleList.svelte";
  import ImageC from "$lib/ImageC.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<title>{data.name} | The Newtonian</title>

<div class="member__wrapper">
  <div class="member">
    <div class="member__info">
      <div class="member__info--left">
        <div class="member__info--image">
          <ImageC
            image={`https://apis.news.newton.ac.th/images${data.profile}`}
            caption={`${data.nickname}'s image`}
          />
        </div>
        <div class="member__info--bio">
          <h3>
            {data.name} ({data.nickname})
          </h3>
          {#if data.track !== "supervisor" && data.status === "ACTI"}
            <h4>
              Year {data.year} - {data.track ? data.track : ""}
            </h4>
          {:else if data.status !== "ACTI"}
            {#if data.status === "LEAV"}
              <h4 style="font-style: italic;">Leaved</h4>
            {/if}
            {#if data.status === "GRAD"}
              <h4 style="font-style: italic;">Graduated</h4>
            {/if}
            {#if data.status === "LEAV"}
              <h4 style="font-style: italic;">Contestant (Award Winner)</h4>
            {/if}
          {:else}
            <h4>Supervisor</h4>
          {/if}
          <h5 style="color: var(--signature-grey);">
            {data.role}
          </h5>
          <p>{data.bio}</p>
        </div>
      </div>
      <div class="member__info--right">
        <img
          src={`https://apis.news.newton.ac.th/images${data.signature}`}
          alt="Member's Signature"
        />
      </div>
    </div>
    <ArticleList
      title={"Articles"}
      articles={data.articles}
      error="This member has not yet published any article(s)"
    />
  </div>
</div>
