// ------------------------------------------------------------

export const paths = {
  auth: {
    login: `/masuk`,
    register: `/daftar`,
  },
  mainpage: {
    root: "/",
    umkm: "/cari-umkm",
  },
  dashboard: {
    home: "/dashboard",
    pages: "/dashboard/pages",
    edit: (id: string) => `/dashboard/edit/${id}`,
    bookings: "/dashboard/bookings",
  },
};
