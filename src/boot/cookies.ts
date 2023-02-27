import {Cookies, useQuasar} from "quasar";

const WebCookies = {
  setUserLogin: function (val:string){
    Cookies.set('userLogin', val);
  },
  getUserLogin: function (){
    return Cookies.get('userLogin');
  },
  hasUserLogin(){
    return Cookies.has('userLogin');
  },
  deleteUserLogin(){
    Cookies.remove('userLogin');
  }
}

export { WebCookies as cookies };
