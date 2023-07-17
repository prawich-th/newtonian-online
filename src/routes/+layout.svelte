<script lang="ts">
  import { navigating } from "$app/stores";
  import Footer from "$lib/layout/Footer.svelte";
  import Header from "$lib/layout/Header.svelte";
  import "../scss/main.scss";
</script>

<Header />

<main>
  <slot><!-- optional fallback --></slot>
</main>

<Footer />
