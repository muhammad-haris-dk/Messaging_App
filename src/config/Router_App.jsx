import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/signup";
import { Error } from "../pages/Error";
import { Messeaging_App } from "../pages/Messeaging_App";
import OS from "../userPages/OS";
import MS from "../userPages/MS";
import MH from "../userPages/MH";
import MF from "../userPages/MF";
import MFU from "../userPages/MFU";
import AQ from "../userPages/AQ";
import MT from "../userPages/MT";
import MR from "../userPages/MR";
import UR from "../userPages/UR";
import MA from "../userPages/MA";
import HR from "../userPages/HR";
import MI from "../userPages/MI";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="" element={<Messeaging_App />} />
    <Route element={<Messeaging_App />}>
      <Route path="Dashboard/OS" element={<OS />} />
      <Route path="Dashboard/MS" element={<MS />} />
      <Route path="Dashboard/MH" element={<MH />} />
      <Route path="Dashboard/MF" element={<MF />} />
      <Route path="Dashboard/MFU" element={<MFU />} />
      <Route path="Dashboard/AQ" element={<AQ />} />
      <Route path="Dashboard/MT" element={<MT />} />
      <Route path="Dashboard/MR" element={<MR />} />
      <Route path="Dashboard/UR" element={<UR />} />
      <Route path="Dashboard/MA" element={<MA />} />
      <Route path="Dashboard/HR" element={<HR />} />
      <Route path="Dashboard/MI" element={<MI />} />
    </Route>
      {/* <Route element={<Private_Routes />}>
        <Route path="" element={<ToDo_App />} />
      </Route> */}
      {/* <Route element={<Public_Routes />}> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      {/* </Route> */}
    </Route>
  )
);

export function Router_App() {
  return <RouterProvider router={router} />;
}
