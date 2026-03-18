import { useGetList } from "ra-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KpiCard = ({ title, value }: { title: string; value: number }) => (
  <Card className="border-0 shadow-sm bg-card/90 backdrop-blur">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-extrabold tracking-tight">{value}</p>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: products = 0 } = useGetList("products", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  const { total: categories = 0 } = useGetList("categories", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  const { total: orders = 0 } = useGetList("orders", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  const { total: users = 0 } = useGetList("users", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

    const { total: leathers = 0 } = useGetList("leathers", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card/80 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Resumen operativo</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Panel de control</h1>
        <p className="text-sm text-muted-foreground mt-1">Visión rápida del estado actual de la tienda.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Usuarios" value={users} />
        <KpiCard title="Órdenes" value={orders} />
        <KpiCard title="Productos" value={products} />
        <KpiCard title="Cueros" value={leathers} />
        <KpiCard title="Categorías" value={categories} />
      </div>
    </div>
  );
};
