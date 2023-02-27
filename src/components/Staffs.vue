<template>
  <div class="q-pa-md">
    <q-table
      color="primary"
      card-class="text-primary bg-blue-1"
      table-class="text-primary bg-white"
      flat
      :grid="$q.screen.lt.sm"
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="single"
      v-model:selected="selected"
      style="height: calc(100vh - 90px)"
      :loading="loading"
      :pagination="pagination"
      class="sticky-last-column-table"
    >
      <template v-slot:top="props">
        <div class="fit row items-center">
          <div class="">
            <p>{{ $t('captions.l_Staffs') }}</p>

            <div class="row">
              <q-input
                dense class="q-mr-sm q-mb-sm"
                outlined v-model="filter.fio"
                :label="$t('captions.l_fio')"
              />
              <q-input
                dense class="q-mr-sm q-mb-sm"
                outlined v-model="filter.position"
                :label="$t('captions.l_position')"
              />

              <q-input
                dense class="q-mr-sm q-mb-sm"
                outlined v-model="filter.phone"
                :label="$t('captions.l_phone')"
                mask="(##) ### - ## - ##"
                unmasked-value
              />
              <q-input
                dense class=""
                outlined v-model="filter.email"
                :label="$t('captions.l_email')"
              />
            </div>
          </div>
          <q-space/>
          <q-btn-group>
            <q-btn @click="showDialog" icon="add" dense color="secondary"></q-btn>
          </q-btn-group>
        </div>
      </template>

      <template v-slot:body-cell-fio="props">
        <td :props="props" class="">
          <q-icon name="mdi-account" class="q-mr-xs" size="sm"></q-icon>
          <span class="text-bold">{{ props.row.fio }}</span>
        </td>
      </template>

      <template v-slot:body-cell-position="props">
        <td :props="props" class="">
          <q-icon name="mdi-account-box-outline" class="q-mr-xs" size="sm"></q-icon>
          <span class="text-bold text-black ">{{ props.row.position }}</span>
        </td>
      </template>

      <template v-slot:body-cell-phone="props">
        <td :props="props" class="">
          <q-icon name="mdi-phone-outline" class="q-mr-xs" size="sm"></q-icon>
          <span class="text-black">{{ phoneFormat(props.row.phone) }}</span>
        </td>
      </template>

      <template v-slot:body-cell-email="props">
        <td :props="props" class="">
          <q-icon name="mdi-email-outline" class="q-mr-xs" size="sm"></q-icon>
          <span class="text-black">{{ props.row.email }}</span>
        </td>
      </template>

      <template v-slot:body-cell-actions="props">
        <td :props="props" class="row items-center justify-end bg-yellow-1" style="min-width: 150px">
          <q-btn @click="editStaff(props.row)" icon="edit" size="sm" dense color="secondary" class="q-mr-sm"></q-btn>
          <q-btn @click="deleteStaff(props.row.id)" icon="delete" size="sm" dense color="negative"></q-btn>
        </td>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section class="bg-blue-1">
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'actions')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-section class="row justify-end"
                            v-if="props.cols.filter(col => col.name === 'actions').length>0">
              <q-btn @click="editStaff(props.row)" icon="edit" size="sm" dense color="secondary" class="q-mr-sm"></q-btn>
              <q-btn @click="deleteStaff(props.row.id)" icon="delete" size="sm" dense color="negative"></q-btn>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="formDialog" persistent>
      <q-card>
        <q-bar class="bg-primary text-white">
          <div>{{ defaultBean.id === null ? 'Add new staff' : 'Edit staff'}}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-form type="submit" @submit="onSubmit" style="width: 500px">
          <q-card-section>
           <div class="row q-col-gutter-sm q-mb-md">
             <q-input
               dense class="col-xs-12 col-sm-12 col-md-6"
               outlined v-model="defaultBean.fio"
               :label="$t('captions.l_fio')"
               lazy-rules
               :rules="[val => !!val || $t('captions.l_required_field') ]"
             />
             <q-input
               dense class="col-xs-12 col-sm-12 col-md-6"
               outlined v-model="defaultBean.position"
               :label="$t('captions.l_position')"
               lazy-rules
               :rules="[val => !!val || $t('captions.l_required_field') ]"
             />
           </div>
           <div class="row q-col-gutter-sm q-mb-md">
             <q-input
               dense class="col-xs-12 col-sm-12 col-md-6"
               outlined v-model="defaultBean.phone"
               :label="$t('captions.l_phone')"
               mask="(##) ### - ## - ##"
               unmasked-value
               lazy-rules
               :rules="[val => !!val && val.length === 9 || $t('captions.l_phone_example') ]"
             />
             <q-input
               dense class="col-xs-12 col-sm-12 col-md-6"
               outlined v-model="defaultBean.email"
               :label="$t('captions.l_email')"
               lazy-rules
               :rules="[val => !!val && ValidateEmail(val) || $t('captions.l_email_example') ]"
             />
           </div>
            <q-input
              dense outlined v-model="defaultBean.description"
              :label="$t('captions.l_description')"
            />
          </q-card-section>

          <q-separator color="primary"></q-separator>

          <q-card-section class="text-white" align="right">
            <q-btn flat color="primary" v-close-popup class="q-mr-md">Cancel</q-btn>
            <q-btn flat color="primary" type="submit">Save</q-btn>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch,} from 'vue';
