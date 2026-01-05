export const ROUTES = {
  main: "/",
  notFound: "/not-found",
  login: "/login",
  register: "/register",
  forgot: "/forgot",

  spaces: {
    index: ({ spaceId }: { spaceId: string }) => `/spaces/${spaceId}`,
    pages: ({ spaceId, pageId }: { spaceId: string; pageId: string }) =>
      `/spaces/${spaceId}/pages/${pageId}`,
  },
} as const;

export const PARAMS = {
  activePanel: "panel",
  filter: "flr",
};
