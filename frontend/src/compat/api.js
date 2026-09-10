const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const nativeFetch = window.fetch.bind(window);

function resolveApiUrl(input) {
  if (typeof input !== "string" || !input.startsWith("/api")) return input;
  return apiBase ? `${apiBase}${input}` : input;
}

window.fetch = (input, init = {}) => nativeFetch(resolveApiUrl(input), {
  ...init,
  credentials: init.credentials || "include",
});