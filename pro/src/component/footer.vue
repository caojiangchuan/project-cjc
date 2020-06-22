<template>
  <section class="foot">
    <ul>
      <li >
        <router-link to="/js">js</router-link>
      </li>
      <li>
        <router-link to="/css">css</router-link>
      </li>
      <li>
        <router-link to="/dom">dom</router-link>
      </li>

      <li>
        <router-link to="/http">http</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style>
.foot {
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0;
    width: 100%;
}
ul {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    background: black;

    justify-content: space-between;
}
ul li {
    width: 25%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    list-style-type: none;
    color: white;
}
li > a {
    display: block;
    color: white;
}
</style>