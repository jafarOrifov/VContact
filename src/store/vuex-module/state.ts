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
    staffs: [],
    staff_id: 1
  }
}

export default state;
