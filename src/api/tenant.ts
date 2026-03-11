import client from './client';
import type {
  TenantListItem,
  Tenant,
  TenantCreateRequest,
  TenantUpdateRequest,
} from '@/types/tenant';

export const tenantApi = {
  list() {
    return client.get<unknown, TenantListItem[]>('/tenant');
  },

  get(tenantId: string) {
    return client.get<unknown, Tenant>(`/tenant/${tenantId}`);
  },

  create(data: TenantCreateRequest) {
    return client.post<unknown, Tenant>('/tenant', data);
  },

  update(tenantId: string, data: TenantUpdateRequest) {
    return client.put<unknown, Tenant>(`/tenant/${tenantId}`, data);
  },
};
