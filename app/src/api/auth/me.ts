import type { MeResult } from "@/types";

export async function me(): Promise<MeResult> {
  try {
    const response = await fetch(import.meta.env.VITE_ME, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        success: false,
        error: `${response.status} - ${response.statusText}`,
      };
    }

    const data = await response.json();
    if (!data || typeof data !== "object") {
      return { success: false, error: "Invalid response format" };
    }
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
