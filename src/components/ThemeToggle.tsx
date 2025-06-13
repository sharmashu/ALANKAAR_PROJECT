
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === 'light' ? (
        <span className="text-sm">🌙</span>
      ) : (
        <span className="text-sm">☀️</span>
      )}
    </Button>
  );
}
