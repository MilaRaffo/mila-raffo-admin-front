import { useFieldValue } from "ra-core";
import type { FieldProps } from "@/lib/field.type";

const DEFAULT_START = 8;
const DEFAULT_END = 4;

export const ShortIdField = <
  RecordType extends Record<string, any> = Record<string, any>,
>({
  source,
  record,
  defaultValue,
  start = DEFAULT_START,
  end = DEFAULT_END,
}: ShortIdFieldProps<RecordType>) => {
  const value = useFieldValue({ source, record, defaultValue });

  if (value == null) {
    return null;
  }

  const id = String(value);
  if (id.length <= start + end + 1) {
    return <span className="font-mono text-xs">{id}</span>;
  }

  return (
    <span className="font-mono text-xs" title={id}>
      {`${id.slice(0, start)}...${id.slice(-end)}`}
    </span>
  );
};

export interface ShortIdFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType> {
  start?: number;
  end?: number;
}
