'use client'
import * as React from 'react'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CarRentalIcon from '@mui/icons-material/CarRental'
import BarChartIcon from '@mui/icons-material/BarChart'
import {
  AppProvider,
  type Router,
  type Session,
  type Navigation
} from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { createTheme, Stack } from '@mui/material'
import Image from 'next/image'
import LogoText from '../components/LogoText'
import LogedInUser from '../components/admin/LogedInUser'
import UsersManagement from '../components/admin/UsersManagement'
import CategoriesManagement from '../components/admin/CategoriesManagement'
import VehiclesManagement from '../components/admin/VehiclesManagement'
import OrdersManagement from '../components/admin/OrdersManagement'
import Statistical from '../components/admin/Statistical'

const NAVIGATION: Navigation = [
  {
    segment: 'Admin/Users',
    title: 'Quản lý tài khoản',
    icon: <PeopleIcon />
  },
  {
    segment: 'Admin/Categories',
    title: 'Quản lý loại xe',
    icon: <CategoryIcon />
  },
  {
    segment: 'Admin/Vehicles',
    title: 'Quản lý xe',
    icon: <DirectionsCarIcon />
  },
  {
    segment: 'Admin/RentOrder',
    title: 'Quản lý thuê xe',
    icon: <CarRentalIcon />
  },
  {
    segment: 'Admin/Statistical',
    title: 'Thống kê',
    icon: <BarChartIcon />
  }
]

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#ededed',
          paper: '#212529'
        },
        text: {
          primary: '#ffffff',
          secondary: '#bbbbbb'
        }
      }
    }
  },
  defaultColorScheme: 'dark' // Mặc định dark mode (nếu muốn)
})

// Mapping giữa route và component tương ứng
const PAGE_COMPONENTS: Record<string, React.ReactNode> = {
  '/Admin/Users': <UsersManagement />,
  '/Admin/Categories': <CategoriesManagement />,
  '/Admin/Vehicles': <VehiclesManagement />,
  '/Admin/RentOrder': <OrdersManagement />,
  '/Admin/Statistical': <Statistical />
}

interface LayoutProps {
  children?: React.ReactNode
  window?: () => Window
}

export default function DashboardLayoutSidebarCollapsed({
  children,
  window
}: LayoutProps) {
  const [pathname, setPathname] = React.useState('/Admin')

  const router = React.useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: path => setPathname(path.toString())
    }),
    [pathname]
  )

  const Window = window ? window() : undefined

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456'
    }
  })

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456'
          }
        })
      },
      signOut: () => {
        setSession(null)
      }
    }
  }, [])

  const CustomAppTitle = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ cursor: 'pointer' }}
        onClick={() => setPathname('/Admin')}
      >
        <Image src="/images/logo.png" alt="logo" height={40} width={50} />
        <LogoText />
      </Stack>
    )
  }

  const CustomAccount = () => {
    return <LogedInUser />
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      authentication={authentication}
      router={router}
      window={Window}
      theme={theme}
      session={session}
    >
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          appTitle: CustomAppTitle,
          toolbarAccount: CustomAccount
        }}
        sx={{ color: '#000', p: 4 }}
      >
        {PAGE_COMPONENTS[pathname] || children}
      </DashboardLayout>
    </AppProvider>
  )
}
