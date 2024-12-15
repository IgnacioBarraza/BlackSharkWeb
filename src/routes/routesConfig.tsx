import { Login } from "../auth/login";
import { Register } from "../auth/register";
import { Newpassword } from "../components/NewPassword/newpassword";
import { Recoverpassword } from "../components/RecoverPassword/recoverpassword";
import { Contact } from "../shared/contact";
import { Gallery } from "../shared/gallery/gallery";
import { Homepage } from "../shared/homepage";
import { Servicios } from "../shared/services/services";
import { Cart } from "../shared/shop/shoppingCart";
import { Tools } from "../shared/tools/tools";
import { MetricsDashboard } from "../shared/metrics/metricsDashboard";
import { MessageContact } from "../shared/messageContact";
import { Colaboration } from "../shared/Colaboration";
import { Notfound } from "../shared/notfound";
import AuthLayout from "@/auth/authLayout";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: '/auth',
    component: <AuthLayout />,
    routes: [
      {
        path: '',
        component: <Login />
      },
      {
        path: 'signup',
        component: <Register />
      }
    ]
  },
  {
    path: '/inicio',
    component: <Homepage />
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
    path: '/metrics',
    component: <MetricsDashboard />
  },
  {
    path: '/messagecontact',
    component: <MessageContact />
  },
  { 
    path: '/colaboration',
    component: <Colaboration />
  },
  {
    path: "/",
    component: <Navigate to="/inicio" />,
  },
  {
    path: '/404',
    component: <Notfound />
  },
  {
    path: "*",
    component: <Navigate to="/404" />,
  },
]