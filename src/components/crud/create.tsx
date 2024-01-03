import { Group, Stack, Box, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface CreateProps {
  children: ReactNode;
  title: string;
}

export const Create = (props: CreateProps) => {
  const { children, title } = props;
  return (
    <Stack px="lg" py="md">
      <Box bg="white">
        <Group justify="space-between" py={{ base: 'xs', md: 'sm' }}>
          <Group>
            <Title order={2}>{title}</Title>
          </Group>
        </Group>
      </Box>
      {children}
    </Stack>
  );
};
