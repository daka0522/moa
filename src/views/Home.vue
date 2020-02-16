<template>
    <div>
      <!-- <img src="../assets/logo.svg" width="200em">
        <img src="../assets/logo-randomy.svg" width="300em"> -->

      <div class="box-shadow">

        <div id="news-panel" class="box-shadow-one">
          <h2>News</h2>
        </div>
        <div id="update-panel" class="box-shadow-two">
          <h2>Update</h2>
        </div>

      </div>
    </div>
</template>

<script>
export default {
    
}

</script>

<style scoped lang="scss">

img {
    margin: 1.6em;
}




.box-shadow {
$test-first: hsla(270, 100, 30, .5);
$test-second: hsla(90, 100, 30, .5);

$test-gradient: linear-gradient(63deg, $test-first 0%, $test-second 100%);

display: flex;

// color: white;
cursor:pointer;
// background-color: rgb(59, 59, 59);

  &-one {
    padding: .8em;
    margin: 1.6em;
    width: 40%;

    box-shadow:  $shadow-primary;

    border-style: solid;
    border-color: rgba($test-second, .1);
    border-width: .01em;

    background: linear-gradient(63deg, rgba($test-first, .1) 0%, rgba($test-second, .1) 100%);

  }
  &-two {
    padding: .8em;
    margin: 1.6em;
    width: 40%;
    box-shadow: $shadow-primary;
  }

  &-one:hover, &-two:hover {
    background-color: red;
    color: white;

    transition-property: background-color;
    transition-duration: 1s; 
    // transition-delay: .05s;
    transition-timing-function: ease;
  }
  &-one:active, &-two:active {
    background-color: red;

    transform: scale(.98);

    transition-property: transform;
    transition-duration: .1s; 
    
    transition-timing-function: ease;
  }
}

</style>