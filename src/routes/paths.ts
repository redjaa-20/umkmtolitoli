// ------------------------------------------------------------

export const paths = {
  auth: {
    login: `/login`,
    register: `/register`,
  },
  mainpage: {
    root: "/",
    umkm: "/cari-umkm",
  },
  app: {
    home: "/home",
    pages: "/pages",
    edit: (id: string) => `/edit/${id}`,
    bookings: "/bookings",
  },
};
