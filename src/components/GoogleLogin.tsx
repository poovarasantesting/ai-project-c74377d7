import { useCallback, useState } from "react";
import { GoogleLogin as GoogleOAuthLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface GoogleUserInfo {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google's user ID
}

export function GoogleLogin() {
  const { toast } = useToast();
  const [user, setUser] = useState<GoogleUserInfo | null>(null);

  const handleSuccess = useCallback((credentialResponse: any) => {
    try {
      const decoded: GoogleUserInfo = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      toast({
        title: "Login Successful",
        description: `Welcome, ${decoded.name}!`,
      });
      console.log("Google login successful:", decoded);
    } catch (error) {
      console.error("Failed to decode Google JWT:", error);
      toast({
        title: "Login Failed",
        description: "Unable to process login information",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleError = useCallback(() => {
    toast({
      title: "Login Failed",
      description: "Google authentication failed",
      variant: "destructive",
    });
  }, [toast]);

  const handleLogout = useCallback(() => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  }, [toast]);

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-sm">
        <img 
          src={user.picture} 
          alt={user.name} 
          className="w-16 h-16 rounded-full"
        />
        <div className="text-center">
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Sign in with Google</h3>
      <GoogleOAuthLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
}