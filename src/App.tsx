import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import InstagramLogin from "./pages/InstagramLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InstagramLogin />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;