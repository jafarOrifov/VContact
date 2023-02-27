import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import {FormBean} from "components/models";
import {log} from "util";

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  getLocales(state){
    return state.locales;
  },
  getUserLocale(state){
    return state.userLocale;
  },
  getUser(state){
    return state.user;
  },
  getColor(state){
    return state.color;
  },
  getStaffs : (state) => (filter:FormBean) => {
    let filteredStaffs:object[] = [];
    let flag = Object.values(filter).some((prop) => prop != '');

    if(flag){
      filteredStaffs = state.staffs.filter((staff)=>{
        let k: keyof typeof filter
        for (k in filter){
          if (filter[k]){
            if(staff[k] === undefined || !String(staff[k]).toLocaleLowerCase().includes(String(filter[k]).toLocaleLowerCase())){
              return false;
            }
          }
        }
        return true;
      })

      return filteredStaffs;
    }

    return state.staffs;
  },
  getStaffId(state){
    return state.staff_id;
  }
};

export default getters;
