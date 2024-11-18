import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { storage } from "@/app/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required functions
import prompts from "../../../config/promts.json"

export async function POST(req) {
  const formData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0];
    console.log("Uploaded file:", uploadedFile);

    if (uploadedFile instanceof File) {
      let fileName = uploadedFile.name;
      fileName = fileName.replace(/\.[^/.]+$/, ""); 
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      const fileRef = ref(storage, `resumes/${fileName}.pdf`);
      await uploadBytes(fileRef, fileBuffer);
      const fileURL = await getDownloadURL(fileRef);

      const parsedText = await parsePDF(fileBuffer);

      if (parsedText) {
        try {
          const reviewResult = await classifyResume(parsedText, apiKey);
          const response = new NextResponse(reviewResult);
          response.headers.set("FileName", fileName);
          return response;
        } catch (error) {
          console.error("Error classifying resume:", error);
          return new NextResponse(
            JSON.stringify({ error: "Classification Error" }),
            { status: 500 }
          );
        }
      } else {
        return new NextResponse(JSON.stringify({ error: "Parsing Error" }), {
          status: 500,
        });
      }
    } else {
      console.log("Uploaded file is not in the expected format.");
      return new NextResponse(JSON.stringify({ error: "File Format Error" }), {
        status: 400,
      });
    }
  } else {
    console.log("No files found.");
    return new NextResponse(JSON.stringify({ error: "No Files Found" }), {
      status: 400,
    });
  }
}

function parsePDF(fileBuffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", (errData) => {
      console.log(errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const parsedText = pdfParser.getRawTextContent();
      resolve(parsedText);
    });

    pdfParser.parseBuffer(fileBuffer);
  });
}

async function classifyResume(resumeText, apiKey) {
  try {
    const chatCompletion = await getSambaChatCompletion(resumeText, apiKey);
    const review = chatCompletion?.choices?.[0]?.message?.content || "Unknown";
    return review;
  } catch (error) {
    console.error("Error reviewing resume:", error);
    return "Error";
  }
}

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
          content: `${prompts.rickResumeCritique.description} ${prompts.rickResumeCritique.example} resume : ${resumeText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Error connecting to Sambanova API");
  }

  return await response.json();
}