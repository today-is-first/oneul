import { useUserStore } from "@/stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedLayout() {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/login" replace state={{ showAuthToast: true }} />;
  }
  return <Outlet />;
}
