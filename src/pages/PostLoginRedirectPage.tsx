import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Home, Settings, LogOut, BarChart, Bell, LayoutDashboard, Users, ShoppingBag } from 'lucide-react';

const PostLoginRedirectPage: React.FC = () => {
  const { toast: shadcnToast } = useToast(); // For shadcn/ui toasts
  const navigate = useNavigate();

  console.log('PostLoginRedirectPage loaded (Dashboard)');

  React.useEffect(() => {
    shadcnToast({
      title: "Welcome back!",
      description: "You have successfully logged in to your dashboard.",
    });
  }, [shadcnToast]);

  const handleLogout = () => {
    shadcnToast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
    navigate('/login');
  }

  const sidebarNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Analytics', icon: BarChart, href: '#' },
    { name: 'Users', icon: Users, href: '#' },
    { name: 'Products', icon: ShoppingBag, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar title="App Menu" className="h-screen fixed top-0 left-0 w-64 border-r">
        <nav className="flex flex-col space-y-1 p-2">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </Sidebar>

      <div className="flex-1 flex flex-col md:ml-64"> {/* Adjust ml to match sidebar width */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="h-4 w-4 mr-2" /> Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Add more navigation items here */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="https://avatar.iran.liara.run/public/boy?username=user" alt="@username" />
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('#')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard!</CardTitle>
              <CardDescription>This is a placeholder page for after successful login. You can customize it with relevant content and features.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Here you might see an overview of your account, recent activity, or quick links to important sections of the application.</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>Feature Card {i+1}</CardTitle>
                            <CardDescription>Quick summary of a feature.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>More details about this feature can go here.</p>
                            <Button className="mt-4 w-full">Explore</Button>
                        </CardContent>
                    </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PostLoginRedirectPage;