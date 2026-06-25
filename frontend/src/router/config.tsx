import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Layout from "../components/feature/Layout";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import Services from "../pages/services/page";
import Projects from "../pages/projects/page";
import ProjectDetailPage from "../pages/projects/detail/page";
import Contact from "../pages/contact/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/detail/page";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedRoute from "../pages/admin/ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminServices, { AdminServiceForm } from "../pages/admin/AdminServices";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminProjectForm from "../pages/admin/AdminProjectForm";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:slug",
        element: <ProjectDetailPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/services",
            element: <AdminServices />,
          },
          {
            path: "/admin/services/new",
            element: <AdminServiceForm />,
          },
          {
            path: "/admin/services/:id",
            element: <AdminServiceForm />,
          },
          {
            path: "/admin/projects",
            element: <AdminProjects />,
          },
          {
            path: "/admin/projects/new",
            element: <AdminProjectForm />,
          },
          {
            path: "/admin/projects/:id",
            element: <AdminProjectForm />,
          },
          {
            path: "/admin/messages",
            element: <AdminMessages />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;