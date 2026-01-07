// export default async function authFetch(
//   url: string,
//   options = { headers: {}, method: "GET", body: undefined }
// ) {
//   const token = localStorage.getItem("token");
//   return fetch(url, {
//     ...options,
//     headers: { Authorization: `Bearer ${token}`, ...options.headers },
//   });
// }
export default async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
