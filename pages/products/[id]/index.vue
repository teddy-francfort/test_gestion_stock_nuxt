<template>
  <Title>Produit #{{productId}}</Title>
  <a-typography-title>Produit #{{productId}}</a-typography-title>

  <div v-if="product">
    <a-tag color="success" v-if="!product.is_trashed">Produit actif</a-tag>
    <a-tag color="error" v-if="product.is_trashed">Produit supprimé</a-tag>
  </div>

  <a-divider/>

  <div v-if="product">
    <client-only>


      <a-space>
        <a-button type="primary"><NuxtLink :to="editLink">Modifier</NuxtLink></a-button>
        <a-button type="danger" @click="deleteProduct" v-if="!product.is_trashed">Supprimer</a-button>
      </a-space>

      <a-divider/>

      <a-row>
        <a-col :span="2"><a-typography-text strong>Date de création</a-typography-text></a-col>
        <a-col :span="22">{{moment(product.created_at).format('DD/MM/YYYY HH:mm:ss')}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Date de modification</a-typography-text></a-col>
        <a-col :span="22">{{moment(product.updated_at).format('DD/MM/YYYY HH:mm:ss')}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Date de suppression</a-typography-text></a-col>
        <a-col :span="22" v-if="product.deleted_at">{{moment(product.deleted_at).format('DD/MM/YYYY HH:mm:ss')}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Nom</a-typography-text></a-col>
        <a-col :span="22">{{product.name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Description</a-typography-text></a-col>
        <a-col :span="22">{{product.description}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Quantité</a-typography-text></a-col>
        <a-col :span="22">{{product.quantity}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="2"><a-typography-text strong>Prix</a-typography-text></a-col>
        <a-col :span="22">{{product.price}}€</a-col>
      </a-row>
      <a-divider>Mouvements du produit</a-divider>
      <a-table :dataSource="product?.movements" :columns="columns" :pagination="false"/>
    </client-only>
  </div>
</template>

<script setup>
import {navigateTo, useCookie, useRoute} from "#app";
import {onMounted} from "vue";
import moment from "moment";

definePageMeta({
  middleware: ["auth"]
})

const route = useRoute()
const productId = route.params.id
const product = ref(null)
const columns = [
  {title: 'Date', dataIndex: 'created_at', key: 'created_at', customRender: ({text, record, index}) => h('div', moment(text).format('DD/MM/YYYY HH:mm:ss')) },
  {title: 'Prix', dataIndex: 'price', key: 'price', customRender: ({text, record, index}) => h('div', text + '€') },
  {title: 'Quantité', dataIndex: 'quantity', key: 'quantity'},
]

const editLink = computed(() => '/products/'+productId+'/edit')

function deleteProduct () {
  const apiFetch = myFetch();
  apiFetch('/api/products/' + productId, {
    method: 'DELETE',
  })
      .then(function(response) {
        window.location.href = '/products'
      })
      .catch(function(error) {
        console.log(error.data)
      })
}

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