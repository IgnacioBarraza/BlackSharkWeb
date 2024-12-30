import { AutoLogout } from '@/auth/components/autoLogout'
import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/NavBar/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/authContext'
import { BackendProvider } from '@/providers/backendContext'
import { FirebaseProvider } from '@/providers/firebaseContext'
import { PropsDataProvider } from '@/providers/propsContext'
import ProtectedRoute from '@/routes/protectedRoute'
import { Notfound } from '@/shared/notfound'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function Router(props) {
  const renderRoutes = (routes) => {
    return routes.map((route) => {
      // Check if route requires protection
      const element = route.protection ? (
        <ProtectedRoute roles={route.protection.roles}>
          {route.component}
        </ProtectedRoute>
      ) : (
        route.component
      )

      return (
        <Route key={route.path} path={route.path} element={element}>
          {route.routes && renderRoutes(route.routes)}
        </Route>
      )
    })
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <BackendProvider>
          <FirebaseProvider>
            <PropsDataProvider>
              <SidebarProvider defaultOpen={false}>
                <div className="flex flex-col min-h-[100dvh] min-w-[100dvw]">
                  <Navbar />
                  <main className="flex-1">
                    <AutoLogout />
                    <Routes>
                      {renderRoutes(props.routes)}
                      <Route path="*" element={<Notfound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </SidebarProvider>
            </PropsDataProvider>
          </FirebaseProvider>
        </BackendProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
