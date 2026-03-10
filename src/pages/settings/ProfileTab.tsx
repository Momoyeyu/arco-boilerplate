import { useState } from 'react';
import { Form, Input, Button } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import UserAvatar from '@/components/UserAvatar';
import { useAuthStore } from '@/stores/authStore';
import { userApi } from '@/api/user';
import { toast } from '@/utils/message';
import type { BizError } from '@/api/client';
import './ProfileTab.less';

const FormItem = Form.Item;

export default function ProfileTab() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (!user) return null;

  const handleSave = async (values: { nickname: string }) => {
    setLoading(true);
    try {
      const updated = await userApi.updateProfile({ nickname: values.nickname });
      updateUser(updated);
      toast.success(t('settings.profileUpdated'));
    } catch (err) {
      const bizErr = err as BizError;
      toast.error(bizErr.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-tab">
      <div className="profile-tab__user-card">
        <UserAvatar
          username={user.username}
          nickname={user.nickname}
          avatarUrl={user.avatar_url}
          size={64}
        />
        <div>
          <div className="profile-tab__user-name">{user.nickname || user.username}</div>
          <div className="profile-tab__user-email">{user.email}</div>
        </div>
      </div>
      <Form
        form={form}
        initialValues={{ nickname: user.nickname || '' }}
        onSubmit={handleSave}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <FormItem label={t('settings.nickname')} field="nickname">
          <Input placeholder={t('settings.nicknamePlaceholder')} />
        </FormItem>
        <FormItem label={t('settings.emailLabel')}>
          <Input value={user.email} disabled />
        </FormItem>
        <FormItem label={t('settings.usernameLabel')}>
          <Input value={user.username} disabled />
        </FormItem>
        <FormItem label={t('settings.roleLabel')}>
          <Input value={user.role} disabled />
        </FormItem>
        <FormItem wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('settings.saveChanges')}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
