// src/utils/prismaUtils.ts

import { AdminConfig, GenerateAdminConfigOptions, ModelMetadata } from "../types";
import { Prisma } from "@prisma/client";

export function getPrismaModelNames(): string[] {
  return Prisma.dmmf.datamodel.models.map(model => model.name);
}

export function getPrismaModelMetaDatas(): Record<string, any> {
  return Prisma.dmmf.datamodel.models.reduce((acc: any, model) => {
    acc[model.name] = {
      name: model.name,
      fields: model.fields.map(field => ({
        name: field.name,
        type: field.type,
        isId: field.isId,
        kind: field.kind,
        hasDefaultValue: field.hasDefaultValue,
        required: field.isRequired,
        isRelation: !!field.relationName,
      }))
    };
    return acc;
  }, {});
}

export function generateAdminConfigFromPrisma(
  options: GenerateAdminConfigOptions = {}
) {
  const modelNames = getPrismaModelNames();
  const modelMetaDatas = getPrismaModelMetaDatas();
  const config: AdminConfig["models"] = {};

  for (const modelName of modelNames) {
    // Check if the model should be included
    if (options.include && !options.include.includes(modelName)) {
      continue;
    }
    // Check if the model should be excluded
    if (options.exclude && options.exclude.includes(modelName)) {
      continue;
    }

    // Use provided config or default
    config[modelName] = {
      visible: true,
      label: modelName,
      meta: modelMetaDatas[modelName],
      ...(options.modelConfigs?.[modelName] || {})
    };
  }

  return { models: config };
}

export function mapPrismaTypeToFieldType(prismaType: string, fieldName: string): string {
  const typeMap: { [key: string]: string } = {
    'String': 'string',
    'Boolean': 'checkbox',
    'Int': 'number',
    'Float': 'number',
    'DateTime': 'date',
    // Add more mappings as needed
  };
  if (fieldName.includes('password')) return 'password';
  if (fieldName.includes('email')) return 'email';
  
  return typeMap[prismaType] || 'string';
}

export function getEditableFields(fields: ModelMetadata['fields']){
  return fields.filter(field => !field.isId && !field.hasDefaultValue && !field.isRelation);
}

export async function prismaCreate(prisma: any, modelName: string, data: any) {
  return await prisma[modelName].create({ data });
}