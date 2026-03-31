import { Badge } from "@/components/ui/badge";
import { useFieldValue } from "ra-core";
import type { FieldProps } from "@/lib/field.type";

const toBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  }
  if (typeof value === "number") return value === 1;
  return false;
};

export interface BooleanBadgeFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType> {
  trueLabel?: string;
  falseLabel?: string;
}

export const BooleanBadgeField = <
  RecordType extends Record<string, any> = Record<string, any>,
>(props: BooleanBadgeFieldProps<RecordType>) => {
  const value = useFieldValue({ source: props.source, record: props.record });

  if (value == null) return null;

  const checked = toBoolean(value);

  return (
    <Badge
      className={
        checked
          ? "border-emerald-200 bg-emerald-100 text-emerald-800"
          : "border-rose-200 bg-rose-100 text-rose-800"
      }
    >
      {checked ? (props.trueLabel ?? "Sí") : (props.falseLabel ?? "No")}
    </Badge>
  );
};
