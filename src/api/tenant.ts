import client from './client';
import type {
  Tenant,
  TenantCreateRequest,
  TenantUpdateRequest,
} from '@/types/tenant';

export const tenantApi = {
  list() {
    return client.get<unknown, Tenant[]>('/tenant');
  },

  get(tenantId: number) {
    return client.get<unknown, Tenant>(`/tenant/${tenantId}`);
  },

  create(data: TenantCreateRequest) {
    return client.post<unknown, Tenant>('/tenant', data);
  },

  update(tenantId: number, data: TenantUpdateRequest) {
    return client.put<unknown, Tenant>(`/tenant/${tenantId}`, data);
  },
};
