"use client";
import { useAsync } from "@/utils/useAsync";
import AdminDataTable from "../components/AdminDataTable";
import fetchServicesAdminAction from "../lib/actions/fetch-services-admin.action";

export default function ServicesPage() {
  const { data, loading } = useAsync(fetchServicesAdminAction, true, []);

  return <div>{data && <AdminDataTable rows={data} loading={loading} />}</div>;
}
