<script lang="ts">
  import IssueCard from "$lib/IssueCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<title>Issues | The Newtonian</title>
<div class="issues__wrapper">
  <div class="issues">
    <h2>All Issues</h2>

    <div class="issues__list">
      {#each data.issues as issue}
        <IssueCard no={issue.id} publishingDate={issue.publishingDate} cover={issue.cover} />
      {/each}
    </div>
  </div>
</div>
