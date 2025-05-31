'use client'
import * as React from 'react'
import { Stack, createTheme } from '@mui/material'
import {
  AppProvider,
  type Router,
  type Session,
  type Navigation
} from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CarRentalIcon from '@mui/icons-material/CarRental'
import BarChartIcon from '@mui/icons-material/BarChart'
import Image from 'next/image'

import LogoText from '../components/LogoText'
import LogedInUser from '../components/admin/LogedInUser'
import UsersManagement from '../components/admin/UsersManagement'
import CategoriesManagement from '../components/admin/CategoriesManagement'
import VehiclesManagement from '../components/admin/VehiclesManagement'
import OrdersManagement from '../components/admin/OrdersManagement'
import Statistical from '../components/admin/Statistical'
import {
  CATEGORY_MANAGEMENT,
  LINK_TO_LOGO,
  ORDER_MANAGEMENT,
  STATISTICAL,
  USER_MANAGEMENT,
  VEHICLE_MANAGEMENT
} from '../shared/constant'
import useRequireAuth from '~/hooks/useRequireAuth'

const NAVIGATION: Navigation = [
  {
    segment: 'Admin/Users',
    title: USER_MANAGEMENT,
    icon: <PeopleIcon />
  },
  {
    segment: 'Admin/Categories',
    title: CATEGORY_MANAGEMENT,
    icon: <CategoryIcon />
  },
  {
    segment: 'Admin/Vehicles',
    title: VEHICLE_MANAGEMENT,
    icon: <DirectionsCarIcon />
  },
  {
    segment: 'Admin/RentOrder',
    title: ORDER_MANAGEMENT,
    icon: <CarRentalIcon />
  },
  {
    segment: 'Admin/Statistical',
    title: STATISTICAL,
    icon: <BarChartIcon />
  }
]

const PAGE_COMPONENTS: Record<string, React.ReactNode> = {
  '/Admin/Users': <UsersManagement />,
  '/Admin/Categories': <CategoriesManagement />,
  '/Admin/Vehicles': <VehiclesManagement />,
  '/Admin/RentOrder': <OrdersManagement />,
  '/Admin/Statistical': <Statistical />
}

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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#fff',
            pointerEvents: 'auto',
            '&:hover': {
              cursor: 'not-allowed'
            }
          }
        }
      }
    }
  },
  defaultColorScheme: 'dark'
})

export default function DashboardClientWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const [pathname, setPathname] = React.useState('/Admin')
  const user = useRequireAuth()

  const router = React.useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: path => setPathname(path.toString())
    }),
    [pathname]
  )

  const [session, setSession] = React.useState<Session | null>(null)

  React.useEffect(() => {
    if (user) {
      setSession({
        user: {
          name: user.name,
          email: user.email,
          image: user.image
        }
      })
    }
  }, [user])

  const authentication = React.useMemo(() => {
    if (!user) return null
    return {
      signIn: () =>
        setSession({
          user: {
            name: user.name,
            email: user.email,
            image: user.image
          }
        }),
      signOut: () => setSession(null)
    }
  }, [user])

  if (!user) return null

  const CustomAppTitle = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ cursor: 'pointer' }}
      onClick={() => setPathname('/Admin')}
    >
      <Image src={LINK_TO_LOGO} alt="logo" height={40} width={50} />
      <LogoText />
    </Stack>
  )

  const CustomAccount = () => <LogedInUser user={user} />

  return (
    <AppProvider
      navigation={NAVIGATION}
      authentication={authentication}
      router={router}
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
