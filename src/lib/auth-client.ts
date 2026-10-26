import { createAuthClient } from "better-auth/react";

// Sans baseURL, le client appelle l'origine de la page : /api/auth sur le même site.
export const authClient = createAuthClient();
