import {Notify, useQuasar} from "quasar";
import i18n from "boot/i18n";

function containsNumber(str:string) {
  return /\d/.test(str);
}

function containsUppercase(str:string) {
  return /[A-Z]/.test(str);
}

function containsLowercase(str:string) {
  return /[a-z]/.test(str);
}

function containsSymbol(str:string) {
  return /[+\-!@#\$%\^&\*]/.test(str);
}

function strLength(str:string):number {
  return str.length;
}

function notifications(){
  const timeout:number = 2500;
  const success = (message:string) => {
    Notify.create({
      position: 'top',
      message: message,
      type: 'positive',
      timeout: timeout
    })
  }

  const info = (message:string) => {
    Notify.create({
      message: message,
      type: 'info',
      timeout: timeout
    })
  }

  const warn = (message:string) => {
    Notify.create({
      position: 'top',
      message: message,
      type: 'warning',
      timeout: timeout
    })
  }

  const fail = (message:string) => {
    Notify.create({
      position: 'top',
      message: message,
      type: 'negative',
      timeout: timeout
    })
  }

  const confirm = (title:string, message:string, yes:string, no:string, callback:()=>void)=>{;
    Notify.create({
      caption: title,
      message: message,
      timeout: 0,
      icon: 'mdi-comment-question-outline',
      color: 'primary',
      position: 'center',
      actions: [
        {label: no, color: 'white'},
        {label: yes, color: 'yellow', handler: callback},

      ]

    })
  }

  return { success, info, warn, fail, confirm}
}

export {
  containsNumber,
  containsLowercase,
  containsUppercase,
  strLength,
  containsSymbol,
  notifications,
}
