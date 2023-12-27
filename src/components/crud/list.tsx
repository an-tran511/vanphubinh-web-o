import { Group, Stack, TextInput, Card, Box, Button, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  title: string;
}

export const List = (props: ListProps) => {
  const { title, children } = props;

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
        {children}
      </Card>
    </Stack>
  );
};
