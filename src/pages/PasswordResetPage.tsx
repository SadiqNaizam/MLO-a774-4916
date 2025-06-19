import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandedAuthCard from '@/components/auth/BrandedAuthCard';
import PasswordField from '@/components/auth/PasswordField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { KeyRound, AlertTriangle, Mail } from 'lucide-react';

type PasswordResetStep = 'request' | 'reset';

const PasswordResetPage: React.FC = () => {
  const [step, setStep] = useState<PasswordResetStep>('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); // Assume token might be entered or comes from URL later
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('PasswordResetPage loaded, current step:', step);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Password reset request for email:', email);

    // Simulate API call to send reset link
    setTimeout(() => {
      toast.success('Password Reset Link Sent', { description: 'If an account exists for this email, a reset link has been sent.' });
      // In a real app, you might not switch step here but instruct user to check email.
      // For demo, we'll switch to reset step.
      setStep('reset'); 
      setToken('dummy-token-from-email-link'); // Simulate receiving a token
      setLoading(false);
    }, 1500);
  };
  
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      toast.error('Password Reset Failed', { description: 'Passwords do not match.' });
      setLoading(false);
      return;
    }
    if (!token) {
        setError('Invalid or missing reset token.');
        toast.error('Password Reset Failed', { description: 'Invalid reset token.' });
        setLoading(false);
        return;
    }

    console.log('Password reset attempt with token:', token, 'for new password.');
    // Simulate API call to reset password
    setTimeout(() => {
      toast.success('Password Reset Successful!', { description: 'You can now log in with your new password.' });
      navigate('/login');
      setLoading(false);
    }, 1500);
  };
  
  const logo = <KeyRound className="h-10 w-10 text-primary" />;

  const footerContent = (
    <p>
      Remember your password?{' '}
      <Link to="/login" className="font-medium text-primary hover:underline">
        Sign in
      </Link>
    </p>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      {step === 'request' && (
        <BrandedAuthCard
          title="Forgot Your Password?"
          description="Enter your email address and we'll send you a link to reset your password."
          logo={<Mail className="h-10 w-10 text-primary" />}
          footerContent={footerContent}
          className="w-full max-w-md"
        >
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
        </BrandedAuthCard>
      )}

      {step === 'reset' && (
         <BrandedAuthCard
            title="Set New Password"
            description="Create a new strong password for your account."
            logo={logo}
            footerContent={footerContent}
            className="w-full max-w-md"
        >
            <form onSubmit={handleResetSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Password Reset Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {/* In a real app, token would come from URL params and likely be hidden */}
            <div>
                <Label htmlFor="token">Reset Token (normally from URL)</Label>
                <Input
                id="token"
                name="token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1"
                placeholder="Enter reset token"
                disabled // Usually tokens are not manually entered, or are hidden
                />
            </div>
            <div>
                <Label htmlFor="new-password">New Password</Label>
                <PasswordField
                id="new-password"
                name="new-password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
                />
            </div>
            <div>
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <PasswordField
                id="confirm-new-password"
                name="confirm-new-password"
                autoComplete="new-password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
                />
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Resetting password...' : 'Set New Password'}
                </Button>
            </div>
            </form>
        </BrandedAuthCard>
      )}
    </div>
  );
};

export default PasswordResetPage;