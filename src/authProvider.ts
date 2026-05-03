import type { AuthProvider } from "ra-core";
import { authStorage } from "@/lib/auth-storage";
import { apiRequest } from "@/lib/http-client";
import type { AuthResponse, LoginDto } from "@/types/api";

export const authProvider: AuthProvider = {
  login: async (params) => {
    const payload: LoginDto = {
      email: params.email,
      password: params.password,
    };
    
    const response = await apiRequest<AuthResponse>("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true,
    });

    authStorage.set({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
  },

  logout: async () => {
    const session = authStorage.get();
    if (session?.accessToken) {
      try {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken: session.refreshToken }),
        });
      } catch {
        // No-op: limpieza local igual debe ocurrir.
      }
    }

    authStorage.clear();
  },

  checkAuth: async () => {
    const session = authStorage.get();
    if (!session?.accessToken) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      authStorage.clear();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const session = authStorage.get();
    if (!session?.user) {
      return Promise.reject();
    }

    return {
      id: session.user.id,
      fullName: `${session.user.name} ${session.user.lastName}`,
      avatar: undefined,
    };
  },

  getPermissions: async () => {
    const session = authStorage.get();
    return session?.user.role.name ?? null;
  },
};
