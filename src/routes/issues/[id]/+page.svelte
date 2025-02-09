<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let contribution = $state(false);

  // console.log(data.letter.letterSigner);

  // if (data.letter) {
  //   let signatures = data.letter.letterSigner.sort((a, b) => {
  //     if (
  //       a.members.role.startsWith("Founder") ||
  //       a.members.role.startsWith("Editor")
  //     ) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  // }
</script>

<div class="issue">
  <section class="issue__info">
    <div class="issue__info--cover">
      <img src={data.cover} alt="Issue Cover" />
      <form action="?/pdf" method="post">
        <input type="hidden" value={data.pdfLink} name="link" />
        <input type="hidden" value={data.id} name="issue" />
        <button class="issue__pdf">Access the pdf copy</button>
      </form>
    </div>
    <div class="issue__info--content">
      <div class="issue__headline">
        <h1>Issue {data.id}</h1>
        <h3>
          {new Date().toLocaleDateString("en-UK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      <div class="issue__content">
        <h2>Table Of Contents</h2>
        <div class="issue__content--list">
          {#each data.articles as article}
            <a href={`/articles/${article.id}`}>
              <span>
                <h4>{article.headline}</h4>
                <h5>{article.member[0].name}</h5>
              </span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
  {#if data.letter}
    <!-- content here -->
    <section class="issue__letter">
      <h2>Letter from the {data.letter.sender}</h2>

      <SvelteMarkdown source={data.letter.content} />
      <br /><br />
      {#each data.letter.letterSigner as signature}
        <img
          src={`${signature.members.signature}`}
          alt="signature"
          style="width: 15rem;"
        />
        <p>
          {signature.members.name} <br />
          {signature.members.role}
        </p>
      {/each}
    </section>
  {/if}
  {#if contribution}
    <!-- <section class="issue__contributors">
      <h2>Contributors</h2>
      <h3>Authors</h3>
      <div class="issue__contributors--list">
        {#each data.issue.authors as author}
          <a href={`/members/${author.id}`}>
            <div class="issue__contributors--list--item">
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
      <h3>Editors</h3>
      <div class="issue__contributors--list">
        {#each data.issue.editors as editor}
          <a href={`/members/${editor.id}`}>
            <div class="issue__contributors--list--item">
              <img src={editor.profile} alt={editor.name} />
              <span>
                <h2>{editor.name}</h2>
                <p>
                  {editor.nickname} | Year {editor.year}
                  {editor.track}
                </p>
              </span>
            </div>
          </a>
        {/each}
      </div>
      <h3>Graphics Designers</h3>
      <div class="issue__contributors--list">
        {#each data.issue.graphics as graphic}
          <a href={`/members/${graphic.id}`}>
            <div class="issue__contributors--list--item">
              <img src={graphic.profile} alt={graphic.name} />
              <span>
                <h2>{graphic.name}</h2>
                <p>
                  {graphic.nickname} | Year {graphic.year}
                  {graphic.track}
                </p>
              </span>
            </div>
          </a>
        {/each}
      </div>
    </section> -->
  {/if}
</div>
