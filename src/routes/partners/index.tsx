import { getPartners } from '@apis/partner';
import { queryOptions, useSuspenseQuery, keepPreviousData } from '@tanstack/react-query';
import { FileRoute, useNavigate } from '@tanstack/react-router';
import { DataTable } from 'mantine-datatable';
import { List } from '@components/crud/list';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { Badge, Box, Drawer, Group, TextInput } from '@mantine/core';
import { PartnerCreate } from './-components/create';
import { type Partner } from '@/app-types/partner';
import { z } from 'zod';
import classes from '@/components/table/Table.module.css';
import { useEffect, useState } from 'react';

const partnerSearchSchema = z.object({
  page: z.number().catch(1),
  searchValue: z.string().catch(''),
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
  preSearchFilters: [
    (search) => ({
      ...search,
      page: search.page ?? 1,
      searchValue: search.searchValue ?? '',
    }),
  ],
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(partnersQueryOptions(deps)),
  errorComponent: () => <div>error</div>,
});

function DashboardComponent() {
  const { useSearch } = Route;
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { page, searchValue } = useSearch();
  const [searchValueDraft, setSearchValueDraft] = useState(searchValue ?? '');
  const [debouncedSearchValueDraft] = useDebouncedValue(searchValueDraft, 500);

  useEffect(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          searchValue: debouncedSearchValueDraft,
          page: 1,
        };
      },
      replace: true,
    });
  }, [debouncedSearchValueDraft, navigate]);

  useEffect(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          page: page ?? 1,
        };
      },
    });
  }, [navigate, page]);

  const postsQuery = useSuspenseQuery(
    partnersQueryOptions({ page, searchValue: debouncedSearchValueDraft })
  );
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
        search: () => ({ page: page, searchValue: debouncedSearchValueDraft }),
      });
    },
    isLoading,
  };

  return (
    <List title="Đối tác" onCreateHandler={open} pagination={pagination}>
      <Box px={{ base: 'md', md: 'lg' }} pb="md" bg="white">
        <Group grow>
          <TextInput
            variant="default"
            w="100%"
            placeholder="Tìm kiếm"
            value={searchValueDraft}
            onChange={(event) => setSearchValueDraft(event.currentTarget.value)}
          />
        </Group>
      </Box>
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
