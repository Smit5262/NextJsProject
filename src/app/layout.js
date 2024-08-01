// 'use client';

// import "./globals.css";
// import Header from "./header";
// import Footer from "./footer";
// import  "bootstrap/dist/css/bootstrap.min.css"
// import { AuthProvider } from './AuthContext';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <Header />
//           {children}
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

"use client";

import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
