import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For utility class merging

interface BrandedAuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  logo?: React.ReactNode; // Optional logo element
  footerContent?: React.ReactNode; // Optional content for the footer (e.g., links to signup/login)
}

const BrandedAuthCard: React.FC<BrandedAuthCardProps> = ({
  title,
  description,
  children,
  className,
  logo,
  footerContent,
}) => {
  console.log("Rendering BrandedAuthCard with title:", title);

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="text-center">
        {logo && <div className="flex justify-center mb-4">{logo}</div>}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footerContent && (
        <div className="p-6 pt-0 text-center text-sm text-muted-foreground">
          {footerContent}
        </div>
      )}
    </Card>
  );
}

export default BrandedAuthCard;