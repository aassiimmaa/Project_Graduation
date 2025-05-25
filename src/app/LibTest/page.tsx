'use client'

import VehicleLocationModal from '~/app/components/admin/VehicleLocationModal'

const HomePage = () => {

  return (
    <VehicleLocationModal
      open={true}
      onClose={() => !open}
      location={{ lat: 16.442849979827617, lng: 107.61731558535982 }}
    />
  )
}

export default HomePage
