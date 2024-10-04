import Link from "next/link";
import { AdminConfig, ORMAdapter } from "../types";
import AdminLayout from "./AdminLayout";
import ModelPage from "./ModelPage";
import { Card, CardHeader } from "./ui/card";

interface AdminPanelProps {
  ormAdapter: ORMAdapter;
  config: AdminConfig
  params?: {
    admin?: string[];
  };
  searchParams?: {
    [key: string]: string | string[];
  },
}

export function AdminPanel({ ormAdapter, config, params, searchParams }: AdminPanelProps) {
  const modelNames = Object.keys(config.models);
  
  function getModelMetadata(modelName: string) {
    const metaData = config.models[modelName];
    return { name: modelName, fields: metaData?.meta?.fields || [] };
  }

  return (
    <AdminLayout modelNames={modelNames}>
      <div className="p-6">
        {params?.admin ? (
          <ModelPage modelMetadata={getModelMetadata(params.admin[0] as string)} />
        ) : ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelNames.map((modelName) => (
              <Link key={modelName} href={`/admin/${modelName}`}>
                <Card className="cursor-pointer hover:shadow-lg">
                  <CardHeader>{config.models[modelName]?.label || modelName}</CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}