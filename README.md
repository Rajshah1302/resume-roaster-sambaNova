

# Resume Roaster 🚀  
**Brutally Honest Resume Feedback Powered by Sambanova's Fast API**  

### 🔗 [Live Demo](https://resume-roaster-samba-nova.vercel.app/) 
---

## 📖 About the Project  
**Resume Roaster** is an AI-driven application designed to provide actionable, no-nonsense feedback on resumes. Unlike traditional tools that sugarcoat or give vague suggestions, *Resume Roaster* delivers detailed, constructive critiques to help users craft standout resumes.  

### Key Features:  
- **Fast Feedback:** Upload your resume and get a detailed critique within seconds.  
- **Powered by Sambanova’s Fast API:** Leverages cutting-edge technology for precise and actionable feedback.  
- **Custom Prompts:** Ensures tailored advice that aligns with industry standards.  
---




---

## 🧑‍💻 Getting Started  


### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Rajshah1302/resume-roaster-sambaNova.git
   cd resume-roaster-sambaNova
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Set up environment variables:  
   Rename `.env.example` to `.env` and fill in your API keys and other configurations.  

4. Start the development server:  
   ```bash
   npm run dev
   ```  

---

## 📡 API Integration  
This project uses Sambanova's Fast API for AI-powered resume critique. Here's an example of the integration:  

```javascript
async function getSambaChatCompletion(resumeText, apiKey) {
  const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "Meta-Llama-3.2-1B-Instruct",
      messages: [
        {
          role: "user",
          content: `Provide actionable feedback: ${resumeText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Error connecting to Sambanova API");
  }

  return await response.json();
}
```

---

## 🤔 Challenges Faced  
- Optimizing prompts for better and more relevant feedback.  
- Handling API rate limits and ensuring smooth user experience.  
- Designing a UI that complements the core functionality.  

---

## 🎉 What’s Next?  
- Adding support for multiple resume formats (e.g., PDF, DOCX).  
- Expanding critiques to industry-specific resumes.  
- Integrating analytics to track user improvements over time.  

---

## 👏 Acknowledgments  
Special thanks to Sambanova for their incredible Fast API and to the hackathon community for their support and feedback!  

---

## 📝 License  
This project is licensed under the MIT License. See `LICENSE` for details.  

---

Feel free to share your feedback or suggestions! 😊  
