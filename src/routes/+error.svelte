<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="not-found__wrapper">
  <div class="not-found">
    <h1>{$page.status} | {$page.error?.message}</h1>
    <p>
      {$page.url.pathname} cannot be found. <a href={"/"}>back home</a>
    </p>
  </div>
</div>
