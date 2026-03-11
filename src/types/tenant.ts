export interface Tenant {
  id: number;
  name: string;
  status: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface TenantCreateRequest {
  name: string;
}

export interface TenantUpdateRequest {
  name?: string | null;
  status?: string | null;
}
