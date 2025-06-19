import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandedAuthCard from '@/components/auth/BrandedAuthCard';
import PasswordField from '@/components/auth/PasswordField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { UserPlus, AlertTriangle } from 'lucide-react';

const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('RegistrationPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Registration Failed', { description: 'Passwords do not match.' });
      setLoading(false);
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      toast.error('Registration Failed', { description: 'Please agree to the terms.' });
      setLoading(false);
      return;
    }

    console.log('Registration attempt:', { email, password, agreedToTerms });

    // Simulate API call
    setTimeout(() => {
      // Simulate success
      toast.success('Registration Successful!', { description: 'Please check your email to verify your account.' });
      navigate('/login'); // Redirect to login page after registration
      setLoading(false);
    }, 1500);
  };

  const logo = <UserPlus className="h-10 w-10 text-primary" />;
  
  const footerContent = (
     <p>
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <BrandedAuthCard
        title="Create your account"
        description="Join us! It's quick and easy."
        logo={logo}
        footerContent={footerContent}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Registration Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordField
              id="password"
              name="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <PasswordField
              id="confirm-password"
              name="confirm-password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center">
            <Checkbox
              id="terms-agreement"
              name="terms-agreement"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="terms-agreement" className="ml-2 block text-sm text-gray-900">
              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Terms and Conditions</a>
            </Label>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </BrandedAuthCard>
    </div>
  );
};

export default RegistrationPage;