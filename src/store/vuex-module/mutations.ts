import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserLocale(state, value:string){
    state.userLocale = value;
  },
  setUser(state, value:object){
    state.user = value;
  },
  setColor(state, value){
    state.color = value;
  },
  clearUser(state){
    state.user = null;
  },
  setStaffs(state, value){
    state.staffs.unshift(value);
  },
  setStaffID(state){
    state.staff_id ++;
  },
  deleteStaff(state, index){
    state.staffs.splice(index, 1);
  },
  updateStaff(state, value){
    state.staffs = state.staffs.map(staff => staff.id !== value.id ? staff : value);
  }
};

export default mutation;
