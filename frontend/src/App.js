import { Route, Routes } from "react-router";
import React, { Suspense } from "react";
import * as Loader from "react-loader-spinner";

import Layout from "./components/layout/Layout";

import { Provider } from "react-redux";
import store from "./store";

const Home = React.lazy(() => import("./pages/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App = () => {
  const style = { display: "flex", justifyContent: "center" };

  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div style={style}>
            <Loader.TailSpin color="#4c4c4c" height={70} width={70} />
          </div>
        }
      >
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;
