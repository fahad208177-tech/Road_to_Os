// Road to O's: optional "deeper AI feedback" for student writing.
// A Cloudflare Worker that uses Workers AI (an open model run by Cloudflare). On Cloudflare's free plan
// there is a free daily allowance, so this costs nothing at small scale, and no API key lives in the app.
// Deploy: see server/README.md. Then put the Worker's URL in js/writing.js → CONFIG.aiUrl.
const MODEL = '@cf/meta/llama-3.1-8b-instruct';
const MAX_TEXT = 4000;
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', ...cors } });

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
    let body; try { body = await req.json(); } catch (e) { return json({ error: 'bad json' }, 400); }
    const task = body && body.task, text = String((body && body.text) || '').slice(0, MAX_TEXT);
    if (!task || !task.prompt || text.trim().split(/\s+/).length < 20) return json({ error: 'need a task and at least 20 words' }, 400);

    const system = `You are a kind, encouraging teacher marking a Cambridge O Level practice answer by a student aged 14-16 whose first language may not be English.
Write in simple English (short sentences, common words). Never be harsh. Do not rewrite the whole answer.
Reply in exactly this format:
What went well:
- (2 specific points, quoting the student's words)
How to improve:
1. (the most important change, with a short example of better wording)
2. (second change)
3. (third change)
${task.marks ? `Estimated mark: X out of ${task.marks} (say it is only an estimate).` : 'Overall: one encouraging sentence.'}`;
    const user = `Task (${task.type || 'writing'}, ${task.min}-${task.max} words${task.marks ? `, ${task.marks} marks` : ''}):\n${String(task.prompt).slice(0, 1500)}\n` +
      (Array.isArray(task.points) && task.points.length ? `Key points a good answer may include: ${task.points.slice(0, 8).join('; ')}\n` : '') +
      `\nStudent's answer:\n"""\n${text}\n"""`;
    try {
      const out = await env.AI.run(MODEL, { messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: 450, temperature: 0.3 });
      const feedback = String((out && out.response) || '').trim();
      if (!feedback) return json({ error: 'empty reply' }, 502);
      return json({ feedback });
    } catch (e) {
      return json({ error: 'AI unavailable, try later' }, 503); // e.g. the free daily allowance is used up
    }
  }
};
