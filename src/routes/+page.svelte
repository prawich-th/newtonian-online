<script>
  import ArticleItem from "./home/article-item.svelte";
</script>

<div class="container">
  <title>The Newtonian Online</title>
  <h1>Hello World 👋</h1>
  <h3>Welcome to the Newtonian Online v2</h3>
  <h3><strong>THIS SITE IS CURRENTLY UNDER CONSTRUCTION</strong></h3>
  <p>
    continue anyways <a href="/home">here</a>
  </p>
  <p>
    please visit <a href="https://news.newton.ac.th">news.newton.ac.th</a>
  </p>
  <p>
    a <a href="https://instagram.com/prawich.th"><em>prawich-th</em></a> site
  </p>
  <ArticleItem
    title="Conspiracy behind Julius Caesar"
    author={{ name: "Kasira Chayanan", id: "4" }}
    date="2024-06-22"
    cover="/cover.webp"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
    id="3"
    tags={[
      { name: "Essay", color: "#aa2000" },
      { name: "History", color: "#a50000" },
    ]}
  />
</div>

<style lang="scss">
  .container {
    text-align: center;
    margin-top: 10rem;

    h1 {
      font-size: 5rem;
      font-weight: 700;
      font-family: "Andika", sans-serif;
    }

    h3 {
      font-size: 2rem;
      font-weight: 300;
      margin: 1rem;
      color: var(--newtonian-marine);
    }

    p {
      font-size: 1.5rem;
      font-weight: 300;
      margin: 1rem;
    }
  }
</style>
