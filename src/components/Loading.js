'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Zap, Skull, FlaskRoundIcon as Flask } from 'lucide-react'

const LoadingMessage = ( {message} ) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <p className="text-lg text-green-400">{message}</p>
  </motion.div>
)

const PortalEffect = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <motion.div
      className="absolute inset-0 bg-gradient-radial from-green-500/20 via-purple-500/10 to-transparent"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 w-1 bg-green-400 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    ))}
  </div>
)

const DNAHelix = () => (
  <div className="relative h-24 overflow-hidden">
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ y: "100%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between w-full absolute"
          initial={{ y: i * 40 }}
          style={{ top: `${i * 8}%` }}
        >
          <motion.div
            className="h-3 w-3 rounded-full bg-green-500"
            animate={{ x: [-20, 20, -20], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
          <motion.div
            className="h-3 w-3 rounded-full bg-[#ff3e3e]"
            animate={{ x: [20, -20, 20], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
)

export default function Loading() {
  const [loadingMessage, setLoadingMessage] = useState('')
  const [progress, setProgress] = useState(0)

  const loadingMessages = [
    "Analyzing your pathetic attempt at a resume...",
    "Calculating the level of disappointment...",
    "Searching for any sign of competence...",
    "Preparing a portal to a dimension where your resume is actually good...",
    "Consulting with alternate universe Ricks for roasting material...",
    "Calibrating the neutrino bomb of truth...",
    "Distilling your career into pure, unfiltered mockery...",
    "Charging up the roast-rays to maximum burn...",
    "Synthesizing a serum of brutal honesty...",
    "Warming up the interdimensional roast engine..."
  ]

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    }, 3000)

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev + 1) % 101)
    }, 100)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <PortalEffect />

      <Card className="bg-black/60 border-[#ff3e3e] border-2 backdrop-blur-sm max-w-lg w-full">
        <CardContent className="p-6 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Loader2 className="h-16 w-16 text-[#ff3e3e]" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress % 3 === 0 && <Zap className="h-8 w-8 text-yellow-400" />}
                {progress % 3 === 1 && <Skull className="h-8 w-8 text-green-400" />}
                {progress % 3 === 2 && <Flask className="h-8 w-8 text-purple-400" />}
              </motion.div>
            </motion.div>
            <h2 className="text-2xl font-bold text-center text-[#ff3e3e]">Processing Your Resume</h2>
          </div>

          <AnimatePresence mode="wait">
            <LoadingMessage key={loadingMessage} message={loadingMessage} />
          </AnimatePresence>

          <DNAHelix />

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-400 bg-green-200">
                  Roast Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-400">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <motion.div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <p className="text-sm text-center text-gray-400">
            Brace yourself, Morty! This might take a few moments, but it&apos;ll be worth it... probably.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}