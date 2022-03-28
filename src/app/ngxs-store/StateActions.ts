import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { LoginUser, LogoutUser } from "./Store-Classes";
import { AppStateI } from "./Interfaces";

@State<AppStateI>({
  name: 'State',
  defaults:{
    loginForm: {}
  }
})

@Injectable({
  providedIn: 'root'
})
export class StateActions {

  constructor(private store: Store) { }

  @Action(LoginUser)
  loginUser(ctx: StateContext<any>, { loginForm }) {
    const currentState = ctx.getState();
    return ctx.setState({
      ...currentState,
      token: loginForm
    })
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<any>) {
    return ctx.setState({
      loginForm: null,
      token: null
    })
  }
}
