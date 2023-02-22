<template>
  <Title>Connexion</Title>
  <div style="max-width:800px;">
    <FormErrors :errors="errors" class="ant-col ant-col-16 ant-col-offset-8" />
  </div>
  <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" style="max-width: 800px">
    <a-form-item label="Email" v-bind="validateInfos.email">
      <a-input v-model:value="modelRef.email" />
    </a-form-item>
    <a-form-item label="Mot de passe" v-bind="validateInfos.password">
      <a-input-password v-model:value="modelRef.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" @click.prevent="onSubmit">Se connecter</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import {navigateTo, useCookie, useNuxtApp, useState} from "#app";

definePageMeta({
  middleware: ["guest"]
})

const useForm = Form.useForm;

const modelRef = reactive({
  email: '',
  password: '',
});
const rulesRef = reactive({
  email: [
    {
      required: true,
    },
  ],
  password: [
    {
      required: true,
    },
  ],
});

const errors = ref([]);

const { validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});

const onSubmit = () => {
  validate()
      .then(() => {
        const apiFetch = myFetch();
        apiFetch('/sanctum/csrf-cookie').then(function(response) {
          apiFetch('/login', {
            method: 'POST',
            body: modelRef
          })
              .then(function(response) {
                window.location.href = '/'
              })
              .catch(function(error) {
                if (error.data.code === 'ALREADY_LOGGED_IN') {
                  window.location.href = '/'
                }
                console.log(error.data)
                errors.value = error.data;
              })
        });

      })
      .catch(err => {
        console.log('error', err);
      });
};

</script>

