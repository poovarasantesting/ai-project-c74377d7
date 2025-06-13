import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "./components/GoogleLogin";
import { Toaster } from "./components/ui/toaster";

function App() {
  // Replace with your actual Google Client ID
  const googleClientId = "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="mt-2 text-gray-600">Sign in to continue</p>
          </div>
          <GoogleLogin />
        </div>
      </div>
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;