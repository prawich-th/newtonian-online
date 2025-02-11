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

  let authorinfo = {
    id: 0,
    name: "",
    nickname: "",
    year: 0,
    track: "all",
  };

  let authorfilter: {
    year: number;
    track: string;
  } = $state({
    year: 0,
    track: "all",
  });

  $effect(() => {
    authorinfo = data.members.members.find((m: any) => m.id === author) || {
      id: 0,
      name: "",
      nickname: "",
      year: 0,
      track: "all",
    };
    console.log(authorinfo);
    console.log("effect");
    authorfilter.year = authorinfo.year;
    authorfilter.track = authorinfo.track;
  });
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

    <select name="year" bind:value={authorfilter.year}>
      {#each [{ name: "Year 8", id: 8 }, { name: "Year 9", id: 9 }, { name: "Year 10", id: 10 }, { name: "Year 11", id: 11 }, { name: "Year 12", id: 12 }, { name: "Year 13", id: 13 }, { name: "Alumni", id: 14 }] as cur}
        <!-- content here -->
        <option value={cur.id}>
          {cur.name}
        </option>
      {/each}
    </select>
    <select name="track" bind:value={authorfilter.track}>
      <option value={"Health Science"}>Health Science</option>
      <option value={"Computer Science"}>Computer Science</option>
      <option value={"Newton Business School"}>Newton Business School</option>
      <option value={"No Track"}>No Track</option>
    </select>

    <select name="author" bind:value={author}>
      {#each data.members.members.filter((m: any) => {
        if (m.year > 13) {
          if (authorfilter.year !== 14) return false;

          if (authorfilter.year && authorfilter.track !== "all") {
            return m.year === authorfilter.year && m.track === authorfilter.track;
          }
          if (authorfilter.year) {
            return m.year === authorfilter.year;
          }
          if (authorfilter.track !== "all") {
            return m.track === authorfilter.track;
          }
          return true;
        }
        if (!authorfilter.year && authorfilter.track === "all") {
          return true;
        }
        if (authorfilter.year && authorfilter.track !== "all") {
          return m.year === authorfilter.year && m.track === authorfilter.track;
        }
        if (authorfilter.year) {
          return m.year === authorfilter.year;
        }
        if (authorfilter.track !== "all") {
          return m.track === authorfilter.track;
        }
        return false;
      }) as cur}
        <!-- content here -->
        <option value={cur.id}>
          {cur.name} | {cur.nickname}
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
