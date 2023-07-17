<script lang="ts">
  import ArticleList from "$lib/ArticleList.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const catergories = [
    { name: "Letter", id: "Letter" },
    {
      name: "Interview",
      id: "Interview",
    },
    {
      name: "School Update",
      id: "SchoolUpdate",
    },
    {
      name: "Advice / Essay",
      id: "AdviceEssay",
    },
    {
      name: "Fiction / Poetry",
      id: "Fiction",
    },
    {
      name: "Research",
      id: "Research",
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

  const categorised: any = {};

  catergories.forEach((c) => {
    categorised[c.id] = data.data.filter((a: any) => a.category === c.id);
  });

  console.log(catergories);
</script>

<title>Articles | The Newtonian</title>
<div class="categories__wrapper">
  <div class="categories">
    {#each catergories as c, i}
      <section class="categories__articles">
        <ArticleList title={c.name} articles={categorised[c.id].reverse()} />
      </section>
    {/each}
  </div>
</div>
