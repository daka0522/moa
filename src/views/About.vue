<template>
  <div class="main">
    <header-unit header-title="About the Moa">
      <p>Introduction of Moa website.</p>
      <p>Here is the information, philosophy, design, how to make it about the site.</p>
    </header-unit>

    <section id="about-intro">
      <h3>Introduction</h3>
      <p>This website is to share some apps like managing todo list, design tools, blog.</p>
      <p>Every app is available without authentication but the data will be not saved.</p>
    </section>

    <section id="about-site">
      <h3>About the site</h3>
      <img
        src="@/assets/moa-128.png"
        alt="moa-logo"
      >
      <p>
        Moa is korean word '모아'. It means collect or gather. I use this word for the site because
        I hope people enjoy the apps and share their story & useful things.
      </p>
      <p>The source code is shared on Github. You can visit and review the code.</p>
      <a href="https://github.com/daka0522/moa">Github</a>
    </section>
  </div>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: 'About',
    meta: [
      {
        name: 'description',
        content: 'Introduction of Moa website. Here is the information, philosophy, design, how to make it about the site.'
      }
    ]
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid; 
  grid-template-rows: repeat(auto-fit, minmax(1fr, 1fr));
  // grid-gap: 5vh;
  grid-row-gap: 3vh;
}


</style>