<template>
  <Title>Produits</Title>
  <a-button type="primary"><NuxtLink to="/products/create">Créer un produit</NuxtLink></a-button>
  <a-table :dataSource="products" :columns="columns" :pagination="false"/>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

import {onMounted} from "vue";
import moment from "moment/moment";

const products = ref([]);

const columns = [
  {title: 'Nom', dataIndex: 'name', key: 'name', customRender: ({text, record, index}) => h('a', { href: '/products/' + record.id }, text) },
  {title: 'Statut', dataIndex: 'is_trashed', key: 'is_trashed', customRender: ({text, record, index}) => h('span', {style: 'color:' + ((text) ? 'red': 'green')}, (text) ? 'Supprimé' : 'Actif') },
  {title: 'Prix', dataIndex: 'price', key: 'price', customRender: ({text, record, index}) => h('div', text + '€') },
  {title: 'Quantité', dataIndex: 'quantity', key: 'quantity'},
  {title: 'Date de création', dataIndex: 'created_at', key: 'created_at', customRender: ({text, record, index}) => h('div', moment(text).format('DD/MM/YYYY HH:mm:ss')) },
  {title: 'Date de mise à jour', dataIndex: 'updated_at', key: 'updated_at', customRender: ({text, record, index}) => h('div', moment(text).format('DD/MM/YYYY HH:mm:ss')) },
]
const apiFetch = myFetch()

onMounted(() => {
  const apiFetch = myFetch()

  apiFetch('/api/products')
      .then(function(response) {
        console.log(response)
        products.value = response
      })
      .catch(function(error) {
        console.log(error.data)
      })
});

</script>

<style scoped>

</style>