export const ROUTES = {
  main: "/",
  notFound: "/not-found",
  login: "/login",
  register: "/register",
  forgot: "/forgot",

  spaces: {
    index: ({ spaceId }: { spaceId: string }) => `/spaces/${spaceId}`,
    notes: ({ spaceId, noteId }: { spaceId: string; noteId: string }) =>
      `/spaces/${spaceId}/notes/${noteId}`,
  },
} as const;

export const PARAMS = {
  activePanel: "panel",
  filter: "flr",
};
