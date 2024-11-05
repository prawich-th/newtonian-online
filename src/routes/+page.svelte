<script>
  import Things from "./things.svelte";

  let title = "Hello World";
  let count = $state(0);
</script>

<div class="container">
  <h1>Hello World</h1>
  <a href="/member">Member</a>
  <Things title="Hello" />
</div>
