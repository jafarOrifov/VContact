<template>
  <div class="fullscreen row justify-center items-center bg-image" style="height: calc(100vh - 0px)">
    <div class="col-xs-12 col-md-9 col-lg-9 row justify-center bg-white animated animate__backInRight" :style="$q.screen.gt.sm?'z-index: 2; height: 85%; border-radius: 15px; overflow: hidden':'z-index: 2; height: 100%;'">
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
        <q-form @submit.prevent="signUp" :class="$q.screen.gt.md?'q-pa-xl q-mt-xl':$q.screen.lt.sm?'q-pa-md q-mt-xl':'q-pa-lg'" type="submit">
          <p class="text-primary p-bold">{{ $t('captions.l_register') }}</p>
          <div class="row justify-between">
            <q-input
              dense
              v-model="userCredentials.name"
              :label="$t('captions.l_fio')" outlined
              lazy-rules
              class="q-mr-sm col-xs-12 col-md-6 q-mb-md"
              :rules="[val => val.length >= 3 || $t('captions.l_login_validation') ]">
              <template v-slot:prepend>
                <q-icon name="mdi-account-outline" size="sm"/>
              </template>
            </q-input>

            <q-input
              dense v-model="userCredentials.phone"
              :label="$t('captions.l_phone')" outlined
              class="col-xs-12 col-md-5"
              mask="(##) ### - ## - ##"
              unmasked-value
              lazy-rules
              :rules="[val => !!val && val.length === 9 || $t('captions.l_phone_example') ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-phone-outline" size="sm"/>
              </template>
            </q-input>

            <q-input
              dense
              v-model="userCredentials.login"
              :label="$t('captions.l_login')" outlined
              lazy-rules
              class="col-xs-12 col-md-12 q-mb-sm"
              :rules="[val => val.length >= 3 || $t('captions.l_login_validation') ]">
              <template v-slot:prepend>
                <q-icon name="mdi-account-edit-outline" size="sm"/>
              </template>
            </q-input>


            <q-input
              dense
              :rules="checkPsw"
              lazy-rules
              v-model="userCredentials.password"
              @focusout="showValidationText"
              class="col-xs-12 col-md-12 q-mb-md"
              :label="$t('captions.l_password')" outlined  :type="isPwd ? 'password' : 'text'">
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

            <ul v-show="showValidation" style="margin-top: -20px;">
              <li style="color: #3b3d42" class="animate__animated animate__shakeX" v-for="item in validationTextArr" :key="item.pref" :datatype="item.pref" ref="refsLi">{{ item.text }}</li>
            </ul>

            <q-input
              dense
              v-model="confirmPsw"
              outlined
              :label="$t('captions.l_reenter_password')"
              class="col-xs-12 col-md-12"
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

          <div class="row justify-between items-center q-mt-lg q-px-md">
            <q-checkbox dense v-model="remember" :label="$t('captions.l_remember')" color="primary" />
            <q-btn :loading="loading" color="primary" type="submit"  class="q-px-lg">{{ $t('captions.l_enter') }}</q-btn>
          </div>
        </q-form>
        <div class="q-px-xl row justify-center items-center">
          <q-icon name="mdi-account-cog-outline" color="grey-8" size="sm"></q-icon>
          <span class="q-mx-sm">{{ $t('captions.l_have_account') }}</span>
          <router-link to="/">{{ $t('captions.l_enter') }}</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
    <div class="absolute fullscreen" style="z-index: 1; background: rgba(210, 210, 210, 0.4)"></div>
  </div>
</template>

<script lang="ts">
import {computed, createApp, nextTick, onMounted, reactive, ref, watch} from "vue";
import {User} from "components/models";
import {useRouter} from "vue-router";
import * as utils from "src/utils";
import {urls} from "src/utils/constants";
import {useI18n} from "vue-i18n";
import {useStore} from "src/store";
import axios from "axios";
import {cookies} from "boot/cookies";
import {notifications} from "src/utils";
import i18n from "boot/i18n";

