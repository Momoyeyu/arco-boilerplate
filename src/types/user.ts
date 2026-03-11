export interface UserProfile {
  username: string;
  nickname: string | null;
  email: string;
  avatar_url: string | null;
  role: string;
  is_active: boolean;
}

export interface UpdateProfileRequest {
  avatar_url?: string | null;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}
