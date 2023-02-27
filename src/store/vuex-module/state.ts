import {FormBean} from "components/models";

export interface ExampleStateInterface {
  locales: number | string | object[],
  userLocale: string | null,
  user: object | null,
  color: string | null,
  staffs: FormBean[],
  staff_id: number
}

function state(): ExampleStateInterface {
  return {
    locales: [
      {name: 'Uzbek', locale: 'uz'},
      {name: 'Russian', locale: 'ru'},
      {name: 'English', locale: 'en'},
    ],
    userLocale: 'ru',
    user: null,
    color: null,
    staffs: [
      // {
      //   id: 1,
      //   fio: 'Jafar Orifov',
      //   position: 'Software Engineer',
      //   phone: '933745891',
      //   email: 'jafarchik9800@gmail.com',
      //   description: 'This is not required'
      // },
      // {
      //   id: 2,
      //   fio: 'Jack Smith',
      //   position: 'Data Engineer',
      //   phone: '995553332',
      //   email: 'Jack00@gmail.com',
      //   description: 'This is not required'
      // },
      // {
      //   id: 3,
      //   fio: 'Rosa Milson',
      //   position: 'Recruiter',
      //   phone: '954586666',
      //   email: 'Rosa555@gmail.com',
      //   description: 'This is not required'
      // }
    ],
    staff_id: 1
  }
}

export default state;
