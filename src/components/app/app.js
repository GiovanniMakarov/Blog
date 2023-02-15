import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";

import Header from "../header";
import { FeedPage, ArticlePage } from "../pages";

// eslint-disable-next-line no-unused-vars
import classes from "./app.module.scss";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/articles" element={<FeedPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
