import { getPartners } from '@apis/partner';
import { queryOptions, useSuspenseQuery, keepPreviousData } from '@tanstack/react-query';
import { FileRoute, useNavigate } from '@tanstack/react-router';
import { DataTable } from 'mantine-datatable';
import { List } from '@components/crud/list';
import { useDisclosure } from '@mantine/hooks';
import { Badge, Drawer, Group } from '@mantine/core';
import { PartnerCreate } from './-components/create';
import { type Partner } from '@/app-types/partner';
import { z } from 'zod';
import classes from '@/components/table/Table.module.css';

const partnerSearchSchema = z.object({
  page: z.number().catch(1),
  // filter: z.string().catch(''),
  // sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
});

const partnersQueryOptions = (deps: string | object) =>
  queryOptions({
    queryKey: ['partners', deps],
    queryFn: () => getPartners(deps),
    placeholderData: keepPreviousData,
  });

export const Route = new FileRoute('/partners/').createRoute({
  component: DashboardComponent,
  validateSearch: partnerSearchSchema,
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(partnersQueryOptions(deps)),
  errorComponent: () => <div>error</div>,
});

function DashboardComponent() {
  const { useSearch } = Route;
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { page } = useSearch();
  const postsQuery = useSuspenseQuery(partnersQueryOptions({ page }));
  const partners = postsQuery.data.data;
  const meta = postsQuery.data.meta;
  const isLoading = postsQuery.isFetching || postsQuery.isLoading;
  const columns = [
    {
      accessor: 'id',
      title: 'ID',
    },
    {
      accessor: 'name',
      title: 'Tên đối tác',
    },
    {
      accessor: 'phone',
      title: 'Số điện thoại',
    },
    {
      accessor: 'email',
      title: 'Email',
    },
    {
      accessor: 'address',
      title: 'Địa chỉ',
    },
    {
      accessor: '',
      title: 'Loại đối tác',
      render: (record: Partner) => {
        return (
          <Group gap="xs">
            {record.isCustomer ? (
              <Badge color="rgba(181, 163, 25, 1)" variant="light" size="sm">
                Khách hàng
              </Badge>
            ) : (
              <></>
            )}
            {record.isSupplier ? (
              <Badge color="dark" variant="light" size="sm">
                Nhà cung cấp
              </Badge>
            ) : (
              <></>
            )}
          </Group>
        );
      },
    },
  ];

  const pagination = {
    page: meta.currentPage,
    lastPage: meta.lastPage,
    total: meta.total,
    onPageChange: (page: number) => {
      navigate({
        search: () => ({ page: page }),
      });
    },
    isLoading,
  };

  return (
    <List title="Đối tác" onCreateHandler={open} pagination={pagination}>
      <DataTable
        withTableBorder
        minHeight={180}
        classNames={{
          header: classes.header,
          table: classes.table,
        }}
        fetching={isLoading}
        highlightOnHover
        columns={columns}
        records={partners}
        verticalSpacing="sm"
        verticalAlign="top"
        noRecordsText="Không có dữ liệu"
      />
      <Drawer opened={opened} onClose={close} title="Tạo đối tác" position="right">
        <PartnerCreate closeModalCallback={close} />
      </Drawer>
    </List>
  );
}
