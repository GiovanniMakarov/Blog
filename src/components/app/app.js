import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";

import { getUserDataByToken, loadCurrentArticle } from "../../redux/actions/actions";
import Header from "../header";
import Error from "../error";
import { FeedPage, ArticlePage, SignInPage, CreateAccountPage, EditAccountPage, CreateArticlePage } from "../pages";

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
      <Route path="/" element={<AppLayout />} errorElement={<Error />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/articles" element={<FeedPage />} />
        <Route
          path="/articles/:slug"
          element={<ArticlePage />}
          loader={async ({ params }) => {
            await dispatch(loadCurrentArticle(params.slug));
            return null;
          }}
        />
        <Route path="/articles/:slug/edit" element={<CreateArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<CreateAccountPage />} />
        <Route path="/profile" element={<EditAccountPage />} />
        <Route path="/new-article" element={<CreateArticlePage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
