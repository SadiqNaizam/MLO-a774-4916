import React, { useState } from 'react';
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordFieldProps extends Omit<InputProps, 'type'> {
  // No additional specific props needed for now, inherits from InputProps
  // We could add containerClassName if we want to style the wrapper div
  containerClassName?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    console.log("Rendering PasswordField, showPassword:", showPassword);

    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
      console.log("Toggled password visibility");
    };

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)} // Add padding to the right for the button
          ref={ref}
          {...props}
        />
        <Button
          type="button" // Important to prevent form submission
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-primary"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;