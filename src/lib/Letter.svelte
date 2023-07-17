<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let sender: string;
  export let content: string;
  export let signatures: {
    members: {
      signature: string;
      name: string;
      role: string;
    };
  }[];
  onMount(() => {
    signatures.sort((a: any, b: any) => {
      return a.members.role.startsWith("Founder") ? -10 : 1;
    });
  });
</script>

<div class="letter">
  <h1>Letter From <em>{sender}</em></h1>
  <p>
    <SvelteMarkdown source={content} isInline />
  </p>

  <div class="letter__signatures">
    {#each signatures as e}
      <!-- content here -->
      <div class="letter__signatures--item">
        <div class="letter__signatures--wrap">
          <img
            src={`https://apis.news.newton.ac.th/images${e.members.signature}`}
            alt="{e.members.name}'s signature"
          />
        </div>
        <span>
          <h3>{e.members.name}</h3>
          <h4>{e.members.role}</h4>
        </span>
      </div>
    {/each}
  </div>
</div>
