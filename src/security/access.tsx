import type { ReactNode } from "react";
import { usePermissions } from "ra-core";

export type AdminRole = "client" | "admin" | "superadmin";

export const useCurrentRole = () => {
  const { permissions, isPending } = usePermissions<AdminRole>();
  return {
    role: permissions,
    isPending,
  };
};

export const CanAccess = ({
  roles,
  children,
  fallback = null,
}: {
  roles: AdminRole[];
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const { role, isPending } = useCurrentRole();

  if (isPending) return null;
  if (!role || !roles.includes(role)) return <>{fallback}</>;

  return <>{children}</>;
};
