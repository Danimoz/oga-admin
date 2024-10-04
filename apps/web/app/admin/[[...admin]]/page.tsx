import { 
  AdminPanel, 
  generateAdminConfigFromPrisma, 
  initializePrisma, 
  PrismaAdapter
} from '@repo/oga-admin';
import '@repo/oga-admin/dist/styles.css';
import { prisma } from '../../../lib/prisma';
import { Suspense } from 'react';

interface AdminPageProps {
  params: {
    admin?: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
}

export default function AdminPage({ params, searchParams }: AdminPageProps) {
  const ormAdapter = new PrismaAdapter(prisma);
  const adminConfig = generateAdminConfigFromPrisma();
  initializePrisma(prisma);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPanel 
        ormAdapter={ormAdapter} 
        config={adminConfig}
        params={params}
        searchParams={searchParams}
      />
    </Suspense>
  );
}