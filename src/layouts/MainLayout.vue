<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="row items-center justify-start">
<!--          <q-icon name="mdi-alpha-z-box" color="white" size="md"></q-icon>-->
          <span class="p-bold">VContact</span>
        </q-toolbar-title>

        <div>
          <q-btn color="white" size="xs" icon-right="mdi-menu-down" outline :label="language">
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
          <q-btn color="white" class="q-mx-md" outline rounded icon="mdi-account-outline" dense>
            <q-menu
              transition-show="rotate"
              transition-hide="rotate"
            >
              <q-list style="min-width: 200px" class="q-pa-sm">
                <div class="row justify-start items-center q-pa-sm">
                  <div style="border-radius: 50%; width: 55px; height: 55px; overflow: hidden" class="q-mr-md">
                    <q-img src="~src/assets/images/no-user-image-square.jpg" height="55" width="55"/>
<!--                    <q-img src="~src/assets/images/pngtree-luxurious-abstract-background-in-wavy-black-and-blue-gradations-picture-image_1207784.jpg" height="55" width="55"/>-->
                  </div>
                  <div class="row items-center" style="height: 55px">
                    <span class="text-bold">{{ userInfo.name }}<br><span class="text-grey-8">{{ userInfo.role }}</span></span>
                  </div>
                </div>
                <q-separator color=""></q-separator>
                <div>
                  <div class="row items-center q-my-sm">
                    <q-icon color="grey-8" name="mdi-home-outline" class="q-mx-sm" size="sm"></q-icon>
                    <span class="text-secondary">{{ userInfo.address }}</span>
                  </div>
                  <div class="row items-center">
                    <q-icon color="grey-8" name="mdi-phone-outline" class="q-mx-sm" size="sm"></q-icon>
                    <span class="text-secondary">{{ phoneFormat(userInfo.phone) }}</span>
                  </div>
                  <div class="row items-center cursor-pointer q-my-sm">
                    <q-icon color="grey-8" name="mdi-account-arrow-right-outline" class="q-mx-sm" size="sm"></q-icon>
                    <q-btn @click="logout" dense flat color="secondary">{{ $t('captions.l_logout') }}</q-btn>
                  </div>

                  <q-separator color=""></q-separator>

                  <div class="row items-center justify-evenly cursor-pointer q-my-sm">
                    <div class="color-block1" @click="changeColor('#3f3a72')"></div>
                    <div class="color-block2" @click="changeColor('#375e16')"></div>
                    <div class="color-block3" @click="changeColor('#6a224f')"></div>
                    <div class="color-block4" @click="changeColor('#193779')"></div>
                  </div>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-white text-bold row items-center"
        >
          <q-icon name="home" size="md" class="q-mr-md"></q-icon>
          Home
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {useI18n} from "vue-i18n";
import {useStore} from "src/store";
import {notifications} from "src/utils";
import BaseMixins from "src/mixins/BaseMixins.vue";
import {useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";
import {route} from "quasar/wrappers";
import axios from "axios";
import {cookies} from "boot/cookies";
import i18n from "boot/i18n";

export default defineComponent({
  name: 'MainLayout',
  mixins:[BaseMixins],
  components: {
    EssentialLink
  },

  setup (props, context) {
    const i18n = useI18n();
    const store = useStore();
    const notify = notifications();
    const route = useRoute();
    const router = useRouter();

    function phoneFormat(phone:string) {
      let retval;
      if (phone !== null) {
        if (phone.length === 9) {
          retval = "(" + phone.substring(0, 2) + ") " + phone.substring(2, 5) + "-" + phone.substring(5, 7) + "-" + phone.substring(7, 9)
        } else {
          retval = phone
        }
      } else {
        retval = " - "
      }
      return retval;
    }

    const linksList = [
      {
        title: i18n.t('captions.l_Staffs'),
        caption: "Staffs information",
        icon: 'mdi-account-multiple',
        link: {name: 'staffs'}
      },
    ];

    const userInfo = computed({
      get: function (){
        return store.getters["vuexModule/getUser"];
      },
      set: function (){
        store.commit('vuexModule/setUser', UserInfoBean);
      }
    })

    const leftDrawerOpen = ref(false);
    const UserInfoBean = reactive({});
    let language = computed<string>({
      get: function (){
        return i18n.locale.value;
      },
      set: function (locale){
        window.location.reload();
        store.commit('vuexModule/setUserLocale', locale);
        i18n.locale.value = locale;
      }
    })

    const changeColor = (color:string)=> {
      document.body.style.setProperty('--q-primary', color);

      store.commit('vuexModule/setColor', color);
    }

    const logout = ()=>{
      notify.confirm(
        i18n.t('VContact'),
        i18n.t('captions.l_you_really_want_to_exit'),
        i18n.t('captions.l_yes'),
        i18n.t('captions.l_no'),
        ()=>{
          store.commit('vuexModule/clearUser');
          router.push('/');
      })

      // router.beforeEach((to, from, next)=>{
      //   alert(to.path);
      // })
    }

    return {
      language,
      userInfo,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      phoneFormat,
      changeColor,
      logout,
    }
  }
});
</script>

<style scoped>
.color-block1{
  background: #3f3a72;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border:1px solid lightgrey;
}
.color-block2{
  background: #375e16;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border:1px solid lightgrey;
}
.color-block3{
  background: #6a224f;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border:1px solid lightgrey;
}
.color-block4{
  background: #193779;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border:1px solid lightgrey;
}
</style>
