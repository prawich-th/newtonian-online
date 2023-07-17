<div class="header__wrapper">
  <div class="header">
    <div class="header__logo">
      <a href="/">
        <img src="/logo.svg" alt="The Newtonian Logo" class="header__logo--light" />
        <img src="/logo-dark.svg" alt="The Newtonian Logo" class="header__logo--dark" />
      </a>
    </div>
    <div class="header__nav">
      <ul>
        <li>
          <a href={"/articles"}>Articles</a>
        </li>
        <li>
          <a href={"/issues"}>Issues</a>
        </li>
        <li>
          <a href={"/members"}>Members</a>
        </li>
        {#if true}
          <li>
            <a style="color: #CC3333;" href={"/eics"}> Eics </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</div>
