// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic"

// admin de pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminWorkplaces from "../pages/Admin/Workplaces";


// Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

// OTRAS PAGINAS
import Error404 from "../pages/Error404";

// CONFIGURACION

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
          path: "/admin/login",
          component: AdminSignIn,
          exact: true
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true

      },
      {
        path: "/admin/workplaces",
        component: AdminWorkplaces,
        exact: true

      },
      {component: Error404}
    ]
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true
      },
      {
        path: "/contact",
        component: Contact,
        exact: true
      },      
      {component: Error404}
    ]
  }
];

export default routes