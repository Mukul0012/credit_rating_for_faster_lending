import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <ApplicationProvider>
            <AppRoutes />
          </ApplicationProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
