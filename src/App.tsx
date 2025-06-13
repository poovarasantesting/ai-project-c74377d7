import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Editor />} />
        </Routes>
        <Toaster />
      </main>
    </Router>
  );
}

export default App;