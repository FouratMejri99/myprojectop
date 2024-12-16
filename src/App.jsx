import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LogoAnimated from "./components/LogoAnimated";
import { ThemeProvider } from "./components/theme-provider";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/analytics/analytics";
import InvoicesPage from "./pages/invoices/invoices";
import EditProduct from "./pages/myproduct/editproduct/editproduct";
import NewProduct from "./pages/myproduct/NewProduct/NewProduct";
import RecipeReviewCard from "./pages/myproduct/products details/productsdetails";
import EnhancedTable from "./pages/myproduct/products/products";
import Orders from "./pages/Orders/Orders";
import { Protected } from "./pages/Protected";
const Topbar = lazy(() => import("./components/Nav/topbar/Topbar"));
const Sidebar = lazy(() => import("./components/Nav/sidebar/Sidebar"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/register/register"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const TnkersPro = lazy(() => import("./pages/TnkersPro/TnkersPro"));
const Tnkers = lazy(() => import("./pages/Tnkers"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Support = lazy(() => import("./pages/Support"));
const SettingsScreen = lazy(() =>
  import("./pages/settingsScreen/SettingsScreen")
);
const Account = lazy(() => import("./pages/TnkersPro/account/Account"));
const Plans = lazy(() => import("./pages/Plans"));
const ReNewPlan = lazy(() => import("./pages/ReNewPlan"));

const Layout = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex font-baloo2 relative">
        {/* Sidebar */}
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        {/* Main Content */}
        <div
          className={`w-full transition-all ${
            expanded ? "xl:pl-[250px]" : "xl:pl-[150px]"
          }`}
        >
          <Topbar />
          <div className="p-3 md:p-8 mt-6 md:mt-0">
            <Outlet />
          </div>
          <Toaster />
        </div>
      </div>
    </ThemeProvider>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Layout />
        </Protected>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/pros", element: <TnkersPro /> },
        { path: "/pros/:id", element: <Account /> },
        { path: "/clients", element: <Tnkers /> },
        { path: "/interventions", element: <Bookings /> },
        { path: "/analytics", element: <Home /> },
        { path: "/invoices", element: <InvoicesPage /> },
        { path: "/Products", element: <EnhancedTable /> },
        { path: "/newProducts", element: <NewProduct /> },
        { path: "/productdetails", element: <RecipeReviewCard /> },
        { path: "/editproduct", element: <EditProduct /> },
        { path: "/Orders", element: <Orders /> },
        { path: "/supprot", element: <Support /> },
        { path: "/settings", element: <SettingsScreen /> },
        { path: "/re-new-plan", element: <ReNewPlan /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/Plans",
      element: (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Protected>
            <Plans />
            <Toaster />
          </Protected>
        </ThemeProvider>
      ),
    },
    { path: "/login", element: <Login /> },
    {
      path: "/register",
      element: (
        <>
          <Register />
          <Toaster />
        </>
      ),
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="relative hidden h-full max-h-screen dark:border-r lg:flex justify-center">
          <LogoAnimated />
        </div>
      }
    >
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </Suspense>
  );
}

export default App;
