import { Link } from "react-router-dom";
import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Soch AI</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              Store
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 justify-center max-w-2xl">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Discover
          </Link>
          <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Button variant="ghost" size="sm" className="text-sm">
            For Teams
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-6">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Discover
                </Link>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  For Teams
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="lg:hidden border-t border-border px-4 py-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
    </nav>
  );
};
