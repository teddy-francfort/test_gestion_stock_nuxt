<template>
  <Title>Modification du produit {{productId}}</Title>
  <ProductForm v-if="product" :product="product"/>
</template>

<script setup>
import {useRoute} from "#app";
import {onMounted} from "vue";

definePageMeta({
  middleware: ["auth"]
})


const route = useRoute()
const productId = route.params.id
const product = ref(null)

onMounted(() => {
  const apiFetch = myFetch()

  apiFetch('/api/products/' + productId)
      .then(function(response) {
        console.log(response)
        product.value = response
      })
      .catch(function(error) {
        console.log(error.data)
      })
});
</script>

<style scoped>

</style>