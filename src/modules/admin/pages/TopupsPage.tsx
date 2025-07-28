"use client";
import { useAsync } from "@/utils/useAsync";
import fetchTopupsAdminAction from "../lib/actions/fetch-topups-admin.action";
import AdminDataTable from "../components/AdminDataTable";

export default function TopupsPage() {
  const { data, loading } = useAsync(fetchTopupsAdminAction, true, []);

  return <div>{data && <AdminDataTable rows={data} loading={loading} />}</div>;
}
