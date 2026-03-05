"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "src/lib/supabase/server";
import { paths } from "src/routes/paths";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(paths.dashboard.root);
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(paths.dashboard.root);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect(paths.auth.login);
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  // "origin" cannot be reliable accessed in Server Actions deployed differently
  // Usually this is handled via a client-side call or by passing the origin.
  // Instead, Next.js requires us to construct the callback URL relative or absolute.

  // Best practice for OAuth in Next.js Server Components / Actions
  // is often to do it Client-side for the redirect, or compute the absolute URL.
  // We'll compute it dynamically using headers:
  const headersList = await import("next/headers").then((m) => m.headers());
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${protocol}://${host}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  } else if (error) {
    console.error("Supabase OAuth Error:", error.message);
    redirect("/masuk?error=oauth_failed");
  }
}
