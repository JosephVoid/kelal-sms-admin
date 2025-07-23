import { GridColDef } from "@mui/x-data-grid";

export function flattenObject(
  obj: Record<string, any>,
  prefix = "",
  result: Record<string, any> = {}
): Record<string, any> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function buildMUIColumns(rows: Record<string, any>[]): GridColDef[] {
  if (!rows || rows.length === 0) return [];

  const flatRow = flattenObject(rows[0]);

  return Object.keys(flatRow).map((flatKey) => {
    const label =
      flatKey
        .split(".")
        .pop()
        ?.replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()) || flatKey;

    return {
      field: flatKey,
      headerName: flatKey,
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const value = getNestedValue(params.row, flatKey);
        return typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : String(value ?? "");
      },
    } satisfies GridColDef;
  });
}
