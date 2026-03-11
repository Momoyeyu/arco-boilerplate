import { useTranslation } from 'react-i18next';
import { Form, Input } from '@arco-design/web-react';
import UserAvatar from '@/components/UserAvatar';
import { useAuthStore } from '@/stores/authStore';
import './ProfileTab.less';

const FormItem = Form.Item;

export default function ProfileTab() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <div className="profile-tab">
      <div className="profile-tab__user-card">
        <UserAvatar
          username={user.username}
          avatarUrl={user.avatar_url}
          size={64}
        />
        <div>
          <div className="profile-tab__user-name">{user.username}</div>
          <div className="profile-tab__user-email">{user.email}</div>
        </div>
      </div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <FormItem label={t('settings.emailLabel')}>
          <Input value={user.email} disabled />
        </FormItem>
        <FormItem label={t('settings.usernameLabel')}>
          <Input value={user.username} disabled />
        </FormItem>
      </Form>
    </div>
  );
}
