export interface User {
  name?: string;
  address?: string,
  phone?: string,
  role?: string,
  login: string,
  password: string;
  remember?: boolean;
  language?: string;
}

export interface FormBean {
  id: number | null,
  fio: string | null,
  position: string | null,
  phone: string | null,
  email: string | null,
  description?: string | null
}
