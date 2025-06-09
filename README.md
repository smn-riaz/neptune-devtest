# Neptune Dev Test –

A simple web app designed for the Neptune Dev Test.  
Built with Next.js and TypeScript, this app accepts natural language queries and returns a synthesized list of service providers (dog groomers) with ratings, prices, and a custom Neptune Score. The UI is responsive and optimized for both desktop and mobile.

---

## 🌐 Live Links

- 🚀 **Live App:** [https://neptune-devtest.vercel.app](https://neptune-devtest.vercel.app)
- ⚙️ **GitHub Repo:** [Neptune-Dev-Test_GITHUB_REPO_URL](https://github.com/smn-riaz/neptune-devtest)

---

## 📸 Screenshot

![screencapture-neptune-devtest-vercel-app-2025-06-09-17_14_39](https://github.com/user-attachments/assets/2cc9a8f9-e67a-4c11-9200-08f6eadadd14)

---

## 🚀 Core Features

### 👤 User Functionality
- Accepts natural language queries (example: *"Which Dog Groomers Have the Highest Ratings?"*)
- Sends query to an API (Google Gen AI + scraped data sources)
- Synthesizes results from at least 3 sources
- Displays:
  - Service provider name
  - Ratings and reviews
  - Price range
  - Address
  - Booking options
  - **Neptune Score** (ranking metric)
- FAQ section with copy-to-clipboard interaction
- Fully responsive for mobile and desktop

### 💎 Bonus Features
- **Neptune Score:** Custom ranking metric to help users quickly identify the most reputable services.  
  Formula:

  ```js
  Neptune Score = round(rating × log(reviews))
  ## 🧰 Technologies & Versions

### 🔧 Technologies
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Framer Motion

---

  ## 🛠️ Getting Started Locally

### Prerequisites
- Node.js

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/smn-riaz/neptune-devtest
   
