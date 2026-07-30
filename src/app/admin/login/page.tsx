"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ApiError } from "@/lib/api/client";
import { loginAdmin } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const tokens = await loginAdmin(
        String(form.get("email")),
        String(form.get("password")),
      );
      setTokens(tokens.access_token);
      router.push("/admin");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Identifiants invalides");
        } else {
          setError(`Erreur serveur (${err.status}). Réessayez.`);
        }
      } else {
        setError("Impossible de joindre le serveur. Vérifiez que l'API est en ligne.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-[#E8B923] font-bold text-[#0D0D0F]">
            N
          </span>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">Moviecam Admin</h1>
            <p className="text-sm text-zinc-500">Connexion administrateur</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-zinc-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue="admin@moviecam.ma"
              required
              className="border-zinc-300 bg-white text-zinc-900"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-zinc-700">
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="border-zinc-300 bg-white text-zinc-900"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}
