import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./themeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
