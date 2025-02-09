<script>
  import "../scss/main.scss";
</script>

<header>
  <a href="/">
    <img src="/logo-dark.svg" alt="The Newtonian Logo" class="logo" />
  </a>
  <ul>
    <li>
      <a href="/school">School</a>
    </li>
    <li>
      <a href="/lit">Literature</a>
    </li>
    <li>
      <a href="/academics">Academics</a>
    </li>
    <li>
      <a href="/issues">Issues</a>
    </li>
    <li>
      <a href="/members">Members</a>
    </li>
  </ul>
</header>

<div class="page">
  <slot />
</div>

<footer>
  <div class="footer">
    <div class="left">
      <p>&copy; 2025 All Rights Reserved. The Newtonian Newspaper Club</p>
      <ul class="footer__nav">
        <li>
          <a href="/school">School</a>
        </li>
        <li>
          <a href="/lit">Literature</a>
        </li>
        <li>
          <a href="/academics">Academics</a>
        </li>
        <li>
          <a href="/issues">Issues</a>
        </li>
        <li>
          <a href="/members">Members</a>
        </li>
      </ul>
      <ul class="footer__socials">
        <li>
          <a
            href="https://www.instagram.com/thenewtonianjournal/"
            aria-label="Instagram"
          >
            <i class="bx bxl-instagram"></i>
          </a>
        </li>
      </ul>
      <ul style="margin-top: 1rem;">
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms & Conditions</a>
        </li>
      </ul>
    </div>
    <div class="right">
      <h1>The Newtonian Online <em>v2.0</em></h1>
      <p>
        Reimagined by <a href="/members/1"><em>Prawich Thawansakdivudhi</em></a>
        <br />
        with <a href="/members/2"><em>Koramist Samorapoom</em></a>
      </p>
    </div>
  </div>
</footer>
