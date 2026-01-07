export default async function authFetch(
  url: string,
  options = { headers: {} }
) {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
}
