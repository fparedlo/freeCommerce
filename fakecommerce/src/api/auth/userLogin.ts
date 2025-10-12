export default async function userLogin(
  user: string,
  password: string,
): Promise<object> {
  try {
    const response = await fetch(import.meta.env.VITE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: password,
        expiresInMins: 30,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return response;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return {};
  }
}
