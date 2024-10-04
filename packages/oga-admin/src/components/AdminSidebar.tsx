import Link from "next/link";

export default function AdminSidebar({ modelNames }: { modelNames: string[] }) {
  return (
    <div className="border-r border-muted/40 bg-muted/40">
      <div className="p-6">
        <Link href='/admin' className="h-16">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </Link>
      </div>
      <nav className="p-4 text-sm font-medium">
        {modelNames.map(modelName => (
          <Link 
            key={modelName} 
            className="hover:text-primary hover:bg-muted transition-all text-muted-foreground px-3 py-2 rounded-lg block"
            href={`/admin/${modelName}`}
          >
            {modelName}
          </Link>
        ))}
      </nav>
    </div>
  );
}