import { LoginForm } from "./Interfaces";

export class LoginUser {
  static readonly type = 'Login User';
  loginForm: LoginForm;
  constructor(loginForm: LoginForm) {
    this.loginForm = loginForm;
  }
}

export class LogoutUser {
  static readonly type = 'Logout User';
}
