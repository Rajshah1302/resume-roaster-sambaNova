import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, Github, Linkedin } from "lucide-react"; 

const Agreement = ({ handleFileUpload }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-10 container mx-auto  px-auto py-auto">
      <Card className="bg-black/60 border-[#ff3e3e] border-2 backdrop-blur-sm">
        <CardContent className="p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1
              className="text-2xl md:text-5xl font-bold text-[#ff3e3e] tracking-tight"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Warning: Ricksume Roaster Agreement
            </motion.h1>
            <motion.div
              className="h-1 w-32 bg-[#ff3e3e] mx-auto rounded"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Agreement Text */}
          <motion.div
            className="space-y-6 text-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-green-400 font-semibold">
              Alright, listen up! This is a binding agreement between you, the
              brave but{" "}
              <span className="text-[#ff3e3e]">oh-so-resume-challenged</span>{" "}
              adventurer, and me, Rick Sanchez, the{" "}
              <span className="text-purple-400">Roastmaster Extraordinaire</span>.
            </p>

            <div className="space-y-4">
              <div className="p-3 border border-green-500/30 rounded-lg hover:bg-green-500/5 transition-colors">
                <h2 className="text-xl font-bold flex items-center gap-2 text-green-400">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  1. Thou Shalt Not Whine
                </h2>
                <p className="mt-2 text-gray-300">
                  No crying, no whining, no complaints. If you can&apos;t handle
                  the heat, get out of the multiverse!
                </p>
              </div>

              <div className="p-3 border border-blue-500/30 rounded-lg hover:bg-blue-500/5 transition-colors">
                <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  2. No Clichés Shall Survive
                </h2>
                <p className="mt-2 text-gray-300">
                  If I see &quot;team player&quot; or &quot;hard
                  worker,&quot; I&apos;m gonna lose it. Be original, or get outta
                  here!
                </p>
              </div>

              <div className="p-3 border border-purple-500/30 rounded-lg hover:bg-purple-500/5 transition-colors">
                <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  3. Honesty is the Best Policy (Even if it Hurts)
                </h2>
                <p className="mt-2 text-gray-300">
                  I&apos;m not here to sugarcoat. If your resume is bad,
                  you&apos;re gonna hear about it.
                </p>
              </div>
            </div>

            <p className="text-gray-300 italic">
              If you agree to these terms and conditions, upload your resume
              below. Get ready to be roasted, enlightened, and ultimately,
              resume-revamped! Prepare yourself, &apos;cause this is gonna be a
              ride! Also relax, I&apos;m not here to steal your data. I&apos;m
              Rick Sanchez, not some low-life hacker.
            </p>
          </motion.div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-[#ff3e3e] hover:bg-[#ff5252] text-white font-bold py-6 px-8 rounded-lg text-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Upload
                  className={`mr-2 h-5 w-5 ${
                    isHovered ? "animate-bounce" : ""
                  }`}
                />
                Upload Your Resume
              </Button>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 pt-0">
            <a
              href="https://github.com/Rajshah1302/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/rajshah1302/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agreement;
