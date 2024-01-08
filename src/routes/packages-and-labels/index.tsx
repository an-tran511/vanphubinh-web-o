import { getPackagesAndLabels } from '@/apis/package-and-label';
import { queryOptions, useSuspenseQuery, keepPreviousData } from '@tanstack/react-query';
import { FileRoute, useNavigate } from '@tanstack/react-router';
import { DataTable } from 'mantine-datatable';
import { List } from '@components/crud/list';
import { useDebouncedValue } from '@mantine/hooks';
import { Box, Group, TextInput } from '@mantine/core';
import { z } from 'zod';
import classes from '@/components/table/Table.module.css';
import { useState } from 'react';

const packageSearchSchema = z.object({
  page: z.number().catch(1),
  searchValue: z.string().catch(''),
  // filter: z.string().catch(''),
  // sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
});

const packagesQueryOptions = (deps: string | object) =>
  queryOptions({
    queryKey: ['packages-and-labels', deps],
    queryFn: () => getPackagesAndLabels(deps),
    placeholderData: keepPreviousData,
  });

export const Route = new FileRoute('/packages-and-labels/').createRoute({
  component: ListComponent,
  validateSearch: packageSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
      page: search.page ?? 1,
      searchValue: search.searchValue ?? '',
    }),
  ],
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(packagesQueryOptions(deps)),
});

function ListComponent() {
  const { useSearch } = Route;
  const navigate = useNavigate();
  const { page, searchValue } = useSearch();
  const [searchValueDraft, setSearchValueDraft] = useState(searchValue ?? '');
  const [debouncedSearchValueDraft] = useDebouncedValue(searchValueDraft, 500);

  // useEffect(() => {
  //   navigate({
  //     search: (old) => {
  //       return {
  //         ...old,
  //         searchValue: debouncedSearchValueDraft,
  //         page: 1,
  //       };
  //     },
  //     replace: true,
  //   });
  // }, [debouncedSearchValueDraft]);

  // useEffect(() => {
  //   navigate({
  //     search: (old) => {
  //       return {
  //         ...old,
  //         page: page ?? 1,
  //       };
  //     },
  //   });
  // }, [page]);

  const packagesQuery = useSuspenseQuery(
    packagesQueryOptions({ page, searchValue: debouncedSearchValueDraft })
  );
  const packages = packagesQuery.data.data;
  const meta = packagesQuery.data.meta;
  const isLoading = packagesQuery.isFetching || packagesQuery.isLoading;
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
  ];

  const pagination = {
    page: meta.currentPage,
    lastPage: meta.lastPage,
    total: meta.total,
    onPageChange: (page: number) => {
      navigate({
        search: () => ({ page: page, searchValue: debouncedSearchValueDraft }),
      });
    },
    isLoading,
  };

  return (
    <List title="Sản phẩm bao bì" pagination={pagination}>
      <Box px="lg" my="lg" bg="white">
        <Group>
          <TextInput
            variant="default"
            placeholder="Tìm kiếm"
            value={searchValueDraft}
            onChange={(event) => setSearchValueDraft(event.currentTarget.value)}
          />
        </Group>
      </Box>
      {/* <Modal
        radius={0}
        classNames={{
          header: modalClasses.header,
          // root: modalClasses.root,
        }}
        size="55%"
        fullScreen
        opened={opened}
        onClose={close}
        title={<Title order={4}>Thêm bao bì</Title>}
      >
        <CreateComponent />
      </Modal> */}
      <DataTable
        withTableBorder
        minHeight={180}
        classNames={{
          root: classes.root,
          header: classes.header,
          table: classes.table,
        }}
        fetching={isLoading}
        highlightOnHover
        columns={columns}
        records={packages}
        verticalSpacing="sm"
        verticalAlign="top"
        noRecordsText="Không có dữ liệu"
      />
    </List>
  );
}
