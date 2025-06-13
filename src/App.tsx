import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Volume2, Pause, Play, Save } from "lucide-react";
import { TextToVoiceConverter } from "./components/TextToVoiceConverter";

export default function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support the Speech Synthesis API.",
        variant: "destructive"
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Text to Voice Converter</h1>
          <p className="text-center text-gray-600">Convert your text to natural-sounding speech</p>
        </header>
        
        <TextToVoiceConverter />
      </div>
    </div>
  );
}