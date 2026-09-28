import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import useUserStore from "../store/users-store";
import { USER_ROLES } from "../types/default-type";

interface AdminRouteProps {
  children?: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const role = useUserStore((state) => state.currentUser?.role);

  if (role !== USER_ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}