// pages/index.js
"use client";
import { useState } from "react";
import axios from "axios";
import VerdictCard from "@/components/VerdictCard";
import Agreement from "@/components/Agreement";
import Loading from "@/components/Loading";

export default function Home() {
  const [parsedText, setParsedText] = useState("");
  const [loading, setloading] = useState(false)

  const handleBack = () => {
    setParsedText("");
  };

  const handleFileUpload = async (event) => {
    setloading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("filepond", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setParsedText(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }finally{
      setloading(false);
    }
  };
  if(loading){
    return (
      <>
      <Loading/>
      </>
    )
  }

  return (
    <main className="m-2">
      <div className=" bg-black text-white relative overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
        {!parsedText ? (
          <Agreement handleFileUpload={handleFileUpload}/>
        ) : (
          <VerdictCard parsedText={parsedText} handleBack={handleBack}/>
        )}
      </div>
    </main>
  );
}
