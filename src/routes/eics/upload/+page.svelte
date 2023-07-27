<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<title>Upload File | Newtonian Management</title>
<div class="u-article__wrapper">
  <div class="u-article">
    <div class="u-article__title">
      <h1>Upload File</h1>
      <p>Upload file as {data.user?.name} - level {data.user?.permission}</p>
    </div>
    <div class="import__area">
      <form class="import__form" method="POST" use:enhance>
        <div class="import__form--action">
          <h3>Upload File</h3>
        </div>
        <div class="import__form--field">
          <p>File Name *nospace, nouppercase</p>
          <input type="text" placeholder="cover.webp" name="name" />
        </div>
        <div class="import__form--field">
          <p>Pathname *nospace, nouppercase</p>
          <input type="text" placeholder="/articles/newtonmusical" name="path" />
        </div>
        <div class="import__form--field">
          <p>File (image)</p>
          <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" name="image" />
        </div>
        <button type="submit" class="import__form--btn"> submit </button>
      </form>
    </div>
  </div>
</div>
