<script lang="ts">
  import { Carta, MarkdownEditor } from "carta-md";
  import { attachment } from "@cartamd/plugin-attachment";
  import { emoji } from "@cartamd/plugin-emoji";
  import { slash } from "@cartamd/plugin-slash";
  import { code } from "@cartamd/plugin-code";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  let { data }: { data: PageData } = $props();

  const catergories = [
    {
      name: "Advice / Essay",
      id: "AdviceEssay",
    },
    {
      name: "Letter",
      id: "letter",
    },
    {
      name: "Interview",
      id: "Interview",
    },
    {
      name: "School Update",
      id: "SchoolUpdate",
    },

    {
      name: "Fiction / Poetry",
      id: "Fiction",
    },
    {
      name: "Performing Arts",
      id: "PerformingArts",
    },
    {
      name: "Visual Arts",
      id: "VisualArts",
    },
    {
      name: "Review",
      id: "Review",
    },
    {
      name: "Business by NBS",
      id: "NBS",
    },
  ];

  const carta = new Carta({
    sanitizer: false,
    // theme: "github-dark",
    extensions: [
      attachment({
        async upload(file) {
          return "https://apis.news.newton.ac.th/images/article-content/integral/1.webp";
        },
      }),
      emoji(),
      slash(),
      code(),
    ],
  });

  let category = $state("AdviceEssay");
  let author = $state(0);
  let headline = $state("");
  let value = $state("");
</script>

<div class="write">
  <h1>Newtonian <em style="text-transform: capitalize;">Write</em></h1>

  <form action="?/save" method="post" use:enhance>
    <input
      type="text"
      name="headline"
      placeholder="Headline"
      bind:value={headline}
    />
    <!-- <input type="text" name="authorid" placeholder="Authorid" /> -->
    <select name="author" bind:value={author}>
      {#each data.members.members as cur}
        <!-- content here -->
        <option value={cur.id}>
          {cur.name} | {cur.nickname}
          | {#if cur.year <= 13}
            Year {cur.year}
          {:else}
            Alumni / Supervisor
          {/if}
        </option>
      {/each}
    </select>
    <input
      type="text"
      name="author"
      placeholder="author"
      readonly
      bind:value={author}
    />
    <input type="number" name="issue" placeholder="issue" />

    <select name="category" bind:value={category}>
      {#each catergories as cur}
        <!-- content here -->
        <option value={cur.id}>
          {cur.name}
        </option>
      {/each}
    </select>
    <input type="hidden" name="content" placeholder="Headline" bind:value />

    <button type="submit">Save</button>
  </form>
  {#if category}
    <div class="article__info--tags">
      <!-- {#each data.article.category as tag} -->
      <span style="background-color: #A20000">{category}</span>
      <!-- {/each} -->
    </div>{/if}
  {#if headline}
    <h1 style="font-size: 3rem;">{headline}</h1>
  {:else}
    <h1 style="font-size: 3rem;">your <em>Headline</em></h1>
  {/if}

  <MarkdownEditor {carta} bind:value theme="github" mode="tabs" />

  <form action="?/login" method="post">
    <input type="text" name="token" placeholder="token" />
    <button type="submit">Login</button>
  </form>
</div>
