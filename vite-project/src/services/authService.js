// src/services/authService.js
export const API_URL = "http://127.0.0.1:8000/api";

export const getAccessToken = async () => {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  // Check kama access token ime-expire
  const isExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  if (!access || isExpired(access)) {
    try {
      const response = await fetch(`${API_URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!response.ok) throw new Error("Unable to refresh token");

      const data = await response.json();
      access = data.access;
      localStorage.setItem("access", access);
    } catch (err) {
      console.error("Token refresh failed:", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }
  }

  return access;
};
