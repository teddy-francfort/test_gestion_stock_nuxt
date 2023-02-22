<template>
  <ul>
    <li v-for="error in formErrors">{{error}}</li>
  </ul>
</template>

<script setup>
const props = defineProps(['errors'])

const formErrors = computed(() => {
  const err = props.errors.errors;

  let result = [];
  for (const property in err) {
    let propertyErrors = err[property];

    for (const propertyError in propertyErrors) {
      result.push(propertyErrors[propertyError])
    }
  }

  return result;
})

</script>

<style scoped>
ul {
  color: red;
}
</style>