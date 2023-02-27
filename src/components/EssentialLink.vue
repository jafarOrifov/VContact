<template>
  <q-item
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
      class="text-white"
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
      <q-item-label caption class="text-white">{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },

    link: {
      type: Object,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup(){

    return {

    }
  }
});
</script>
