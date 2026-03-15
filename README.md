# UniqueNo | Temporary Virtual ID Generator

**UniqueNo** is a lightweight, privacy-focused web utility designed to generate unique, pattern-accurate mobile numbers from various global origins. This project simulates a Temporary Virtual Number (TVN) service, perfect for form-testing or UI prototyping.

## 🚀 Features
- **Global Coverage:** Support for multiple African nations (Kenya, Nigeria, Ghana, etc.) and global regions (USA, UK, Japan).
- **Pattern Accuracy:** Generates numbers based on real-world country calling codes and mobile prefixes.
- **24-Hour Expiry:** Implements a TTL (Time To Live) logic using `localStorage` to ensure numbers "expire" and remain unique.
- **State Persistence:** Saves the last 3 generated numbers in a "Recent" list.
- **Modern UI:** Built with a high-end Glassmorphism aesthetic and responsive design.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Advanced Gradients & Backdrop Filters)
- **Logic:** Vanilla JavaScript (ES6 Modules)
- **Storage:** Browser LocalStorage (Simulated Database)

## 📂 Project Structure
- `index.html`: The main entry point and UI layout.
- `style.css`: The visual engine featuring dark mode and glass effects.
- `registry.js`: Data module containing global numbering plans.
- `generator.js`: The core engine handling randomness, uniqueness, and history.

## 📝 Usage
1. Select a country from the dropdown.
2. Click **Generate Number**.
3. Click the generated number to **Copy to Clipboard**.
4. View your last 3 generated IDs in the **Recent Generations** section.