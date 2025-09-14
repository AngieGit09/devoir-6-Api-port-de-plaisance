const API = ""; // même origine (car tu sers /front via Express)

async function http(path, { method = "GET", body } = {}) {
  const r = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(await r.text().catch(() => `HTTP ${r.status}`));
  const ct = r.headers.get("content-type") || "";
  return ct.includes("json") ? r.json() : r.text();
}

// Auth simplissime
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}
function setUser(u) {
  localStorage.setItem("user", JSON.stringify(u));
}
function requireAuth() {
  if (!getUser()) location.href = "index.html";
}

async function doLogin(email, password) {
  const res = await http("/login", {
    method: "POST",
    body: { email, password },
  });
  setUser(res.user); // { email, name }
}
async function doLogout() {
  try {
    await http("/logout");
  } catch {}
  localStorage.removeItem("user");
  location.href = "index.html";
}
