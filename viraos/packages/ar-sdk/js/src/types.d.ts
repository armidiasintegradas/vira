export type BrandType = 'vira' | 'verdis' | 'replasticando' | 'reciclobike' | 'muta';
export type DataTier = 'homologado' | 'meta_produto' | 'exemplo_ilustrativo' | 'projeto_usuario';

export interface GovernanceMetadata {
  dataTier: DataTier;
  auditSource: string;
  accreditationNotice: string;
}

export interface GovernanceEnvelope<T> {
  status: number;
  timestamp: string;
  governance: GovernanceMetadata;
  data: T;
}

export interface ArClientOptions {
  apiKey?: string;
  baseUrl?: string;
  tenant?: string;
  brand?: BrandType;
}

export class ArClient {
  constructor(options?: ArClientOptions);
  materials: {
    list(): Promise<GovernanceEnvelope<any[]>>;
    get(id: string): Promise<GovernanceEnvelope<any>>;
  };
  projects: {
    list(): Promise<GovernanceEnvelope<any[]>>;
    create(data: any): Promise<GovernanceEnvelope<any>>;
  };
  compliance: {
    validate(solutionId: string): Promise<GovernanceEnvelope<any>>;
  };
  dpp: {
    verify(batchId: string): Promise<GovernanceEnvelope<any>>;
  };
  academy: {
    getTracks(): Promise<GovernanceEnvelope<any[]>>;
  };
}

export function createArClient(options?: ArClientOptions): ArClient;
