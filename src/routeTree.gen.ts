import { Route as rootRoute } from "./routes/__root"
import { Route as PartnersIndexRoute } from "./routes/partners/index"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/partners/": {
      parentRoute: typeof rootRoute
    }
  }
}

Object.assign(PartnersIndexRoute.options, {
  path: "/partners/",
  getParentRoute: () => rootRoute,
})

export const routeTree = rootRoute.addChildren([PartnersIndexRoute])
