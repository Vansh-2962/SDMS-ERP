import { authClient } from "@/lib/auth.client";

export function useAuth() {
  const session = authClient.useSession();

  return {
    user: session.data?.user ?? null,
    session: session.data ?? null,
    isLoading: session.isPending,
    error: session.error,
    isAuthenticated: Boolean(session.data?.user),
    refetch: session.refetch,
  };
}
