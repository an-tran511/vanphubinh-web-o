import {
  Center,
  Group,
  Pagination,
  Stack,
  TextInput,
  Text,
  Card,
  Box,
  Button,
  Title,
} from '@mantine/core';
import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  title: string;
  pagination?: {
    page: number;
    lastPage: number;
    onPageChange: (page: number) => void;
  };
}

export const List = (props: ListProps) => {
  const { title, children, pagination } = props;
  const { page, onPageChange, lastPage } = pagination ?? {};

  return (
    <Stack h={{ base: 'calc(100vh - 59px)', md: '100vh' }} gap="0">
      <Box
        px="xl"
        py="sm"
        bg="white"
        style={{
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Group justify="space-between" py="xs">
          <Group>
            <Title order={2}>{title}</Title>
          </Group>
          <Button variant="filled" justify="space-between">
            Thêm {title.toLowerCase()}
          </Button>
        </Group>
      </Box>
      <Box px="xl" pt="lg" bg="white">
        <Group justify="space-between">
          <Group grow>
            <TextInput variant="default" w={{ base: '100%' }} placeholder="Tìm kiếm" />
          </Group>
        </Group>
      </Box>
      <Card px="xl" py="lg" h="100%" mah="100%" bg="white">
        <Card
          p="0"
          withBorder
          h="100%"
          bg="white"
          style={{
            grow: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </Card>
      </Card>
      <Group px="xl" pb="lg" justify="space-between">
        <Text size="sm" c="dimmed">
          Hiện <b>10</b> trong tổng số <b>100</b>
        </Text>
        {page && onPageChange && lastPage ? (
          <Center>
            <Pagination.Root
              size="sm"
              total={10}
              style={{
                display: 'flex',
                alignContent: 'center',
              }}
            >
              <Group gap="sm">
                <Pagination.Previous onClick={() => onPageChange(page - 1)} />
                <Text size="sm">
                  {page} / {lastPage}
                </Text>
                <Pagination.Next onClick={() => onPageChange(page + 1)} />
              </Group>
            </Pagination.Root>
          </Center>
        ) : (
          <></>
        )}
      </Group>
    </Stack>
  );
};
