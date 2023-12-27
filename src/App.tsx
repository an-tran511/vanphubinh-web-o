import '@mantine/core/styles.css';
import { Loader, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Router, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Loader />
    </div>
  ),
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
