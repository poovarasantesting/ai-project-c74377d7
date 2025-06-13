import { RegistrationForm } from "./components/RegistrationForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <RegistrationForm />
    </div>
  );
}

export default App;