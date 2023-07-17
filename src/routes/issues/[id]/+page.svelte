<script lang="ts">
  import ImageC from "$lib/ImageC.svelte";
  import Letter from "$lib/Letter.svelte";
  import nth from "$lib/utils/nth";
  import type { PageData } from "./$types";

  export let data: PageData;

  let loadingPdf = false;
</script>

<title>Issue {data.id} | The Newtonian</title>

{#if !data.thisIssue}
  <div class="issue__wrapper">
    <div class="issue">
      <div class="issue__info">
        <div class="issue__info--cover">
          <ImageC image={`/notfound.webp`} caption={`issue ${data.id} - cover`} />
        </div>
        <div class="issue__info--content">
          <div class="issue__headline">
            <h1>Issue {data.id}</h1>
            <h3>To be announced</h3>
          </div>

          <h4>
            Issue {data.id} has yet to be released, please come back later!
          </h4>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="issue__wrapper">
    <div class="issue">
      <div class="issue__info">
        <div class="issue__info--cover">
          <ImageC
            image={`https://apis.news.newton.ac.th/images/cover/issue${data.id}.webp`}
            caption={`issue ${data.id} - cover`}
          />
        </div>
        <div class="issue__info--content">
          <div class="issue__headline">
            <h1>Issue {data.id}</h1>
            <h3>{nth(data.thisIssue.publishingDate)}</h3>
          </div>
          <form method="post" action="?/toPdf" on:submit={() => (loadingPdf = true)}>
            <button class="issue__pdf">
              <i class="bx bxs-file-pdf" style="padding-right: 1rem;" />
              <h3>
                {#if loadingPdf} Awaiting redirect {:else} Access the pdf copy{/if}
              </h3>
            </button>
            <input type="text" name="pdfLink" hidden value={data.thisIssue.pdfLink} />
          </form>

          <h4>Table Of Contents</h4>
          {#each data.thisIssue.articles as article, i}
            <a class="issue__info--article" href={`/articles/${article.id}`}>
              <h5>{article.headline}</h5>
              <h6>
                {" "}
                {#each article.member as member, i}
                  <span>
                    {i > 0 ? ", " : ""}
                    {member.name}
                  </span>
                {/each}
              </h6>
            </a>
          {/each}
        </div>
      </div>

      <Letter
        sender={data.thisIssue.letter.sender}
        content={data.thisIssue.letter.content}
        signatures={data.thisIssue.letter.letterSigner}
      />
    </div>
  </div>
{/if}
