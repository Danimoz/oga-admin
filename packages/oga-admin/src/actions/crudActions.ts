'use server';


let prismaInstance: any;

export function initializePrisma(prisma: any) {
  prismaInstance = prisma;
}

export async function createItem(modelName: string, data: any) {
  const model = prismaInstance[modelName];
  return await model.create({ data });
}