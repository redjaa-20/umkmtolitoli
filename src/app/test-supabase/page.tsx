import { createClient } from "src/lib/supabase/server";

export default async function TestSupabase() {
  try {
    const supabase = await createClient();

    // Uji koneksi sederhana (misalnya cek user) yang tidak butuh tabel khusus
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full p-6 rounded-xl bg-white shadow-lg border border-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Uji Koneksi Supabase
          </h1>

          <div className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="font-bold flex-1">✅ Klien Berhasil Diinisiasi!</p>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Integrasi Next.js dan Supabase berhasil terhubung.
            </p>

            <div className="bg-white/50 p-3 rounded text-xs overflow-x-auto text-gray-700">
              <span className="font-semibold block mb-1">Status Auth:</span>
              {user ? (
                <span>Login sebagai: {user.email}</span>
              ) : (
                <span>Belum ada user login (ini normal).</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full p-6 rounded-xl bg-white shadow-lg border border-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Uji Koneksi Supabase
          </h1>

          <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
            <p className="font-bold mb-2">
              ❌ Gagal terhubung atau inisiasi klien.
            </p>
            <p className="text-sm opacity-90 mb-4 font-mono bg-red-100/50 p-2 rounded">
              {err instanceof Error ? err.message : String(err)}
            </p>
            <div className="text-sm">
              <p className="font-bold mb-1">Langkah perbaikan:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>
                  Pastikan file{" "}
                  <code className="bg-red-100 px-1 rounded">.env.local</code>{" "}
                  sudah diisi nilai URL dan Key.
                </li>
                <li>
                  Hentikan terminal (
                  <code className="bg-red-100 px-1 rounded">Ctrl+C</code>).
                </li>
                <li>
                  Jalankan ulang{" "}
                  <code className="bg-red-100 px-1 rounded">npm run dev</code>.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
