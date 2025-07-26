import { GridColDef } from "@mui/x-data-grid";

export function flattenObject(
  obj: Record<string, any>,
  prefix = "",
  result: Record<string, any> = {}
): Record<string, any> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    // Preserve null values
    if (
      value === null ||
      Array.isArray(value) ||
      value instanceof Date ||
      typeof value !== "object"
    ) {
      result[newKey] = value;
    } else {
      flattenObject(value, newKey, result);
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
  console.log({ flatRow });
  return Object.keys(flatRow).map((flatKey) => {
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
