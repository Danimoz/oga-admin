import { ListOptions, ORMAdapter } from "../../types";

export class PrismaAdapter implements ORMAdapter {
  private prisma: any;

  constructor(prismaClient: any) {
    this.prisma = prismaClient;
  }

  async create(modelName: string, data: any) {
    return this.prisma[modelName].create({ data });
  }

  async read(modelName: string, id: string | number) {
    return this.prisma[modelName.toLowerCase()].findUnique({ where: { id } });
  }

  async update(modelName: string, id: string | number, data: any): Promise<any> {
    return this.prisma[modelName.toLowerCase()].update({ where: { id }, data });
  }

  async delete(modelName: string, id: string | number): Promise<void> {
    await this.prisma[modelName.toLowerCase()].delete({ where: { id } });
  }

  async list(modelName: string, options: ListOptions){
    const { page, pageSize, filters, sort } = options;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = this.buildFilters(filters);
    const orderBy = sort ? { [sort.field]: sort.order } : undefined;

    const [items, totalCount] = await Promise.all([
      this.prisma[modelName.toLowerCase()].findMany({ skip, take, where, orderBy }),
      this.prisma[modelName.toLowerCase()].count({ where }),
    ]);

    return { items, totalCount };
  }

  private buildFilters(filters?: Record<string, any>) {
    if (!filters) return {};

    const prismaFilters: Record<string, any> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'string') {
        prismaFilters[key] = { contains: value };
      } else {
        prismaFilters[key] = value;
      }
    }
    return prismaFilters;
  }
}