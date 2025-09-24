import { Outlet } from "react-router";
// import Footer from "../common/Footer";
// import Navbar from "../common/Navbar";

export const Layout = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </main>
  );
};
