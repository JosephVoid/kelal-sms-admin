"use client";
import { useAsync } from "@/utils/useAsync";
import fetchAccountsAdminAction from "../lib/actions/fetch-accounts-admin.action";
import AdminDataTable from "../components/AdminDataTable";

export default function AccountsPage() {
  const { data, loading } = useAsync(fetchAccountsAdminAction, true, []);

  return <div>{data && <AdminDataTable rows={data} loading={loading} />}</div>;
}
