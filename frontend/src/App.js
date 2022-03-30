import { Route, Routes } from "react-router";
import React, { Suspense } from "react";
import { checkAuthentication, loadUser } from "./actions/auth";

import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import * as Loader from "react-loader-spinner";

import { connect } from "react-redux";
import Layout from "./components/layout/Layout";
import MainLayout from "./components/layout/MainLayout";

const Home = React.lazy(() => import("./pages/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App = (props) => {
  const style = { display: "flex", justifyContent: "center" };
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default connect(null, { checkAuthentication, loadUser })(App);
