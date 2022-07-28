import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../store/projects/pSlice";

/**
 * import Layouts
 */
import MainLayout from "../containers/Layouts/MainLayout";
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../containers/Views/Home";
import Dashboard from "../containers/Views/Dashboard";
import Admin from "../containers/Views/Admin";

const Router = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.pSlice.projects);
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, isLoggedIn]);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home projects={projects} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            {/* <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> */}
          </Route>
          {/* <Route path="/dashboard" element={<UserLayout />}>
            <Route path="" element={<Donation  />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
