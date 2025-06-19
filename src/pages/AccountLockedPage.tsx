import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandedAuthCard from '@/components/auth/BrandedAuthCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, AlertCircle } from 'lucide-react';

const AccountLockedPage: React.FC = () => {
  console.log('AccountLockedPage loaded');
  const navigate = useNavigate();

  const logo = <Lock className="h-10 w-10 text-destructive" />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <BrandedAuthCard
        title="Account Locked"
        logo={logo}
        className="w-full max-w-md"
      >
        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Your Account is Temporarily Locked</AlertTitle>
            <AlertDescription>
              For security reasons, your account has been temporarily locked due to multiple failed login attempts or suspicious activity.
              <br /><br />
              Please try again after 30 minutes, or contact support if you need immediate assistance.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => alert('Contacting support... (Feature not implemented)')}
            >
              Contact Support
            </Button>
            <Button 
              className="w-full" 
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </BrandedAuthCard>
    </div>
  );
};

export default AccountLockedPage;