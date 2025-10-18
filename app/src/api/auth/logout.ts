export async function logout() {
  try {
    const response = await fetch(import.meta.env.VITE_AUTH + "/logout", {
      method: "POST",
      credentials: "include",
    });
    return { success: response.ok };
  } catch (error) {
    return { success: false, error };
  }
}
