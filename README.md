🌍 ClimateLens — Climate Change Data Platform

Understand a changing planet. Explore climate data. Discover insights for a sustainable future.

ClimateLens is an interactive climate data platform designed to explore global climate indicators, compare regional trends, visualize environmental changes, and generate AI-powered climate insights.

🔗 Live Demo: https://climatelens-platform.onrender.com

---

✨ Features

- 🏠 Climate Dashboard — Explore key climate indicators and global trends.
- 🗺️ World Map — Navigate climate-related information across the globe.
- 📊 Data Explorer — Explore climate indicators and their trends.
- ⚖️ Compare — Compare regions and climate-related data.
- ⚠️ Climate Risks — Explore environmental risks and potential impacts.
- 🤖 AI Insights — Generate climate insights using Google's Gemini API.
- 📰 Articles — Access climate-related educational content.
- 📱 Responsive Interface — Explore the platform on supported desktop and mobile screens.

🛠️ Tech Stack

Technology| Purpose
React| User interface
TypeScript| Type-safe development
Vite| Development and build tooling
Tailwind CSS| Styling
Express.js| Backend API server
Google Gemini API| AI-powered climate insights
D3.js| Data visualization
Three.js| 3D graphics and visualization

📁 Project Structure

ClimateLens-Platform/
├── src/
│   ├── components/
│   ├── data/
│   ├── services/
│   ├── types/
│   ├── views/
│   ├── App.tsx
│   ├── config.ts
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts

🚀 Getting Started

Prerequisites

- Node.js and npm
- A Google Gemini API key for AI-powered functionality

Installation

1. Clone the repository:
   
   git clone https://github.com/hxrshit25/ClimateLens-Platform.git

2. Open the project directory:
   
   cd ClimateLens-Platform

3. Install dependencies:
   
   npm install

4. Configure environment variables using ".env.example" as a reference. Create a local ".env" file and add your own key:
   
   GEMINI_API_KEY=your_gemini_api_key

5. Start the development server:
   
   npm run dev

Production Build

Build the application:

npm run build

Start the production server:

npm run start

Ensure the dependencies are installed and the production build completes successfully before starting the server.

🔐 Environment Variables

Variable| Description
"GEMINI_API_KEY"| API key used by the backend for Gemini-powered insights

Security: Never commit your real API keys, credentials, or private environment files to GitHub. Configure production secrets through your hosting provider's environment settings.

☁️ Deployment

ClimateLens is deployed on Render.

Live application: https://climatelens-platform.onrender.com

The application uses a Node.js/Express server and a Vite-built frontend. Production deployment requires the frontend build output and the backend server to be configured correctly.

🎯 Project Goals

- Make climate-related information easier to explore.
- Support comparison and visualization of environmental indicators.
- Encourage climate awareness through accessible data and AI-assisted explanations.
- Provide a foundation for future climate-data features.

🔮 Future Improvements

- Integrate additional authoritative climate data sources.
- Add historical trends and richer interactive charts.
- Improve data provenance and source attribution.
- Expand regional comparison and climate-risk analysis.
- Improve accessibility, performance, and automated testing.

👨‍💻 Author

Harshit Sharma

GitHub: "@hxrshit25" (https://github.com/hxrshit25)

---

ClimateLens — Explore the data. Understand the change. Shape a sustainable future.
