<template>
  <div>
    <section id="sect-btn">
      <h1>Button Component Test</h1>
      <div id="btns">
        <btn-unit role="create" icon="check">Create </btn-unit>
        <btn-unit role="read">Read </btn-unit>
        <btn-unit role="update">Update </btn-unit>
        <btn-unit role="delete" size="small">Delete </btn-unit>
        
        <btn-unit>Default</btn-unit>
      </div>

    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
#sect-btn {
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: .5em;
  margin: 1.6vh 0;
  padding: 1.6vh 1.6vw;


  #btns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  }
}


</style>