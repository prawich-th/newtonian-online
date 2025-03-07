<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="write">
  <h1>Newtonian <em style="text-transform: capitalize;">Write</em></h1>

  <form method="post" use:enhance>
    <input type="text" name="path" placeholder="Path" required />
    <input type="text" name="filename" placeholder="Filename" required />
    <input type="file" name="image" />

    <button type="submit">Save</button>
  </form>
</div>
