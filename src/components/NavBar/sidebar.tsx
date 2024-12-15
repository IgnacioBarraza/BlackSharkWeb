
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { AppWindow, Home, Images, Phone } from 'lucide-react'
import LoggedFooter from './components/loggedFooter'
import { SidebarProps } from '@/utils/interfaces'

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: AppWindow,
  },
  {
    title: "Galeria",
    url: "/gallery",
    icon: Images,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Phone,
  },
]

export function SideNavBar({ userToken, userName, userType }: SidebarProps) {
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Black Shark Studio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {userToken && <LoggedFooter userName={userName} userType={userType} />}
    </Sidebar>
  )
}
