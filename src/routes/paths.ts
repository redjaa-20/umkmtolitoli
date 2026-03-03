// ------------------------------------------------------------

export const paths = {
  auth: {
    login: `/masuk`,
    register: `/daftar`,
    forgotPassword: `/lupa-kata-sandi`,
    resetPassword: `/atur-ulang-sandi`,
  },
  mainpage: {
    root: "/",
    umkm: "/cari-umkm",
  },
  dashboard: {
    root: "/dashboard",
    pages: "/dashboard/pages",
    edit: (id: string) => `/dashboard/edit/${id}`,
    bookings: "/dashboard/bookings",
  },
};
