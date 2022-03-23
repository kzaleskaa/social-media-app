import { Route, Routes } from "react-router";
import React, { Suspense } from "react";
import StartPage from "./pages/Start";
import * as Loader from "react-loader-spinner";

const SignUp = React.lazy(() => import("./components/forms/SignUp"));

const App = () => {
  const style = { display: "flex", justifyContent: "center" };

  return (
    <Suspense
      fallback={
        <div style={style}>
          <Loader.TailSpin color="#4c4c4c" height={70} width={70} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};

export default App;
