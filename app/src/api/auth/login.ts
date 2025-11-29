import type { UserInput, LoginResult } from "@/types";

export async function login({
  username,
  password,
  expiresInMins = 30,
}: UserInput): Promise<LoginResult> {
  try {
    if (username.length === 0 || password.length < 8) {
      throw new Error("Invalid User or Password");
    }

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
    console.error("Login error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
