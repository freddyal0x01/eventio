export let FRAGMENT_GET_ALL_USERS_WITH_SEARCH = ({
  search,
}: {
  search: string | undefined;
}) => ({
  role: "USER",
  OR: [
    {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      email: {
        contains: search,
        mode: "insensitive",
      },
    },
  ],
});
