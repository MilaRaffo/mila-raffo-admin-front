import {
    BooleanInput,
    BooleanBadgeField,
    Create,
    DataTable,
    Edit,
    EditButton,
    List,
    ReferenceInput,
    Show,
    ShowButton,
    ShortIdField,
    SimpleForm,
    TextField,
    TextInput,
    AutocompleteInput,
} from "@/components/admin";
import { validators } from "@/lib/validators";
import { useRecordContext } from "ra-core";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const LeatherImageThumb = () => {
    const record = useRecordContext<{ hex?: string }>();
    if (!record?.hex) {
        return <span className="text-xs text-muted-foreground">Sin color</span>;
    }
    return (
        <div
            className="h-12 w-12 rounded-md border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: record.hex }}
            title={record.hex}
        />
    );
};

const ColorPreview = () => {
    const record = useRecordContext<{ hex?: string }>();
    if (!record?.hex) {
        return <span className="text-xs text-muted-foreground">Sin color</span>;
    }
    return (
        <div className="flex items-center gap-2">
            <div
                className="h-6 w-6 rounded border-2 border-gray-300 shadow-sm"
                style={{ backgroundColor: record.hex }}
            />
            <span className="text-sm font-mono">{record.hex}</span>
        </div>
    );
};

const ColorPickerInput = () => {
    const record = useRecordContext<{ hex?: string }>();
    const { watch, setValue } = useFormContext();
    const [localHex, setLocalHex] = useState<string>(() => {
        // Inicializar con el valor del record si está editando, o valor por defecto
        return record?.hex && record.hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) 
            ? record.hex 
            : '#000000';
    });

    // Sincronizar cuando el record cambia (en edición)
    useEffect(() => {
        if (record?.hex && record.hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            setLocalHex(record.hex);
        }
    }, [record?.hex]);

    // Observar cambios en el formulario
    const formHex = watch('hex');
    useEffect(() => {
        if (formHex && formHex !== localHex) {
            setLocalHex(formHex);
        }
    }, [formHex]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHex = e.target.value; // Viene con # (ej: #FF0000)
        setLocalHex(newHex);
        // Actualizar el formulario con el valor completo incluyendo #
        setValue('hex', newHex, { shouldValidate: true, shouldDirty: true });
    };

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Permitir cualquier entrada mientras se escribe
        setLocalHex(value);
        
        // Actualizar el formulario si es válido o está vacío
        if (value === '' || value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            setValue('hex', value, { shouldValidate: true, shouldDirty: true });
        }
    };

    const isValidHex = localHex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

    return (
        <div className="space-y-4">
            <div className="flex items-end gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Color Picker</label>
                    <input
                        type="color"
                        value={isValidHex ? localHex : '#000000'}
                        onChange={handleColorChange}
                        className="h-12 w-20 cursor-pointer rounded border-2 border-gray-300 shadow-sm"
                    />
                </div>
                <div className="flex-1">
                    <label className="text-sm font-semibold">Código Hexadecimal</label>
                    <input
                        type="text"
                        value={localHex}
                        onChange={handleHexChange}
                        placeholder="#000000"
                        className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Preview</label>
                    <div
                        className="h-12 w-20 rounded-lg border-2 border-gray-300 shadow-md transition-all"
                        style={{ backgroundColor: isValidHex ? localHex : '#ccc' }}
                        title={isValidHex ? localHex : 'Hex inválido'}
                    />
                </div>
            </div>
        </div>
    );
};

const ColorDisplay = () => {
    const record = useRecordContext<{ hex?: string; name?: string }>();
    if (!record?.hex) {
        return <span className="text-sm text-muted-foreground">Sin color asignado</span>;
    }
    return (
        <div className="flex flex-col gap-3">
            <div
                className="h-32 w-full rounded-lg border-4 border-gray-300 shadow-lg transition-all hover:shadow-xl"
                style={{ backgroundColor: record.hex }}
            />
            <div className="flex items-center gap-3">
                <div
                    className="h-8 w-8 rounded border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: record.hex }}
                />
                <div>
                    <p className="font-mono text-lg font-bold">{record.hex}</p>
                    <p className="text-sm text-muted-foreground">{record.name}</p>
                </div>
            </div>
        </div>
    );
};

export const LeatherList = () => (
    <List title="Colores">
        <DataTable>
            <DataTable.Col source="id" label="ID">
                <ShortIdField source="id" />
            </DataTable.Col>
            <DataTable.Col source="name" label="Nombre" />
            <DataTable.Col source="code" label="Código" />
            <DataTable.Col source="hex" label="Color">
                <ColorPreview />
            </DataTable.Col>
            <DataTable.Col source="isActive" label="Activo">
                <BooleanBadgeField source="isActive" trueLabel="Sí" falseLabel="No" />
            </DataTable.Col>
            <DataTable.Col label="Ver">
                <ShowButton />
            </DataTable.Col>
            <DataTable.Col label="Editar">
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const LeatherCreate = () => (
    <Create title="Crear color">
        <SimpleForm>
            <TextInput source="name" label="Nombre del color" validate={validators.leatherName} />
            <TextInput source="code" label="Código" validate={validators.leatherCode} />
            <TextInput 
                source="hex" 
                label="Código hexadecimal (generado automáticamente)" 
                defaultValue="#000000"
                validate={validators.leatherColor}
                hidden
            />
            <div className="mt-6 pt-4 border-t">
                <h3 className="mb-4 text-sm font-semibold">Seleccionar Color</h3>
                <ColorPickerInput />
            </div>
            <BooleanInput source="isActive" label="Activo" />
        </SimpleForm>
    </Create>
);

export const LeatherEdit = () => (
    <Edit title="Editar color">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nombre del color" validate={validators.leatherName} />
            <TextInput source="code" label="Código" validate={validators.leatherCode} />
            <TextInput 
                source="hex" 
                label="Código hexadecimal (generado automáticamente)" 
                validate={validators.leatherColor}
                hidden
            />
            <div className="mt-6 pt-4 border-t">
                <h3 className="mb-4 text-sm font-semibold">Seleccionar Color</h3>
                <ColorPickerInput />
            </div>
            <BooleanInput source="isActive" label="Activo" />
        </SimpleForm>
    </Edit>
);

export const LeatherShow = () => (
    <Show title="Detalle de color">
        <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Color</div>
                <ColorDisplay />
            </div>
            <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Información</div>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-xs text-muted-foreground">ID</div>
                        <TextField source="id" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Nombre</div>
                        <TextField source="name" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Código</div>
                        <TextField source="code" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Hexadecimal</div>
                        <TextField source="hex" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Activo</div>
                        <BooleanBadgeField source="isActive" trueLabel="Sí" falseLabel="No" />
                    </div>
                </div>
            </div>
        </div>
    </Show>
);