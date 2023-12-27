import { getPartners } from '@/apis/partner';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FileRoute } from '@tanstack/react-router';
import { DataTable } from 'mantine-datatable';
import { List } from '@/components/crud/list';
import '@/components/table/Table.module.css';

const postsQueryOptions = queryOptions({
  queryKey: ['partners'],
  queryFn: () => getPartners(),
});

export const Route = new FileRoute('/partners/').createRoute({
  component: DashboardComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  errorComponent: () => <div>error</div>,
});
function DashboardComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const partners = postsQuery.data.data;
  const columns = [
    {
      accessor: 'name',
      title: 'Tên',
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
  ];
  console.log(partners);

  return (
    <List title="Đối tác" onCreate>
      <DataTable
        styles={{
          header: {
            textTransform: 'uppercase',
            fontSize: '12px',
            backgroundColor: '#F9F9F9',
          },
        }}
        withTableBorder
        highlightOnHover
        columns={columns}
        records={partners}
        verticalSpacing="sm"
        verticalAlign="top"
      />
    </List>
  );
}
