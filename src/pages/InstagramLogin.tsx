import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function InstagramLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Attempt",
        description: "This is a demo login. No actual authentication occurred.",
      });
      console.log("Login attempted with:", formData);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-5xl font-semibold italic mb-8">Instagram</h1>
        </div>
        
        <div className="bg-white p-8 border border-gray-300 rounded">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Phone number, username, or email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-200"
            />
            
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-200"
            />
            
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading || !formData.username || !formData.password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          
          <div className="mt-4 flex items-center justify-center">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="link" 
              className="w-full flex items-center justify-center text-blue-900"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
              Log in with Facebook
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="link" className="text-blue-900 text-xs">
              Forgot password?
            </Button>
          </div>
        </div>
        
        <div className="mt-3 p-4 text-center bg-white border border-gray-300 rounded">
          <p className="text-sm">
            Don't have an account? <Button variant="link" className="text-blue-500 p-0">Sign up</Button>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm mb-4">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <div className="h-10 w-32 bg-black rounded flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs">App Store</span>
            </div>
            <div className="h-10 w-32 bg-black rounded flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs">Google Play</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}