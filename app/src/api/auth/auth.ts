import type { UserInput, UserResult } from "@/types";

export async function auth({
  username,
  password,
}: UserInput): Promise<UserResult> {
  try {
    const response = await fetch(import.meta.env.VITE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
      credentials: "include",
    });

    if (!response.ok) {
      return {
        success: false,
        error: `${response.status} - ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
