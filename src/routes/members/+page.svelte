<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="members">
  <section class="members__important">
    {#each data.important as cur}
      <a href={`/members/${cur.id}`}>
        <div class="members__important--card">
          <img src={cur.profile} alt={`portrait of ${cur.name}`} />
          <h4>{cur.role}</h4>
          <h3>
            {cur.name}<br />({cur.nickname})
          </h3>
          <h5>
            Year {cur.year}
            {cur.track}
          </h5>
        </div>
      </a>
    {/each}
  </section>
  <section class="members__list">
    {#each data.members as cur}
      <a href={`/members/${cur.id}`}>
        <div class="members__list--card">
          <img src={cur.profile} alt={`portrait of ${cur.name}`} />
          <h4>{cur.role}</h4>
          <h3>
            {cur.name}<br />({cur.nickname})
          </h3>
          <h5>
            Year {cur.year}
            {cur.track}
          </h5>
        </div>
      </a>
    {/each}
  </section>
</div>