import {useI18n} from "vue-i18n";
import { FormBean } from "components/models";
import {useStore} from "src/store";
import {notifications} from "src/utils";
import {log} from "util";

export default defineComponent({
  name: 'Staffs',
  props: {},
  setup(props) {
    const i18n = useI18n();
    const store = useStore();
    const notify = notifications();

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

    const columns = reactive<any>([
      {
        name: 'id',
        required: true,
        label: i18n.t('Id'),
        align: 'left',
        field: 'id',
        style: 'width: 5px',
        sortable: true
      },
      {
        name: 'fio',
        align: 'left',
        label: i18n.t('captions.l_fio'),
        field: 'fio',
        classes:'text-primary',
        sortable: true
      },
      {
        name: 'position',
        align: 'left',
        label: i18n.t('captions.l_position'),
        field: 'position',
        sortable: true
      },
      {
        name: 'phone',
        align: 'left',
        label: i18n.t('captions.l_phone'),
        field: 'phone'
      },
      {
        name: 'email',
        align: 'left',
        label: i18n.t('captions.l_email'),
        field: 'email'
      },
      {
        name: 'description',
        align: 'left',
        label: i18n.t('captions.l_description'),
        field: 'description'
      },
      {
        name: 'actions',
        label: i18n.t('captions.l_actions'),
      },
    ]);

    let formDialog = ref<boolean>(false);
    let loading = ref<boolean>(false);
    let selected = ref<object[]>([]);
    let defaultBean = reactive<FormBean>({
      id: null,
      fio: null,
      position: null,
      phone: null,
      email: null,
      description: null
    })

    let filter = reactive({
      fio: '',
      position: '',
      phone: '',
      email: ''
    })

    const rows = computed(()=>{
      return store.getters["vuexModule/getStaffs"]({...filter});
    })

    const pagination = reactive({
      sortBy: 'id',
      descending: true,
      page: 1,
      rowsNumber: rows.value.length,
      rowsPerPage: 10
    })


    // METHODS
    watch(filter, (newVal)=>{
      store.getters["vuexModule/getStaffs"]({...filter});
    })

    const showDialog = ()=> {
      let k: keyof typeof defaultBean
      for (k in defaultBean) {
        defaultBean[k] = null;
      }

      formDialog.value = true;
    }

    function ValidateEmail(email:string) {
      var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && email.match(validRegex)) return true;

      return false;
    }

    const closeDialog = ()=> {
      formDialog.value = false;
    }

    function editStaff(row:FormBean){
      defaultBean.id = row.id;
      defaultBean.fio = row.fio;
      defaultBean.position = row.position;
      defaultBean.phone = row.phone;
      defaultBean.email = row.email;
      defaultBean.description = row.description;

      formDialog.value = true;
    }

    const onSubmit = ()=> {
      loading.value = true;
      if (!defaultBean.id){
        defaultBean.id = store.getters["vuexModule/getStaffId"];
        store.commit('vuexModule/setStaffID');
        store.commit('vuexModule/setStaffs', {...defaultBean});
      } else {
        store.commit('vuexModule/updateStaff', {...defaultBean});
      }

      closeDialog();
      loading.value = false;
    }

    function deleteStaff(staff_id: number){
      const staffs = store.getters["vuexModule/getStaffs"]({});

      notify.confirm(
        i18n.t('VContact'),
        i18n.t('captions.l_you_really_want_to_delete'),
        i18n.t('captions.l_yes'),
        i18n.t('captions.l_no'),()=>{
        for(let i = 0; i < staffs.length; i++){
          if(staffs[i].id === staff_id){
            store.commit('vuexModule/deleteStaff', i);
          }
        }
      })
    }

    return{
      columns,
      rows,
      formDialog,
      defaultBean,
      selected,
      loading,
      pagination,
      filter,
      ValidateEmail,
      showDialog,
      onSubmit,
      deleteStaff,
      editStaff,
      phoneFormat
    }
  },
});
</script>

<style>
.sticky-last-column-table th:last-child, .sticky-last-column-table td:last-child {
  background-color: #f5f5dc;
}

.sticky-last-column-table td:last-child {
  position: sticky;
  right: 0;
  z-index: 1;
}

.sticky-last-column-table th:last-child {
  position: sticky;
  right: 0;
  z-index: 3;
}
</style>
