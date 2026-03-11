export interface TenantListItem {
  tenant_id: number;
  tenant_name: string;
  user_role: string;
}

export interface Tenant {
  id: number;
  name: string;
  status: string;
}

export interface TenantCreateRequest {
  name: string;
}

export interface TenantUpdateRequest {
  name?: string | null;
  status?: string | null;
}
