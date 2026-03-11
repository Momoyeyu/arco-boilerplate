import { Button } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './DashboardPage.less';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useDocumentTitle(t('dashboard.title'));

  const welcomeText = user?.nickname
    ? t('dashboard.welcome', { name: user.nickname })
    : t('dashboard.welcomeDefault');

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <h1 className="dashboard__title">{welcomeText}</h1>
        <p className="dashboard__subtitle">{t('dashboard.subtitle')}</p>
      </div>

      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-label">{t('settings.emailLabel')}</span>
          <span className="dashboard__stat-value">{user?.email || '—'}</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-label">{t('settings.usernameLabel')}</span>
          <span className="dashboard__stat-value">{user?.username || '—'}</span>
        </div>
        <div className="dashboard__stat-card">
          <span className="dashboard__stat-label">{t('settings.roleLabel')}</span>
          <span className="dashboard__stat-value">{user?.role || '—'}</span>
        </div>
      </div>

      <div className="dashboard__actions">
        <Button type="outline" onClick={() => navigate('/settings')}>
          {t('dashboard.editProfile')}
        </Button>
      </div>
    </div>
  );
}
