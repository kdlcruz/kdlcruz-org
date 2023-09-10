import React from 'react'
import './global.css'
import Navbar from './partials/NavBar'
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
  title: 'kdlcruz (Kevin Jay Dela Cruz)',
  description: 'kdlcruz portfolio and tools to help you build your software problems. A Software ninja for hire!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider theme={theme}> */}
          <ThemeRegistry>
            <React.Fragment>
              <Navbar />
              {children}
            </React.Fragment>
          </ThemeRegistry>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
