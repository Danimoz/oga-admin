import { PrismaAdapter } from "./adapters/orm/PrismaAdapter";
import { generateAdminConfigFromPrisma } from "./lib/prismaUtils";
import { initializePrisma } from "./actions/crudActions";

// Components
export { AdminPanel } from "./components/AdminPanel";

// Adapters and Utilities
export { 
  PrismaAdapter,
  generateAdminConfigFromPrisma,
  initializePrisma,
};
