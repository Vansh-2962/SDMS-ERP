import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return {
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken),
    setAuth,
    clearAuth,
  };
}
