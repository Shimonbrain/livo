export interface AppStateI{
  loginForm: LoginForm
}

export interface LoginForm{
  status?: string,
  auth_token?: string,
  email?: string,
  customer_id?: number,
  customer?: Customer,
}

export interface Customer{
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  billing: Billing,
  shipping: Shipping
}
export interface Billing{
  first_name:string,
  last_name:string,
  address_1:string,
  address_2:string,
  email:string,
  city:string,
  state:string,
  country:string,
  postcode:string,
  phone:string,
}
export interface Shipping{
  first_name:string,
  last_name:string,
  address_1:string,
  address_2:string,
  city:string,
  state:string,
  country:string,
  postcode:string,
}
