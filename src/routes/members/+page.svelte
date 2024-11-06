<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="container">
  <h1>{data.title}</h1>
  {#each data.members as member}
    <p>{member}</p>
  {/each}
</div>
