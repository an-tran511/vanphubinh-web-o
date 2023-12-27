import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { AppShell, Burger, Group, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { QueryClient } from '@tanstack/react-query';

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(1024)})`);
  return (
    <AppShell
      layout="alt"
      header={{ height: 60, collapsed: !isMobile }}
      navbar={{ width: 250, breakpoint: 'md', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ boxShadow: 'var(--mantine-shadow-md)' }}></AppShell.Navbar>
      <AppShell.Main h="100dvh" bg="white">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
