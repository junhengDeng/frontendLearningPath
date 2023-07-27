export interface LoginFormInt {
  userName: string
  password: string
}
export class LoginData {
  ruleForm: LoginFormInt = {
    userName: '',
    password: ""
  }
}