import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import TextToVoice from './pages/TextToVoice';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Routes>
          <Route path="/" element={<TextToVoice />} />
        </Routes>
        <Toaster />
      </main>
    </BrowserRouter>
  );
}

export default App;