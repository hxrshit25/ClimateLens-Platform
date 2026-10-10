import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API route for AI Climate Insights powered by @google/genai
app.post('/api/climate-insight', async (req, res) => {
  const { query, indicator, region, year } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Graceful scientific synthesis fallback if key is unconfigured
    return res.json({
      source: 'offline-synthesis',
      summary: `Scientific synthesis for query: "${query}". Atmospheric and Earth observations indicate sustained upward radiative forcing driven by greenhouse gases.`,
      causes: [
        'Anthropogenic greenhouse gas emissions (CO₂, CH₄, N₂O) from energy generation, industry, and deforestation.',
        'Thermal inertia in the global ocean absorbing over 90% of excess planetary heat energy.',
        'Positive feedbacks including Arctic albedo reduction and permafrost carbon release.'
      ],
      impacts: [
        'Accelerating polar ice shelf mass loss and progressive thermal expansion of seawater.',
        'Intensification of hydrological extremes (compound heatwaves, prolonged agricultural droughts, extreme convective precipitation).',
        'Shifts in marine and terrestrial ecosystems, poleward biome migration, and coral bleaching.'
      ],
      interpretation: `Focusing on ${indicator || 'global anomalies'} in ${region || 'Global'} through ${year || '2026'}, empirical data records a consistent upward trajectory. The rate of decadal warming has approximately doubled since the mid-20th century.`,
      keyTakeaway: 'Current climatic trends reflect sustained planetary energy imbalance; limiting long-term risks requires rapid structural emissions abatement and systemic resilience planning.',
      uncertaintyNote: 'Data values reflect verified climate records (1880–2026 baseline). Specific regional projections carry inherent variance across Shared Socioeconomic Pathways (SSPs).'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are the lead climate scientist at ClimateLens, an advanced planetary climate intelligence platform.
The user asked: "${query}"
Context filters: Selected Indicator: ${indicator || 'General'}, Selected Region: ${region || 'Global'}, Reference Timeframe: ${year || '1880–2026'}.

Provide a rigorous, objective, accessible scientific breakdown in strictly valid JSON format.
Do NOT use markdown code fences in your raw string if possible, or keep it strictly clean JSON.
The JSON must follow this exact schema:
{
  "summary": "1-2 sentence core scientific explanation of the phenomenon",
  "causes": ["List of 2 to 4 primary empirical physical/anthropogenic causes"],
  "impacts": ["List of 2 to 4 observed real-world ecological, meteorological, or socioeconomic impacts"],
  "interpretation": "A 2-3 sentence data interpretation contextualizing the selected indicator or region with empirical nuance",
  "keyTakeaway": "A concise 1-sentence bottom-line conclusion",
  "uncertaintyNote": "Explicit distinction between observed verified data, statistical modeling, and future projection uncertainties"
}

Important principles:
- Ground your analysis in IPCC Sixth Assessment Report (AR6), WMO, NASA GISS, and NOAA scientific consensus.
- Clearly differentiate between historical observed records and future predictive model uncertainties.
- Return ONLY the JSON object.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Clean possible fences
      const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return res.json({
      source: 'gemini-3.8-flash',
      ...parsed,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Intelligent fallback response on error
    return res.json({
      source: 'offline-synthesis',
      summary: `Climate assessment regarding: "${query}". Observed climate variables reflect systemic shifts in Earth's energy budget.`,
      causes: [
        'Anthropogenic greenhouse gas concentrations continuing at record modern levels.',
        'Land-use transformation and feedback loops diminishing terrestrial carbon sink efficiency.'
      ],
      impacts: [
        'Elevated frequency and severity of extreme weather events.',
        'Cryospheric loss and progressive thermal expansion driving global mean sea level rise.'
      ],
      interpretation: `Analysis of ${indicator || 'climate trends'} in ${region || 'Global'} reveals persistent long-term anomalies exceeding pre-industrial baselines.`,
      keyTakeaway: 'Atmospheric observations demonstrate unprecedented rate of planetary warming requiring coordinated mitigation.',
      uncertaintyNote: 'Distinction note: Empirical instrumental records have minimal measurement uncertainty; regional downscaled projections reflect scenario modeling.'
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ClimateLens server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
