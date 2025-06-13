import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import WorkoutHistory from "@/pages/WorkoutHistory";
import PersonalRecords from "@/pages/PersonalRecords";
import ProgressCharts from "@/pages/ProgressCharts";
import Layout from "@/components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<WorkoutHistory />} />
          <Route path="records" element={<PersonalRecords />} />
          <Route path="progress" element={<ProgressCharts />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;