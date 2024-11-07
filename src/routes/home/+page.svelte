<script>
  import ArticleItem from "./article-item.svelte";
</script>

<div class="home">
  <div class="home__banner">
    <a href="/articles/1">
      <div class="home__main">
        <img src="/cover.webp" alt="The Newtonian Online" />
        <div class="home__main--info">
          <div class="home__main--tags">
            <span style="background-color: #a50000">Literature</span>
            <span style="background-color: #001a53">Newton</span>
          </div>
          <p class="author">Sakulya Kovitkoolkri | 22 June 2024</p>
          <h1>To live is to Suffer</h1>
        </div>
      </div>
    </a>
    <div class="home__other">
      <a href="/articles/1">
        <div class="home__other--item">
          <img src="/cover.webp" alt="The Newtonian Online" />
          <div class="home__other--item--info">
            <div class="home__other--item--tags">
              <span style="background-color: #a50000">Literature</span>
              <span style="background-color: #001a53">Newton</span>
            </div>
            <p class="author">Sakulya Kovitkoolkri | 22 June 2024</p>
            <h1>To live is to Suffer</h1>
          </div>
        </div>
      </a>
      <a href="/articles/1">
        <div class="home__other--item">
          <img src="/cover.webp" alt="The Newtonian Online" />
          <div class="home__other--item--info">
            <div class="home__other--item--tags">
              <span style="background-color: #a50000">Literature</span>
              <span style="background-color: #001a53">Newton</span>
            </div>
            <p class="author">Sakulya Kovitkoolkri | 22 June 2024</p>
            <h1>To live is to Suffer</h1>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="home__articles">
    <h2>Featuring</h2>
    <div class="home__articles--list">
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <ArticleItem
        title="To live is to suffer"
        author={{ name: "Sakulya Kovitkoolkri", id: "1" }}
        date="2024-06-22"
        cover="/cover.webp"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
    </div>
  </div>
</div>
