
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import LoggedFooter from './components/loggedFooter'
import { SidebarProps } from '@/utils/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faHome, faImages, faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: faHome,
  },
  {
    title: "Servicios",
    url: "/inicio/servicios",
    icon: faWindowRestore,
  },
  {
    title: "Galeria",
    url: "/inicio/galeria",
    icon: faImages,
  },
  {
    title: "Contact",
    url: "/inicio/contacto",
    icon: faAddressBook,
  },
]

export function SideNavBar({ userToken, userName, userType }: SidebarProps) {
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-lg mb-10 font-myriad-pro'>Black Shark Studio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className='text-lg'>
                      <FontAwesomeIcon icon={item.icon} />
                      <span>{item.title}</span>
                    </Link>
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
