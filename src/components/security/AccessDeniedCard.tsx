import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AccessDeniedCard = ({ title }: { title: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">No tienes permisos para esta acción.</p>
    </CardContent>
  </Card>
);