export default {
  name: "SignUp",
  setup(){
    //TYPES
    interface validationText {
      pref: string,
      text: string
    }


    //PLUGINS
    const router = useRouter();
    const store = useStore();
    const i18n  =useI18n();

    //REGEXP
    const validationTextArr:validationText[] = [
      {
        pref: 'len',
        text: 'password must contain from 8 upto 20 characters',
      },
      {
        pref: 'low',
        text: 'at least one lowercase [a-z]'
      },
      {
        pref: 'upp',
        text: 'at least one uppercase [A-Z]'
      },
      {
        pref: 'num',
        text: 'at least one number [0-9]'
      },
      {
        pref: 'sym',
        text: 'at least one symbol [+ - ! @ # $ % ^ & *]'
      },
    ];

    const passwordRegExp = ref<any>(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[+\-!@#\$%\^&\*]).{8,20}$/);

    let checkPsw = computed(()=>{
      return [
        (val:string | boolean) => passwordRegExp.value.test(val) || ''
      ]
    })

    //VARIABLES
    const notify = notifications();
    const apiUrl = ref<string>(urls.SIGNUP);
    let slide = ref<string>('first');
    let messageDialog = ref<boolean>(false);
    let showValidation = ref<boolean>(false);
    let isPwd = ref<boolean>(true);
    let confirmPsw = ref<string>('');
    let remember = ref<boolean>(false);
    let loading = ref<boolean>(false);
    const refsLi = ref<HTMLElement[] | null>([]);

    let userCredentials = reactive<User>({
      name: '',
      address: 'Ferghana city',
      phone: '',
      login: '',
      password: '',
      role: 'admin',
    })

    //METHODS
    watch(()=> userCredentials.password, (newVal, oldVal)=>{
        checkPswValidation(newVal);
    });

    const checkPswValidation = ((psw:string)=>{
      if(utils.strLength(psw) >= 8 && utils.strLength(psw) <= 20) makeColorPositive('len');
      else makeColorNegative('len');

      if(utils.containsNumber(psw)) makeColorPositive('num');
      else makeColorNegative('num');

      if(utils.containsUppercase(psw)) makeColorPositive('upp');
      else makeColorNegative('upp');

      if(utils.containsLowercase(psw)) makeColorPositive('low');
      else makeColorNegative('low');

      if(utils.containsSymbol(psw)) makeColorPositive('sym');
      else makeColorNegative('sym');
    });

    const makeColorPositive = ((pref:string)=>{
      refsLi.value?.forEach((el:HTMLElement)=>{
        if(el.getAttribute('datatype')===pref){
          el.style.color = 'limeGreen';
        }
      })
    });

    const makeColorNegative = ((pref:string)=>{
      refsLi.value?.forEach((el:HTMLElement)=>{
        if(el.getAttribute('datatype')===pref){
          el.style.color = 'fireBrick';
        }
      })
    });

    function showValidationText():void{
      showValidation.value = true;
    }

    function signUp():void{
      loading.value = true;
      if (confirmPsw.value != userCredentials.password){
        notify.warn(i18n.t('captions.l_confirm_password_wrong'));
        loading.value = false;
        return;
      } else {
        axios.post(apiUrl.value, userCredentials)
          .then( response =>{
            if (remember.value){
              cookies.setUserLogin(userCredentials.login);
            } else {
              cookies.deleteUserLogin();
            }

            store.commit('vuexModule/setUser', response.data.user);
            router.push('/');
          }).catch( error =>{
          notify.fail(error.response.data);
        }).finally(()=>{
          loading.value = false;
        })
      }
    }

    return {
      passwordRegExp,
      refsLi,
      validationTextArr,
      confirmPsw,
      checkPsw,
      messageDialog,
      showValidation,
      slide,
      isPwd,
      userCredentials,
      remember,
      loading,
      checkPswValidation,
      showValidationText,
      signUp
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
