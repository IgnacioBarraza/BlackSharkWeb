import { Component } from "react";
import { Login } from "../auth/login";
import { Register } from "../auth/register";
import { Newpassword } from "../components/NewPassword/newpassword";
import { Recoverpassword } from "../components/RecoverPassword/recoverpassword";
import { Contact } from "../shared/contact";
import { Gallery } from "../shared/gallery/gallery";
import { Homepage } from "../shared/homepage";
import { Servicios } from "../shared/services/services";
import { Cart } from "../shared/shop/shoppingCart";
<<<<<<< HEAD
import { Tools } from "../shared/tools";
import { MessageContact } from "../shared/messageContact";
=======
import { Tools } from "../shared/tools/tools";
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713

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
  {
    path: '/servicios',
    component: <Servicios />
  },
  {
    path: '/recoverpassword',
    component: <Recoverpassword />
  },
  {
    path: '/newpassword',
    component: <Newpassword />
  },
  {
    path: '/cart',
    component: <Cart />
  },
  {
    path: '/tools',
    component: <Tools />
  },
  {
    path: '/messagecontact',
    component: <MessageContact />
  }
]