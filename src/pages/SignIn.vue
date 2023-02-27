<template>
  <div class="fullscreen row justify-center items-center bg-image">
    <div class="col-xs-12 col-md-9 col-lg-8 row justify-center bg-white shadow-3 animated animate__backInRight" :style="$q.screen.gt.sm?'z-index: 2; height: 75%; border-radius: 15px; overflow: hidden':'z-index: 2; height: 100%;'">
      <div class="gt-sm col-md-7 column justify-start items-center">
        <q-carousel
          animated
          infinite
          :autoplay="true"
          v-model="slide"
          height="100%"
          style="width: 100%"
        >
          <q-carousel-slide name="first" img-src="~src/assets/images/Happy-Coworkers-In-Office-1.jpg">
            <div style="width: 100%; height: 100%; background: rgba(0, 0, 0, 0.45)" class="absolute-top-left row justify-center items-center">
              <div class="column text-grey-3 animated animate__backInLeft">
                <p>{{ $t('titles.l_welcome_to_app') }}</p>
                <ul style="line-height: 30px" class="text-subtitle1">
                  <li>{{  $t('captions.l_your_info_in_safe_arms') }}</li>
                  <li>{{  $t('captions.l_successfull_projects_around_world') }}</li>
                  <li>{{  $t('captions.l_service_24_7') }}</li>
                  <li>{{  $t('captions.l_stark_collegue') }}</li>
                </ul>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="second" img-src="~src/assets/images/istockphoto-1209869264-612x612.jpg">
            <div style="width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.5)" class="absolute-top-left row justify-center items-center">
              <div class="column text-grey-3 animated animate__backInLeft">
                <p>{{ $t('titles.l_welcome_to_app') }}</p>
                <ul style="line-height: 30px" class="text-subtitle1">
                  <li>{{  $t('captions.l_your_info_in_safe_arms') }}</li>
                  <li>{{  $t('captions.l_successfull_projects_around_world') }}</li>
                  <li>{{  $t('captions.l_service_24_7') }}</li>
                  <li>{{  $t('captions.l_stark_collegue') }}</li>
                </ul>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="third" img-src="~src/assets/images/istockphoto-1347652268-170667a.jpg">
            <div style="width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.5)" class="absolute-top-left row justify-center items-center">
              <div class="column text-grey-3 animated animate__backInLeft">
                <p>{{ $t('titles.l_welcome_to_app') }}</p>
                <ul style="line-height: 30px" class="text-subtitle1">
                  <li>{{  $t('captions.l_your_info_in_safe_arms') }}</li>
                  <li>{{  $t('captions.l_successfull_projects_around_world') }}</li>
                  <li>{{  $t('captions.l_service_24_7') }}</li>
                  <li>{{  $t('captions.l_stark_collegue') }}</li>
                </ul>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-xs-12 col-md-5">
        <div class="text-right q-pa-md row items-start justify-between">
          <div class="row items-center justify-end">
<!--            <p> <q-icon name="mdi-alpha-z-box" color="secondary" size="md"></q-icon></p>-->
            <p class="p-bold text-primary">VContact</p>
          </div>
          <q-btn color="primary" size="xs" icon-right="mdi-menu-down" outline :label="language">
            <q-menu
              transition-show="rotate"
              transition-hide="rotate"
            >
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  v-for="item in $store.getters['vuexModule/getLocales']"
                  @click="language = item.locale"
                  :active="language === item.locale"
                  active-class="text-bold"
                >
                  <q-item-section>{{ item.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <q-form @submit="signIn" class="q-pa-xl q-mt-xl">
          <p class="text-primary p-bold">{{ $t('captions.l_enter_to_system') }}</p>

          <div>
            <q-input v-model="userCredentials.login" :label="$t('captions.l_login')"
                     outlined class="q-mb-lg"
                     type="text"
                     lazy-rules
                     :rules="[val => val.length >= 3 || $t('captions.l_login_validation') ]">
              <template v-slot:prepend>
                <q-icon name="mdi-account-edit-outline" size="sm"/>
              </template>
            </q-input>

            <q-input v-model="userCredentials.password"
                     :label="$t('captions.l_password')" outlined
                     lazy-rules
                     :rules="[val => !!val || $t('') ]"
                     :type="isPwd ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="mdi-lock-outline" size="sm"/>
              </template>

              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="row justify-between items-center q-mt-xl q-px-md">
            <q-checkbox dense v-model="remember" :label="$t('captions.l_remember')" color="primary" />
            <q-btn :loading="loading" color="primary" type="submit" rounded class="q-px-lg" :label="$t('captions.l_enter')"></q-btn>
          </div>
        </q-form>
        <div class="q-px-xl row justify-center items-center">
          <q-icon name="mdi-account-cog-outline" color="grey-8" size="sm"></q-icon>
          <span class="q-mx-sm">{{ $t('captions.l_not_have_an_account') }}</span>
          <router-link to="/signup">{{ $t('captions.l_register') }}</router-link>
        </div>
      </div>
    </div>
    <div class="absolute fullscreen" style="z-index: 1; background: rgba(210, 210, 210, 0.4)"></div>
  </div>
</template>

<script lang="ts">
import {computed, inject, onMounted, reactive, ref} from "vue";
import {User} from "components/models";
import {useI18n} from "vue-i18n";
import {useStore} from "src/store";
import axios from "axios";
import {useQuasar} from "quasar";
import * as utils from "src/utils";
import {urls} from "src/utils/constants";
import {useRouter} from "vue-router";
import {cookies} from "boot/cookies";

export default {
  name: "SignIn",
  setup(){
    // PLUGINS
    const i18n = useI18n();
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    // VARIABLES
    const apiUrl = ref<string>(urls.SIGN_IN);
    let slide = ref<String>('first');
    let isPwd = ref<Boolean>(true);
    let loading = ref<boolean>(false);
    let remember = ref<boolean>(false);
    let userLanguage = ref<string>(store.getters["vuexModule/getUserLocale"]);
    let userCredentials = reactive<User>({
      login: '',
      password: '',
      role: 'admin',
    })

    // METHODS
    const notify = utils.notifications();

    let language = computed<string>({
      get: function (){
        return i18n.locale.value;
      },
      set: function (locale){
        store.commit('vuexModule/setUserLocale', locale);
        i18n.locale.value = locale;
      }
    })

    function signIn(): void{
      loading.value = true;
      axios.post(apiUrl.value, userCredentials)
      .then((response)=>{
        if (remember.value){
          cookies.setUserLogin(userCredentials.login);
        } else {
          cookies.deleteUserLogin();
        }
        store.commit('vuexModule/setUser', response.data.user);

        router.push('/main-layout');
      }).catch(error=>{
        notify.fail(error.response.data);
      }).finally(()=>{
        loading.value = false;
      })
    }

    onMounted(()=>{
      if(cookies.hasUserLogin()){
        userCredentials.login = cookies.getUserLogin() as string;
        remember.value = true;
      }
    })

    return {
      slide,
      isPwd,
      remember,
      userLanguage,
      userCredentials,
      language,
      loading,
      signIn,
    }
  }
}
</script>

<style scoped>
.bg-image{
  background-image: url("src/assets/images/abstract-geometric-wireframe-background_52683-59421.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
