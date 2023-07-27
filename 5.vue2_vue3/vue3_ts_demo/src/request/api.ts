import service from ".";

interface LoginData {
  userName: string,
  password: string
}


export function login(data: LoginData) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export function getGoodsList() {
  return service({
    url: '/getGoodsList',
    method: 'get'
  })
}