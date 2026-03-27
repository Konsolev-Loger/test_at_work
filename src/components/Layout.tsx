import { Outlet } from "react-router";
import Header from "../components/header/header";


export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
