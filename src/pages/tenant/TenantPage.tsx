import { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Form, Input, Table, Tag, Empty } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/PageHeader';
import { tenantApi } from '@/api/tenant';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { toast } from '@/utils/message';
import type { Tenant } from '@/types/tenant';
import type { BizError } from '@/api/client';
import './TenantPage.less';

const FormItem = Form.Item;

export default function TenantPage() {
  const { t } = useTranslation();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();

  useDocumentTitle(t('tenant.title'));

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    try {
      const data = await tenantApi.list();
      setTenants(data);
    } catch (err) {
      const bizErr = err as BizError;
      toast.error(bizErr.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleCreate = async (values: { name: string }) => {
    setCreateLoading(true);
    try {
      await tenantApi.create(values);
      toast.success(t('tenant.createSuccess'));
      setCreateVisible(false);
      form.resetFields();
      fetchTenants();
    } catch (err) {
      const bizErr = err as BizError;
      toast.error(bizErr.message || t('common.error'));
    } finally {
      setCreateLoading(false);
    }
  };

  const columns = [
    {
      title: t('tenant.name'),
      dataIndex: 'name',
    },
    {
      title: t('tenant.status'),
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="tenant-page">
      <PageHeader
        title={t('tenant.title')}
        extra={
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => setCreateVisible(true)}
          >
            {t('tenant.create')}
          </Button>
        }
      />

      {!loading && tenants.length === 0 ? (
        <div className="tenant-page__empty">
          <Empty description={t('tenant.noTenantsDesc')} />
          <Button
            type="primary"
            onClick={() => setCreateVisible(true)}
            style={{ marginTop: 16 }}
          >
            {t('tenant.create')}
          </Button>
        </div>
      ) : (
        <Table
          loading={loading}
          columns={columns}
          data={tenants}
          rowKey="id"
          pagination={false}
          border={false}
        />
      )}

      <Modal
        title={t('tenant.createTitle')}
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
        autoFocus={false}
        focusLock
      >
        <Form form={form} onSubmit={handleCreate}>
          <FormItem
            label={t('tenant.name')}
            field="name"
            rules={[{ required: true, message: t('tenant.nameRequired') }]}
          >
            <Input placeholder={t('tenant.namePlaceholder')} />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              long
              loading={createLoading}
            >
              {t('tenant.create')}
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}
