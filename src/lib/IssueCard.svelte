<script lang="ts">
  import nth from "./utils/nth";

  export let publishingDate: string;
  export let no: number;
  export let cover: string;
</script>

<div class="issue-card">
  <a href={`/issues/${no}`}>
    <div class="issue-card__cover">
      <img src={`https://apis.news.newton.ac.th/images${cover}`} alt="issue {no}'s cover" />
    </div>
    <div class="issue-card__info">
      <h3>Issue {no}</h3>
      <h4>{nth(publishingDate)}</h4>
    </div>
  </a>
</div>
