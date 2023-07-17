<script lang="ts">
  import type { PageData } from "./$types";

  interface member {
    id: number;
    name: string;
    nickname: string;
    profile: string;
    year: string;
    status: string;
    track: string;
    role: string;
    permission: number;
  }

  export let data: PageData;

  let important: member[] = [];
  let members: member[] = [];

  const sorter = async () => {
    important = data.members.filter((cur) => {
      return cur.permission === 5;
    });
    members = data.members.filter((cur) => {
      return cur.permission < 5;
    });

    console.log({ important });
  };

  let sorting = sorter();
</script>

<title>Members | The Newtonian</title>

{#await sorting then}
  <div class="members__wrapper">
    <div class="members">
      <section class="members__important">
        {#each important as cur}
          <a href={`/members/${cur.id}`}>
            <div class="members__important--card">
              <img
                src={`https://apis.news.newton.ac.th/images${cur.profile}`}
                alt=""
                class="members__important--image"
                on:error={(e) => {
                  //@ts-ignore
                  e.currentTarget.onerror = null;
                  //@ts-ignore
                  e.currentTarget.src = "/notfound.webp";
                }}
              />
              <h3>
                {cur.name}
                <br />({cur.nickname})
              </h3>
              {#if cur.track !== "supervisor"}
                <h4>
                  Year {cur.year} - {cur.track}
                </h4>
              {/if}
              <h4>{cur.role}</h4>
            </div>
          </a>
        {/each}
      </section>
      <section class="members__list">
        {#each members as cur}
          <a href={`/members/${cur.id}`}>
            <div class="members__list--card">
              <img
                src={`https://apis.news.newton.ac.th/images${cur.profile}`}
                alt=""
                class="members__list--image"
                on:error={(e) => {
                  //@ts-ignore
                  e.currentTarget.onerror = null;
                  //@ts-ignore
                  e.currentTarget.src = "/notfound.webp";
                }}
              />
              <h3>
                {cur.name}
                <br />({cur.nickname})
              </h3>
              {#if cur.track !== "supervisor" && cur.status === "ACTI"}
                <h4>
                  Year {cur.year} - {cur.track ? cur.track : ""}
                </h4>
              {:else if cur.status !== "ACTI"}
                {#if cur.status === "LEAV"}
                  <h4 style="font-style: italic;">Leaved</h4>
                {/if}
                {#if cur.status === "GRAD"}
                  <h4 style="font-style: italic;">Graduated</h4>
                {/if}
                {#if cur.status === "LEAV"}
                  <h4 style="font-style: italic;">Contestant (Award Winner)</h4>
                {/if}
              {:else}
                <h4>Supervisor</h4>
              {/if}
              <h4>{cur.role}</h4>
            </div>
          </a>
        {/each}
      </section>
    </div>
  </div>
{/await}
