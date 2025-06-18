// app/providers.tsx (REFINED SOLUTION)
"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or initial client render, we don't have the ThemeProvider,
  // so children are rendered directly under <body>. This path is fine.
  if (!mounted) {
    return <>{children}</>;
  }

  // Once mounted, we need ThemeProvider to wrap the children.
  // The key is that the ThemeProvider component itself (or a wrapper around it)
  // needs to act as the single expanding flex item within the body's flex column.
  return (
    // Instead of adding a div with min-h-screen flex flex-col here,
    // which then contains ThemeProvider, which then contains the app structure,
    // we need to make sure ThemeProvider's output is the flex item itself.
    // next-themes's ThemeProvider typically renders as a <div> by default.
    // So, we need to pass the flex properties to that div.
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      // You can try passing className here directly if ThemeProvider supports it on its root element
      // className="flex flex-col flex-grow" // <--- TRY THIS FIRST
      // If className doesn't work directly on ThemeProvider's root element,
      // you might need to wrap ThemeProvider in a div that takes these properties.
    >
      {children}
    </ThemeProvider>
  );
}