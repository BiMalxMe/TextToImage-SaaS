

//FOr adding packages in the browser manually

'use client';

import { useEffect } from 'react';
import { Buffer } from 'buffer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Buffer = Buffer;
    }
  }, []);

  return <>{children}</>;
}
