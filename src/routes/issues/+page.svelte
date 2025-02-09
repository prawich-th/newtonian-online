<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="issues">
  <h1>All <em>Issues</em></h1>

  <div class="issues__list">
    {#each data.issues as issue}
      <a href={`/issues/${issue.id}`}>
        <div class="issues__list--card">
          <img src={issue.cover} alt={`Cover of Issue ${issue.id}`} />
          <h4>Issue {issue.id}</h4>
          <h5>
            {new Date(issue.publishingDate).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h5>
        </div>
      </a>
    {/each}
  </div>
</div>
