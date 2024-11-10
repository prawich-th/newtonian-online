<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="issue">
  <section class="issue__info">
    <div class="issue__info--cover">
      <img
        src="https://apis.news.newton.ac.th/images/cover/issue1.webp"
        alt="Issue Cover"
      />
      <div class="issue__pdf">
        <h3>Access the pdf copy</h3>
      </div>
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
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
          <a href="/articles/1">
            <span>
              <h4>To Live is to Suffer</h4>
              <h5>Sakulya Kovitkoolkri</h5>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section class="issue__letter">
    <h2>Letter from the Editor-in-Chiefs</h2>
    <p>
      Dear Newtonians, <br /><br />
      We are back with our ninth issue, one where writers, both old and new are able
      to show their talents and spread their ideas through their words as the graphic
      designers make their dreams come true with each page layout.
      <br /><br />
      The Newtonian has come through a far journey where students are eager to share
      much more complex ideas and dive deeper into what truly interests them: whether
      it be history, commerce, philosophy or society.
      <br /><br />
      I, Krapook, as the current editor-in-chief would also like to bid farewell
      from the esteemed position. Being part of Newton's class of 2024 has been such
      an honor, and it has given me a myriad of opportunities to spark change within
      the school's campus. I will always be a part of The Newtonian as the club's
      founder, but I am proud to pass the responsibility and honor to Peace, our
      new editor-in-chief. In his hands, he'll take over the club and turn it into
      its best version. He has been training for this position throughout the past
      few months, and he is more than ready to take charge of Newton's social and
      extra-curricular scene. Thank you readers for being a part of the Newtonian
      during the past school year. <br /><br />
      <br /><br />
      Yanitta Iewwongcharoen <br />
      Founder, Editor-in-chief
    </p>
  </section>
  <section class="issue__contributors">
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
  </section>
</div>
