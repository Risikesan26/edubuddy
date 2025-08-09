const API_BASE = process.env.REACT_APP_API_BASE; // set on Vercel

export async function askEduBuddy(prompt) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return res.json();
}
