import { Outlet, RootRoute } from '@tanstack/react-router';
import { AppShell, Burger, Group, ScrollArea, Text, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { lighten } from '@mantine/core';

export const Route = new RootRoute({
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
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg={lighten('#E7F5FF', 0.9)}></AppShell.Navbar>
      <AppShell.Main h="100dvh">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
