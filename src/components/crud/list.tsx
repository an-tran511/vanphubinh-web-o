import { Group, Stack, TextInput, Card, Box, Button, Title, Pagination, Text } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  title: string;
  onCreateHandler?: () => void;
  pagination?: {
    isLoading: boolean;
    total: number;
    page: number;
    lastPage: number;
    onPageChange: (page: number) => void;
  };
}

export const List = (props: ListProps) => {
  const { title, children, onCreateHandler, pagination } = props;
  const { page, onPageChange, lastPage, isLoading, total } = pagination ?? {};
  const navigate = useNavigate();
  const defaultHandleClick = () => navigate({ to: `create` });

  const createHandler =
    typeof onCreateHandler === 'function' ? onCreateHandler : defaultHandleClick;

  return (
    <Stack h={{ base: 'calc(100vh - 60px)', md: '100vh' }} p="0" gap="0">
      <Box
        px={{ base: 'md', md: 'lg' }}
        // py="sm"
        bg="white"
        style={{
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Group justify="space-between" py={{ base: 'xs', md: 'sm' }}>
          <Group>
            <Title order={2}>{title}</Title>
          </Group>
          <Button variant="filled" justify="space-between" onClick={createHandler}>
            Thêm {title.toLowerCase()}
          </Button>
        </Group>
      </Box>
      <Box px={{ base: 'md', md: 'lg' }} pt="md" bg="white">
        <Group grow>
          <TextInput variant="default" w="100%" placeholder="Tìm kiếm" />
        </Group>
      </Box>
      <Card pb="0" pt="md" px="0" h="100%" mah="100%" bg="white">
        {children}
      </Card>
      {page && onPageChange && lastPage && (
        <Box bg="white" px={{ base: 'md', md: 'lg' }}>
          <Group justify="space-between" py={{ base: 'xs', md: 'sm' }}>
            <Text size="sm" c="dimmed">
              Hiện{' '}
              <b>
                {(page - 1) * 30 + 1} - {page === lastPage ? total : page * 30}
              </b>{' '}
              trong tổng <b>{total}</b>
            </Text>
            <Pagination
              size="sm"
              disabled={isLoading}
              value={page}
              onChange={onPageChange}
              total={lastPage}
              withEdges
            />
          </Group>
        </Box>
      )}
    </Stack>
  );
};
