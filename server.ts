import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Firm Knowledge System Prompt for Gemini AI Legal Assistant
const FIRM_SYSTEM_PROMPT = `
You are "Racheykaf AI Legal Concierge", an executive virtual legal assistant for Racheykaf Chamber, a premier Nigerian full-service commercial law firm located in Asokoro, Abuja FCT, Nigeria.

FIRM OVERVIEW:
- Business Name: Racheykaf Chamber (Barristers & Legal Consultants)
- Office Address: 102 PHDL Shopping Complex, Mambilla Barracks, Asokoro, Abuja FCT, Nigeria (Postal Code: 900211)
- Managing Partner: Mrs. Kate O. Olusuyi (LL.B, BL, LL.M, FCAI) - Senior Advocate & Corporate Governance Expert
- Practice Scope: 25 commercial practice areas including Corporate & Commercial, Commercial Litigation, Oil & Gas PIA 2021, Real Estate & Land Title Verification (AGIS), Tax, Employment (NICN), Government Regulatory & Legislative Drafting, Banking & Fintech.
- Core Contact: phone +234 803 311 9456, email info@racheykafchamber.com

KEY CAPABILITIES & INSTRUCTIONS:
1. Provide authoritative, concise, polite, and professional legal guidance about Nigerian law, corporate procedures (CAC, CAMA 2020), petroleum industry compliance (PIA 2021, NUPRC), real estate titles in Abuja (FCTA, AGIS), and retaining Racheykaf Chamber.
2. Whenever relevant, suggest specific website actions in bracket format so the UI can render interactive action buttons:
   - Action: Book Consultation -> render button to trigger consultation
   - Action: Fee Estimator -> render button to trigger online fee calculator
   - Action: View Practice -> render practice area link
   - Action: Contact Chambers -> navigate to contact section
3. Keep answers concise (2-4 paragraphs max), professional, clear, and scannable.
4. Always maintain confidentiality and state that AI chat provides general legal intelligence and institutional information, not formal legal opinion until a partner engagement agreement is executed.
`;

// API Route for AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: 'User message is required.' });
    }

    if (aiClient && process.env.GEMINI_API_KEY) {
      // Build context history for Gemini
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // System instruction passed via config or first message context
      const fullPrompt = `${FIRM_SYSTEM_PROMPT}\n\nUser Question: ${userMessage}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      });

      const replyText = response.text || "Thank you for contacting Racheykaf Chamber. How may we assist with your commercial legal mandate today?";
      return res.json({ reply: replyText });
    } else {
      // Intelligent Rule-based Knowledge Fallback engine when GEMINI_API_KEY is pending
      const lowerMsg = userMessage.toLowerCase();
      let reply = "";

      if (lowerMsg.includes('cac') || lowerMsg.includes('register') || lowerMsg.includes('company') || lowerMsg.includes('cama')) {
        reply = "Under CAMA 2020, company registration in Nigeria is managed via the Corporate Affairs Commission (CAC). Racheykaf Chamber assists with entity structuring, obtaining NIPC approvals, business permits, and expatriate quotas for foreign shareholders. [Action: View Practice: Corporate & Commercial] [Action: Book Consultation]";
      } else if (lowerMsg.includes('pia') || lowerMsg.includes('petroleum') || lowerMsg.includes('oil') || lowerMsg.includes('gas') || lowerMsg.includes('nuprc')) {
        reply = "Our Energy Practice specializes in Petroleum Industry Act (PIA 2021) compliance, including host community development trusts (HCDT), NUPRC/NMDPRA licensing, OML conversions, and gas commercialization contracts. [Action: View Practice: Oil, Gas & Energy Law] [Action: Book Consultation]";
      } else if (lowerMsg.includes('fee') || lowerMsg.includes('cost') || lowerMsg.includes('rate') || lowerMsg.includes('price') || lowerMsg.includes('retainer')) {
        reply = "Racheykaf Chamber offers transparent legal fee structures tailored to corporate complexity, including monthly retainer arrangements and fixed transaction pricing. You can calculate an instant estimate using our Fee Estimator tool. [Action: Fee Estimator] [Action: Book Consultation]";
      } else if (lowerMsg.includes('partner') || lowerMsg.includes('kate') || lowerMsg.includes('lawyer') || lowerMsg.includes('team') || lowerMsg.includes('leadership')) {
        reply = "Our legal practice is led by Mrs. Kate O. Olusuyi (LL.B, BL, LL.M, FCAI), a distinguished commercial lawyer and Fellow of the Corporate Governance Institute, alongside senior advocates handling high-stakes litigation and transactional mandates in Abuja. [Action: View Leadership]";
      } else if (lowerMsg.includes('property') || lowerMsg.includes('land') || lowerMsg.includes('agis') || lowerMsg.includes('title') || lowerMsg.includes('house')) {
        reply = "For real estate acquisitions in Abuja FCT, we conduct thorough search at AGIS (Abuja Geographic Information Systems), verify Certificate of Occupancy (C of O), draft conveyance deeds, and perfect Governor's Consent. [Action: View Practice: Real Estate & Land Titles] [Action: Book Consultation]";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('address') || lowerMsg.includes('phone') || lowerMsg.includes('office')) {
        reply = "Racheykaf Chamber is located at 102 PHDL Shopping Complex, Mambilla Barracks, Asokoro, Abuja FCT. You can call +234 803 311 9456 or email info@racheykafchamber.com. [Action: Contact Chambers]";
      } else {
        reply = "Thank you for inquiring with Racheykaf Chamber AI Legal Concierge. We assist clients across corporate law, commercial litigation, energy regulation, real estate titles, and government compliance in Nigeria. How may we assist with your mandate today? [Action: Book Consultation] [Action: View Practice Areas]";
      }

      return res.json({ reply });
    }
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      reply: "Racheykaf Chamber AI Concierge is currently processing high volume. Please click below to book a direct consultation with our legal team. [Action: Book Consultation]",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
