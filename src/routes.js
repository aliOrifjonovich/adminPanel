import { useRoutes, Navigate } from "react-router-dom";
import NotFound from "pages/NotFound/NotFound";
import MainLayout from "Layouts/MainLayout/MainLayout";
import Main from "pages/Main/Main";
import MainIndex from "pages/MainIndex/MainIndex";
import MainSingle from "pages/MainSingle/MainSingle";
import SettingsLayout from "Layouts/SettingLayout/SettingLayout";
import Protected from "helpers/Protected/Protected";
import Login from "pages/Login/Login";
import SettingLayout from "Layouts/SettingLayout/SettingLayout";
import SettingIndex from "pages/SettingIndex/SettingIndex";
import Setting from "pages/Setting/Setting";
import SettingSingle from "pages/SettingSingle/SettingSingle";

const hasToken = localStorage.getItem("token");

export const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: (
        <Protected isProtected={!hasToken}>
          <Navigate to="/main" replace />
        </Protected>
      ),
    },
    {
      path: "/main",
      element: (
        <Protected isProtected={!hasToken}>
          <MainLayout />
        </Protected>
      ),
      children: [
        {
          index: true,
          element: (
            <Protected isProtected={!hasToken}>
              <MainIndex />
            </Protected>
          ),
        },
        {
          path: ":tab_name",
          element: (
            <Protected isProtected={!hasToken}>
              <Main />
            </Protected>
          ),
          children: [
            {
              path: ":id",
              element: (
                <Protected isProtected={!hasToken}>
                  <MainSingle />
                </Protected>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/setting",
      element: (
        <Protected isProtected={!hasToken}>
          <SettingLayout />
        </Protected>
      ),
      children: [
        {
          index: true,
          element: (
            <Protected isProtected={!hasToken}>
              <SettingIndex />
            </Protected>
          ),
        },
        {
          path: ":tab_name",
          element: (
            <Protected isProtected={!hasToken}>
              <Setting />
            </Protected>
          ),
          children: [
            {
              path: ":id",
              element: (
                <Protected isProtected={!hasToken}>
                  <SettingSingle />
                </Protected>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: hasToken ? <Navigate to="/main" replace /> : <Login />,
    },
    // {
    //   path: "/blog",
    //   element: <Blog />,
    // },
    // {
    //   path: "/products",
    //   element: <ProductsLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Products />,
    //     },
    //     {
    //       path: ":id",
    //       element: <ProductsById />,
    //     },
    //   ],
    // },
    {
      path: "*",
      element: (
        <Protected isProtected={!hasToken}>
          <NotFound />
        </Protected>
      ),
    },
  ]);
