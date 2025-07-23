"use client";
import { useAsync } from "@/utils/useAsync";
import AdminDataTable from "../components/AdminDataTable";
import fetchProvidersAdminAction from "../lib/actions/fetch-providers-admin.action";

export default function ProvidersPage() {
  const { data, loading } = useAsync(fetchProvidersAdminAction, true, []);

  return <div>{data && <AdminDataTable rows={data} loading={loading} />}</div>;
}
