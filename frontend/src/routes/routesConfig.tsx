import { Login } from "../auth/login";
import { Register } from "../auth/register";
import { Contact } from "../shared/contact";
import { Gallery } from "../shared/gallery";
import { Homepage } from "../shared/homepage";

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
    path: '/contact',
    component: <Contact />
  },
  {
    path: '/gallery',
    component: <Gallery />
  },
]