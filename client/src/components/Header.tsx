import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  userName?: string;
  showUser: boolean;
}

export default function Header({ userName, showUser = false }: HeaderProps) {
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-primary font-inter font-bold text-xl">Haags Werken Elevator</div>
        </div>
        
        {showUser && (
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground">{userName}</span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <button className="ml-4 md:hidden text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
