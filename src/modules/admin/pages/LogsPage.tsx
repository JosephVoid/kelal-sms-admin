"use client";
import { useAsync } from "@/utils/useAsync";
import fetchLogsAdminAction from "../lib/actions/fetch-logs-admin.action";
import AdminDataTable from "../components/AdminDataTable";

export default function LogsPage() {
  const { data, loading } = useAsync(fetchLogsAdminAction, true, []);

  return (
    <div>
      <AdminDataTable rows={data ?? []} loading={loading} />
    </div>
  );
}
