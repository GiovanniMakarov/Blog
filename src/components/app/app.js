import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";

import { getUserDataByToken } from "../../redux/actions/actions";
import Header from "../header";
import { FeedPage, ArticlePage, SignInPage, CreateAccountPage, EditAccountPage } from "../pages";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDataByToken());
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/articles" element={<FeedPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<CreateAccountPage />} />
        <Route path="/profile" element={<EditAccountPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
