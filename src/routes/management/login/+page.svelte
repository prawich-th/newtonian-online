<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="write">
  <h1>Newtonian <em style="text-transform: capitalize;">Write</em></h1>

  <form action="?/login" method="post" use:enhance>
    <input type="text" name="username" placeholder="username" />
    <input type="password" name="password" placeholder="password" />
    <button type="submit">Save</button>
  </form>

  <form action="?/token" method="post">
    <input type="text" name="token" placeholder="token" />
    <button type="submit">Login</button>
  </form>
</div>
