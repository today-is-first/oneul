import { useUserStore } from "@/stores/userStore";
import { FiLoader } from "react-icons/fi";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { user, isInitializing } = useUserStore();
  if (isInitializing) {
    return (
      <div className="flex h-full items-center justify-center">
        <FiLoader className="animate-spin text-3xl text-gray-500" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ showAuthToast: true }} />;
  }
  return <Outlet />;
}
