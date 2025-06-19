import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
  title?: string; // Optional title for the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, title }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside
      className={cn(
        "h-screen w-64 flex-shrink-0 border-r bg-background p-4 hidden md:block", // Example styling: fixed width, border, bg, padding. Hidden on mobile.
        className
      )}
    >
      {title && (
        <>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <Separator className="my-4" />
        </>
      )}
      <ScrollArea className="h-[calc(100%-4rem)]"> {/* Adjust height if title is present or not */}
        <div className="space-y-2">
          {children ? children : (
            <>
              {/* Placeholder content if no children are provided */}
              <p className="text-sm text-muted-foreground">Sidebar Item 1</p>
              <p className="text-sm text-muted-foreground">Sidebar Item 2</p>
              <p className="text-sm text-muted-foreground">Sidebar Item 3</p>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default Sidebar;