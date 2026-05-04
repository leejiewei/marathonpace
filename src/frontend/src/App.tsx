import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const ActiveRunPage = lazy(() => import("@/pages/ActiveRun"));
const HistoryPage = lazy(() => import("@/pages/History"));
const RunDetailPage = lazy(() => import("@/pages/RunDetail"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense
      fallback={
        <div className="flex h-svh items-center justify-center bg-background">
          <Skeleton className="h-12 w-48" />
        </div>
      }
    >
      <Layout />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const activeRunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/run",
  component: ActiveRunPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage,
});

const runDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/$runId",
  component: RunDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  activeRunRoute,
  historyRoute,
  runDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
