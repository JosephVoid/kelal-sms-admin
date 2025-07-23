"use client";
import { useAsync } from "@/utils/useAsync";
import AdminDataTable from "../components/AdminDataTable";
import fetchUsersAdminAction from "../lib/actions/fetch-users-admin.action";

export default function UsersPage() {
  const { data, loading } = useAsync(fetchUsersAdminAction, true, []);

  return <div>{data && <AdminDataTable rows={data} loading={loading} />}</div>;
}
