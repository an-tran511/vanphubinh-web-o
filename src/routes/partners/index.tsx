import { getPartners } from '@/apis/partner';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FileRoute } from '@tanstack/react-router';
import { DataTable } from '@/components/table';
import { List } from '@/components/crud/list';

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
      accessorKey: 'name',
      header: 'Tên',
    },
    {
      accessorKey: 'phone',
      header: 'Số điện thoại',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address',
      header: 'Địa chỉ',
    },
  ];

  return (
    <List title="Đối tác">
      <DataTable data={partners} columns={columns} />
    </List>
  );
}
