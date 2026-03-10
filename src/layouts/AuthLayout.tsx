import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '@/components/ThemeToggle';
import LangSwitch from '@/components/LangSwitch';
import './AuthLayout.less';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="auth-layout">
      <div className="auth-layout__actions">
        <ThemeToggle />
        <LangSwitch />
      </div>
      <div className="auth-layout__card">
        <div className="auth-layout__logo">
          <img src="/favicon.svg" alt="Logo" />
          <h1>{t('app.name')}</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
