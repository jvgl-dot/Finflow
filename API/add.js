const SUPABASE_URL = "https://rrtiyaepwrlerctqlkdf.supabase.co";
const SUPABASE_KEY = "sb_publishable_MkI4yZIf6zb7Obi9_5CXQA_iA8LR4Hu";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const input = req.query.q || '';
  const parts = input.split(',').map(p => p.trim());
  if (parts.length < 3) return res.status(400).json({ error: 'Format: name,category,amount' });
  const name = parts[0];
  const cat  = parts[1];
  const val  = parseFloat(parts[2]);
  const now  = new Date();
  const date = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ date, name, cat, val, type: 'Manual' })
  });
  const data = await response.json();
  if (!response.ok) return res.status(500).json({ error: 'Supabase error' });
  return res.status(200).json({ ok: true, message: `Added: ${name} R$ ${val} ${cat} ${date}` });
}
