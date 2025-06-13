import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;