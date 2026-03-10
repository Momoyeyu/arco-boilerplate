import client from './client';
import type {
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from '@/types/user';

export const userApi = {
  getProfile() {
    return client.get<unknown, UserProfile>('/user/me');
  },

  updateProfile(data: UpdateProfileRequest) {
    return client.post<unknown, UserProfile>('/user/me', data);
  },

  changePassword(data: ChangePasswordRequest) {
    return client.post<unknown, null>('/user/password/change', data);
  },
};
