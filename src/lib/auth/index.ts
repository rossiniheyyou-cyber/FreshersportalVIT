/**
 * Authentication placeholder — integrate NextAuth, Clerk, or custom JWT here.
 * Middleware and server actions can call getSession() once auth is implemented.
 */

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: "student" | "admin";
  };
} | null;

export async function getSession(): Promise<Session> {
  // TODO: Replace with real auth provider
  return null;
}

export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  // When auth is added, throw if !session || session.user.role !== "admin"
  return session;
}
