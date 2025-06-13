import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Volume2, Pause, Play, Save, RefreshCw } from "lucide-react";

interface Voice {
  name: string;
  voiceURI: string;
  lang: string;
}

export function TextToVoiceConverter() {
  const [text, setText] = useState<string>("Hello! This is a text to speech converter. Type your text here and click the play button to hear it.");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Set default voice
        setSelectedVoice(availableVoices[0]?.voiceURI || "");
      }
    };

    // Chrome loads voices asynchronously
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices(); // For Firefox/Safari that may load synchronously
    }
  }, []);

  // Handle speech synthesis events
  useEffect(() => {
    const handleSpeechEnd = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    if (speechSynthRef.current) {
      speechSynthRef.current.onend = handleSpeechEnd;
      speechSynthRef.current.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        handleSpeechEnd();
        toast({
          title: "Error",
          description: "There was an error playing the speech.",
          variant: "destructive"
        });
      };
    }

    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.onend = null;
        speechSynthRef.current.onerror = null;
      }
    };
  }, [toast]);

  const handlePlay = () => {
    if (isPlaying && isPaused) {
      // Resume paused speech
      speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    if (isPlaying) {
      // Stop current speech
      speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    // Start new speech
    speechSynthesis.cancel(); // Clear any existing speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set selected voice
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) {
      utterance.voice = voice as SpeechSynthesisVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    speechSynthRef.current = utterance;
    speechSynthesis.speak(utterance);
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isPlaying && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleRefreshVoices = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
    toast({
      title: "Voices refreshed",
      description: `Found ${availableVoices.length} voices.`,
    });
  };

  // Function to download speech as audio file
  const handleSaveAudio = () => {
    toast({
      title: "Feature not available",
      description: "Direct saving of audio isn't supported by the Web Speech API. Try screen recording software instead.",
      variant: "default"
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Text to Voice</CardTitle>
        <CardDescription>Enter text below and customize the voice settings</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea 
          placeholder="Type your text here..." 
          className="min-h-[200px]" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Voice</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefreshVoices}
                className="h-6 px-2"
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
            </div>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Rate</label>
              <span className="text-sm text-gray-500">{rate.toFixed(1)}x</span>
            </div>
            <Slider 
              min={0.5} 
              max={2} 
              step={0.1} 
              value={[rate]} 
              onValueChange={(value) => setRate(value[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Pitch</label>
              <span className="text-sm text-gray-500">{pitch.toFixed(1)}</span>
            </div>
            <Slider 
              min={0.5} 
              max={2} 
              step={0.1} 
              value={[pitch]} 
              onValueChange={(value) => setPitch(value[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Volume</label>
              <span className="text-sm text-gray-500">{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <Slider 
                min={0} 
                max={1} 
                step={0.01} 
                value={[volume]} 
                onValueChange={(value) => setVolume(value[0])} 
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            onClick={handlePlay} 
            variant={isPlaying && !isPaused ? "destructive" : "default"}
          >
            {isPlaying && !isPaused ? "Stop" : isPaused ? "Resume" : "Play"}
            {isPlaying && !isPaused ? null : isPaused ? <Play className="ml-2 h-4 w-4" /> : <Play className="ml-2 h-4 w-4" />}
          </Button>
          
          <Button 
            onClick={handlePause} 
            variant="outline" 
            disabled={!isPlaying || isPaused}
          >
            Pause <Pause className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          onClick={handleSaveAudio} 
          variant="outline"
        >
          Save <Save className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}