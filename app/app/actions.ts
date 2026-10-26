"use server";

import { headers } from "next/headers";
import { DEFAULT_KIT, type BrandKit } from "../../src/lib/brand-kit";
import { getAuthHandle } from "../../src/lib/auth";
import { type KitSummary, createKit, deleteKit, getKit, listKits, saveKit } from "../../src/lib/kits";

/** Toutes les actions passent par ici : sans session, rien ne se lit ni ne s'écrit. Non exporté : c'est une action serveur publique. */
async function currentUser() {
  const { auth, db } = await getAuthHandle();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return { userId: session.user.id, db };
}

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Connexion requise.");
  return user;
}

export async function listMyKits(): Promise<KitSummary[]> {
  const { userId, db } = await requireUser();
  return listKits(db, userId);
}

export async function loadMyKit(id: string): Promise<BrandKit | null> {
  const { userId, db } = await requireUser();
  return getKit(db, userId, id);
}

export async function createMyKit(): Promise<string> {
  const { userId, db } = await requireUser();
  return createKit(db, userId, { ...DEFAULT_KIT, name: "Nouveau kit", client: "", description: "" });
}

export async function saveMyKit(id: string, kit: BrandKit): Promise<boolean> {
  const { userId, db } = await requireUser();
  return saveKit(db, userId, id, kit);
}

export async function deleteMyKit(id: string): Promise<boolean> {
  const { userId, db } = await requireUser();
  return deleteKit(db, userId, id);
}
