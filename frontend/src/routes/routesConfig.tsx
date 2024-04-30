import { Login } from "../auth/login";
import { Signup } from "../auth/signup";
import { HomePage } from "../shared/homepage";

const routes = [
  {
    path: '/',
    component: <HomePage />
    // protection: 
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/signup',
    component: <Signup />
  }
]

export default routes