import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Volume2, Play, Square, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function TextToVoice() {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [savedTexts, setSavedTexts] = useState<{ id: number, text: string }[]>([]);
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const { toast } = useToast();

  // Get available voices
  useEffect(() => {
    const getVoices = () => {
      const voiceOptions = window.speechSynthesis.getVoices();
      setVoices(voiceOptions);
      // Set default voice
      if (voiceOptions.length > 0) {
        setVoice(voiceOptions[0]);
      }
    };

    // Call getVoices right away
    getVoices();
    
    // Chrome loads voices asynchronously
    window.speechSynthesis.onvoiceschanged = getVoices;

    // Load saved texts from localStorage
    const savedItems = localStorage.getItem('savedTexts');
    if (savedItems) {
      setSavedTexts(JSON.parse(savedItems));
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Save to localStorage when savedTexts changes
  useEffect(() => {
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
  }, [savedTexts]);

  const handleSpeak = () => {
    if (text.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter some text to speak",
        variant: "destructive"
      });
      return;
    }

    speak({ 
      text, 
      voice, 
      rate, 
      pitch 
    });
  };

  const handleSave = () => {
    if (text.trim() === '') {
      toast({
        title: "Error",
        description: "Cannot save empty text",
        variant: "destructive"
      });
      return;
    }

    const newSavedTexts = [
      ...savedTexts,
      { id: Date.now(), text }
    ];
    setSavedTexts(newSavedTexts);
    
    toast({
      title: "Saved",
      description: "Text has been saved for later use",
    });
  };

  const handleDelete = (id: number) => {
    setSavedTexts(savedTexts.filter(item => item.id !== id));
    toast({
      title: "Deleted",
      description: "Saved text has been removed",
    });
  };

  const handleLoadSavedText = (text: string) => {
    setText(text);
    toast({
      title: "Loaded",
      description: "Text has been loaded into editor",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Text to Voice Generator</CardTitle>
          <CardDescription className="text-center">
            Enter your text below and customize the voice settings
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium mb-2">
              Text to Speak
            </label>
            <Textarea
              id="text-input"
              placeholder="Type or paste the text you want to convert to speech..."
              className="min-h-[150px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Voice
              </label>
              <Select 
                value={voice?.name} 
                onValueChange={(value) => {
                  const selectedVoice = voices.find(v => v.name === value) || null;
                  setVoice(selectedVoice);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Speed (Rate: {rate.toFixed(1)})
              </label>
              <Slider
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(values) => setRate(values[0])}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Pitch ({pitch.toFixed(1)})
              </label>
              <Slider
                value={[pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(values) => setPitch(values[0])}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-3 justify-center">
          <Button 
            onClick={handleSpeak} 
            disabled={speaking || text.trim() === ''}
            className="flex items-center gap-2"
          >
            <Play size={16} /> {speaking ? 'Speaking...' : 'Speak'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={cancel} 
            disabled={!speaking}
            className="flex items-center gap-2"
          >
            <Square size={16} /> Stop
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handleSave} 
            disabled={text.trim() === ''}
            className="flex items-center gap-2"
          >
            <Save size={16} /> Save Text
          </Button>
        </CardFooter>
      </Card>

      {savedTexts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Saved Texts</CardTitle>
            <CardDescription>
              Click on a saved text to load it into the editor
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3">
              {savedTexts.map(item => (
                <li 
                  key={item.id} 
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <div 
                    className="flex-1 truncate mr-2" 
                    onClick={() => handleLoadSavedText(item.text)}
                    title={item.text}
                  >
                    {item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => {
                        setText(item.text);
                        handleSpeak();
                      }}
                      title="Play this text"
                    >
                      <Volume2 size={16} />
                    </Button>
                    
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      title="Delete this saved text"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}