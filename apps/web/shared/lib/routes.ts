export const ROUTES = {
  main: "/",
  notFound: "/not-found",
  login: "/login",
  register: "/register",
  forgot: "/forgot",

  spaces: {
    index: ({ spaceId }: { spaceId: string }) => `/spaces/${spaceId}`,
    pages: ({ spaceId, page }: { spaceId: number; page: number }) =>
      `/spaces/${spaceId}/pages/${page}`,
  },
} as const;

export const PARAMS = {
  activePanel: "panel",
  filter: "flr",
};
