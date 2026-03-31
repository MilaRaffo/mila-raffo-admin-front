import { BooleanInput, TextInput } from "@/components/admin";
import { validators } from "@/lib/validators";
import { useGetOne, useRecordContext, useSourceContext } from "ra-core";
import { useFormContext } from "react-hook-form";

export const ProductCharacteristicValueInput = () => {
  const sourceContext = useSourceContext();
  const { watch } = useFormContext();
  const record = useRecordContext<{
    characteristicId?: string;
    dataType?: string;
    value?: string;
  }>();

  const characteristicSource = sourceContext.getSource("characteristicId");
  const watchedCharacteristicId = watch(characteristicSource) as
    | string
    | undefined;

  const selectedCharacteristicId =
    watchedCharacteristicId ?? record?.characteristicId;

  const { data: selectedCharacteristic } = useGetOne(
    "characteristics",
    { id: selectedCharacteristicId ?? "" },
    {
      enabled: Boolean(selectedCharacteristicId),
    },
  );

  const valueSource = sourceContext.getSource("value");

  const currentValue = watch(valueSource) as unknown;

  const isBooleanStringValue =
    currentValue === "true" || currentValue === "false";

  const dataType = String(
    record?.dataType ?? selectedCharacteristic?.dataType ?? "",
  )
    .toLowerCase()
    .trim();

  const isBoolean = dataType.includes("bool") ||
    (!dataType && isBooleanStringValue);

  if (isBoolean) {
    return (
      <div className="space-y-1">
        <BooleanInput
          source="value"
          label="Valor"
          helperText="Selecciona Sí o No"
          format={(value: unknown) => value === true || value === "true"}
          parse={(value: boolean) => (value ? "true" : "false")}
        />
      </div>
    );
  }

  return (
    <TextInput
      source="value"
      label="Valor"
      validate={validators.characteristicValue}
    />
  );
};
