import type { UserInput, LoginResult } from "@/types";

export async function login({
  username,
  password,
  expiresInMins = 30,
}: UserInput): Promise<LoginResult> {
  try {
    const response = await fetch(import.meta.env.VITE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins }),
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
    return { success: false, error: `${error}` };
  }
}
