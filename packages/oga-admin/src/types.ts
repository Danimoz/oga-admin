
export interface ModelMetadata {
  name: string;
  fields: FieldMetadata[];
}

export interface FieldMetadata {
  name: string;
  type: string;
  kind: string;
  isId: boolean
  hasDefaultValue: boolean
  required: boolean;
  isRelation?: boolean;
}

export interface ListOptions {
  page: number;
  pageSize: number;
  filters?: Record<string, any>;
  sort?: { field: string; order: 'asc' | 'desc' };
}

export interface ListResult {
  items: any[];
  totalCount: number;
}

export interface ORMAdapter {
  create: (modelName: string, data: any) => Promise<any>;
  read: (modelName: string, id: string | number) => Promise<any>;
  update: (modelName: string, id: string | number, data: any) => Promise<any>;
  delete: (modelName: string, id: string | number) => Promise<void>;
  list: (modelName: string, options: ListOptions) => Promise<ListResult>;
}

export type SerializedAdapter  = Pick<ORMAdapter, 'create'>;

export interface AdminConfig {
  models: {
    [key: string]: {
      visible: boolean;
      label?: string;
      icon?: React.ReactNode;
      customComponents?: {
        list?: React.ComponentType;
        form?: React.ComponentType;
      };
      meta?: {
        fields?: FieldMetadata[];
      };
    };
  };
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  customRoutes?: {
    path: string;
    component: React.ComponentType;
  }[];
}

export interface AdminModelConfig {
  visible?: boolean;
  label?: string;
}

export interface GenerateAdminConfigOptions {
  include?: string[];
  exclude?: string[];
  modelConfigs?: {
    [key: string]: Partial<AdminModelConfig>;
  };
}
