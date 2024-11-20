'use client'
import React from "react";
import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skull, Zap, ArrowLeft } from "lucide-react"; 

const VerdictCard = ({ parsedText, handleBack }) => {
  const [expandedParagraphs, setExpandedParagraphs] = useState([])

  const formatCritique = (text) => {
    const sections = text.split("\n\n");
    return sections.map((section, index) => {
      if (section.startsWith("**")) {
        const [title, ...content] = section.split("\n");
        return (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {title.replace(/\*\*/g, "")}
            </h3>
            <ul className="list-disc pl-5 text-white space-y-1">
              {content.map((item, i) => (
                <li key={i}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <p key={index} className="text-white leading-relaxed mb-4">
          {section.trim()}
        </p>
      );
    });
  };


  return (
    <div className="relative z-10 container mx-auto px-4 py-12">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black/60 border-[#ff3e3e] border-2 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-3"
                >
                  <Skull className="h-8 w-8 text-[#ff3e3e]" />
                  <h1 className="text-4xl md:text-5xl font-bold text-[#ff3e3e] tracking-tight text-center">
                    Verdict
                  </h1>
                  <Skull className="h-8 w-8 text-[#ff3e3e]" />
                </motion.div>
                <motion.div
                  className="h-1 w-32 bg-[#ff3e3e] mx-auto rounded"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 0.7 }}
                />
              </div>

              {/* Verdict Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-2 bg-gradient-to-b from-green-400 via-green-500 to-transparent" />
                  <div className="pl-4">
                    <div className="flex items-start gap-2 mb-4">
                      <Zap className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                      <p className="text-green-400 font-bold text-lg">
                        Hey,
                      </p>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg leading-relaxed text-gray-300">
                      {formatCritique(parsedText)} 
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center pt-4"
              >
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#ff3e3e] text-[#ff3e3e] hover:bg-[#ff3e3e] hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Reality
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VerdictCard;
