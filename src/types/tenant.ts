export interface TenantListItem {
  tenant_id: string;
  tenant_name: string;
  user_role: string;
}

export interface Tenant {
  id: string;
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
