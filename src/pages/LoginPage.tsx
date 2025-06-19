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
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('user@example.com'); // Default for easier testing
  const [password, setPassword] = useState('password123'); // Default for easier testing
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulate API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        toast.success('Login Successful!');
        navigate('/dashboard'); // Redirect to a post-login page
      } else if (email === 'locked@example.com') {
        setError('Account locked. Please contact support.');
        toast.error('Account Locked');
        navigate('/account-locked');
      }
      else {
        setError('Invalid email or password. Please try again.');
        toast.error('Login Failed', { description: 'Invalid email or password.' });
      }
      setLoading(false);
    }, 1500);
  };

  const logo = <ShieldCheck className="h-10 w-10 text-primary" />;

  const footerContent = (
    <>
      <p>
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
      <p className="mt-2">
        <Link to="/password-reset" className="font-medium text-primary hover:underline">
          Forgot your password?
        </Link>
      </p>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <BrandedAuthCard
        title="Sign in to your account"
        description="Welcome back! Please enter your details."
        logo={logo}
        footerContent={footerContent}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Login Error</AlertTitle>
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </Label>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </BrandedAuthCard>
    </div>
  );
};

export default LoginPage;