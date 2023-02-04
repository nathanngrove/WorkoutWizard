import { createTRPCRouter } from "./trpc";
import { usersRouter } from "./routers/users.router";
import { sessionsRouter } from "./routers/sessions.router";
import { exercisesRouter } from "./routers/exercises.router";
import { templatesRouter } from "./routers/templates.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  sessions: sessionsRouter,
  exercises: exercisesRouter,
  templates: templatesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
