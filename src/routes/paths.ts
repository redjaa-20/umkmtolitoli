// ------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",
};

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
    root: `${ROOTS.DASHBOARD}`,
    business: {
      root: `${ROOTS.DASHBOARD}/usaha`,
      create: `${ROOTS.DASHBOARD}/usaha/tambah`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/usaha/ubah/${id}`,
    },
  },
};
