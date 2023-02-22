<template>
  <div style="max-width:800px;">
    <FormErrors :errors="errors" class="ant-col ant-col-16 ant-col-offset-8" />
  </div>
  <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" style="max-width: 800px">
    <a-form-item label="Nom" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="Description" v-bind="validateInfos.description">
      <a-textarea v-model:value="modelRef.description" />
    </a-form-item>
    <a-form-item label="Quantité" v-bind="validateInfos.quantity">
      <a-input-number min="0" v-model:value="modelRef.quantity" />
    </a-form-item>
    <a-form-item label="Prix" v-bind="validateInfos.price">
      <a-input-number min="0" v-model:value="modelRef.price" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" @click.prevent="onSubmit">{{submitButton}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import {navigateTo, useCookie, useNuxtApp, useState} from "#app";

/*definePageMeta({
  middleware: ["guest"]
})*/

const useForm = Form.useForm;

const props = defineProps(['product'])

const modelRef = reactive({
  name: props.product?.name,
  description: props.product?.description,
  quantity: props.product?.quantity,
  price: props.product?.price,
});

const rulesRef = reactive({
  name: [
    {
      required: true,
    },
  ],
  description: [
    {
      required: true,
    },
  ],
  quantity: [
    {
      required: true,
    },
  ],
  price: [
    {
      required: true,
    },
  ],
});

const errors = ref([]);

const submitButton = computed(() => (props.product) ? 'Sauvegarder' : 'Créer le produit')

const { validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});

const onSubmit = () => {
  validate()
      .then(() => {
        const apiFetch = myFetch();
        const targetRoute = (props.product) ? '/api/products/' + props.product.id : '/api/products'

          apiFetch(targetRoute, {
            method: (props.product) ?  'PATCH' : 'POST',
            body: modelRef
          })
              .then(function(response) {
                window.location.href = '/products'
              })
              .catch(function(error) {
                console.log(error.data)
                errors.value = error.data;
              })

      })
      .catch(err => {
        console.log('error', err);
      });
};

</script>

