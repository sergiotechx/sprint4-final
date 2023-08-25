import { ReduxProvider } from '../store/auth/providers';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><ReduxProvider>{children}</ReduxProvider></body>
      
    </html>
  );
}
