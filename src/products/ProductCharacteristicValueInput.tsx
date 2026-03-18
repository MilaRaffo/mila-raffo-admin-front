import { BooleanInput, TextInput } from "@/components/admin";
import { validators } from "@/lib/validators";
import { useGetList, useRecordContext } from "ra-core";

export const ProductCharacteristicValueInput = () => {
  const record = useRecordContext<{
    characteristicId?: string;
    dataType?: string;
    value?: string;
  }>();

  const { data: characteristics = [] } = useGetList("characteristics", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "name", order: "ASC" },
  });

  const selectedCharacteristic = characteristics.find(
    (item) => item.id === record?.characteristicId,
  );

  const isBoolean =
    record?.dataType === "boolean" ||
    selectedCharacteristic?.dataType === "boolean";

  if (isBoolean) {
    return (
      <BooleanInput
        source="value"
        label="Valor"
        format={(value: unknown) => value === "true"}
        parse={(value: boolean) => (value ? "true" : "false")}
      />
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
