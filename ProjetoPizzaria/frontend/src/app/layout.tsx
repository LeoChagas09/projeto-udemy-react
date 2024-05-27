import { AuthProvider } from '@/contexts/AuthContext';
import '../../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div id="root">
          <AuthProvider>
              <ToastContainer autoClose={3000} />
              {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
