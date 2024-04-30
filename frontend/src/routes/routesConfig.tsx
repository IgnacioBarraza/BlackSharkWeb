import { Login } from "../auth/login";
import { Register } from "../auth/register";
import { HomePage } from "../shared/homepage";

export const routes = [
  {
    path: '/',
    component: <HomePage />
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/signup',
    component: <Register />
  }
]