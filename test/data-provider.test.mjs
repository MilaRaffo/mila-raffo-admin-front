import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { SourceTextModule, SyntheticModule } from "node:vm";
import ts from "typescript";

test("user writes send DTO fields, excluding read-only data and update passwords", async () => {
    const requests = [];
    const httpClient = new SyntheticModule(["apiRequest"], function () {
        this.setExport("apiRequest", async (path, options) => {
            const body = JSON.parse(options.body);
            requests.push({ path, method: options.method, body });
            return { id: "user-id", ...body };
        });
    });
    const source = await readFile(new URL("../src/DataProvider.ts", import.meta.url), "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    const module = new SourceTextModule(outputText);
    await module.link((specifier) => {
        assert.equal(specifier, "@/lib/http-client");
        return httpClient;
    });
    await module.evaluate();
    const { dataProvider } = module.namespace;

    const editable = {
        name: "Updated",
        lastName: "User",
        email: "user@example.com",
        phone: "",
        roleId: "role-id",
    };
    const record = {
        id: "user-id",
        ...editable,
        role: "superadmin",
        isActive: true,
        addresses: [{ id: "address-id" }],
        password: "Password123!",
    };
    await dataProvider.update("users", { id: record.id, data: record, previousData: record });
    assert.deepEqual(requests.pop(), {
        path: "/users/user-id", method: "PATCH", body: editable,
    });

    await dataProvider.create("users", { data: record });
    assert.deepEqual(requests.pop(), {
        path: "/users", method: "POST", body: { ...editable, password: record.password },
    });

    await dataProvider.updateMany("users", {
        ids: ["first", "second"],
        data: { name: editable.name, phone: undefined, role: record.role, isActive: false },
    });
    assert.deepEqual(requests, ["first", "second"].map((id) => ({
        path: `/users/${id}`, method: "PATCH", body: { name: editable.name },
    })));
});
