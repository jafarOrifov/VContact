<template>
  <router-view />
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted} from 'vue';
import {useI18n} from "vue-i18n";
import {useStore} from "src/store";

export default defineComponent({
  name: 'App',
  setup(){
    const i18n = useI18n();
    const store = useStore();

    onMounted(()=>{
      if(i18n.locale.value){
        i18n.locale.value = store.getters["vuexModule/getUserLocale"];
      }

      if(store.getters["vuexModule/getColor"]){
        document.body.style.setProperty('--q-primary', store.getters["vuexModule/getColor"]);
      }
    })

  }
})
</script>
