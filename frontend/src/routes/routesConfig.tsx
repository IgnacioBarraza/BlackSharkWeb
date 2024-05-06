import { Login } from "../auth/login";
import { Register } from "../auth/register";
import { Homepage } from "../shared/homepage";
import { Gallery } from "../shared/gallery";

export const routes = [
  {
    path: '/',
    component: <Homepage />
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/signup',
    component: <Register />
  },
  {
    path: '/gallery',
    component: <Gallery />
  }
]