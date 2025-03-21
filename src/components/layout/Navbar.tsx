import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Wallet,
  Calculator,
  Package,
  History,
  BookOpen,
  Menu,
  X,
  Coins,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useAuth } from "../auth/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface NavbarProps {
  activePage?: string;
}

const Navbar = ({ activePage: propActivePage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const [activePage, setActivePage] = React.useState(
    propActivePage || "dashboard",
  );
  const { user, signOut } = useAuth();

  // Update active page based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActivePage("dashboard");
    else if (path === "/assets") setActivePage("asset-management");
    else if (path === "/zakat") setActivePage("zakat-calculator");
    else if (path === "/inventory") setActivePage("asset-inventory");
    else if (path === "/history") setActivePage("historical-records");
    else if (path === "/guidelines") setActivePage("islamic-guidelines");
    else if (path === "/settings/gold-prices") setActivePage("gold-price-settings");
    else if (path === "/profile") setActivePage("profile");
  }, [location.pathname]);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Asset Management",
      path: "/assets",
      icon: <Wallet className="h-5 w-5" />,
      protected: true,
    },
    {
      name: "Zakat Calculator",
      path: "/zakat",
      icon: <Calculator className="h-5 w-5" />,
      protected: true,
    },
    {
      name: "Asset Inventory",
      path: "/inventory",
      icon: <Package className="h-5 w-5" />,
      protected: true,
    },
    {
      name: "Historical Records",
      path: "/history",
      icon: <History className="h-5 w-5" />,
      protected: true,
    },
    {
      name: "Islamic Guidelines",
      path: "/guidelines",
      icon: <BookOpen className="h-5 w-5" />,
      protected: true,
    },
    {
      name: "Gold Price Settings",
      path: "/settings/gold-prices",
      icon: <Coins className="h-5 w-5" />,
      protected: true,
    },
  ];

  // Filter nav items based on auth status
  const filteredNavItems = navItems.filter(item => 
    !item.protected || (item.protected && user)
  );

  const handleSignOut = async () => {
    try {
      console.log('User clicked sign out');
      await signOut();
      // The redirect is now handled in the AuthContext
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-emerald-700">Zakat Manager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-1 text-sm font-medium ${activePage === item.name.toLowerCase().replace(/ /g, "-")
                ? "text-emerald-700"
                : "text-gray-600 hover:text-emerald-600"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Auth buttons / User menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 bg-emerald-100 text-emerald-800">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Logged in user
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Register
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Zakat Manager</SheetTitle>
                <SheetDescription>
                  Manage your assets and calculate Zakat
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="flex flex-col space-y-3">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-2 p-2 rounded-md ${activePage === item.name.toLowerCase().replace(/ /g, "-")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 p-2 rounded-md text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Log out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn className="h-5 w-5" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-2 p-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
