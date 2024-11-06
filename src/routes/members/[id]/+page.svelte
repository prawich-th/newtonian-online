<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="member">
  <div class="member__banner">
    <img src="/DSC_0472.jpg" alt="Prawich" />
    <div class="member__banner--info">
      <h2>Head of Tech</h2>
      <h1>
        <span class="first">Prawich</span> <br />
        <span class="last">Thawansakdivudhi</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        temporibus sint autem modi fugit animi dolorem reprehenderit blanditiis
        dicta alias natus voluptatem nemo consectetur porro rem molestias
        adipisci expedita facere.
      </p>
    </div>
    <div class="member__banner--signature">
      <img src="/signature.png" alt="Signature of Prawich" />
    </div>
  </div>
</div>
