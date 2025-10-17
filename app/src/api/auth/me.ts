import type { UserResult } from "@/types";

export async function me(token: string): Promise<UserResult> {
  try {
    const response = await fetch(import.meta.env.VITE_ME, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
