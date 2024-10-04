'use client';

import { Toaster } from "sonner";
import AdminSidebar from "./AdminSidebar";
import { AdapterProvider } from "../context/adapterContext";
import { createItem } from "../actions/crudActions";

interface AdminLayoutProps {
  children: React.ReactNode;
  modelNames: string[];
}

export default function AdminLayout({ children, modelNames }: AdminLayoutProps) {
  const serializedAdapter = {
    create: createItem,
  }

  return (
    <>
      <AdapterProvider adapter={serializedAdapter}>
        <Toaster position="top-right" richColors closeButton />
        <div className="grid grid-cols-[280px_1fr] min-h-screen">
          <AdminSidebar modelNames={modelNames} />
          {children}
        </div>
      </AdapterProvider>
    </>
  );
}