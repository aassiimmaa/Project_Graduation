'use client'

import 'ol/ol.css'
import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Icon } from 'ol/style'
import { Modal, Box } from '@mui/material'

interface VehicleLocationModalProps {
  open: boolean
  onClose: () => void
  location: { lat: number; lng: number }
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '800px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
}

export default function VehicleLocationModal({
  open,
  onClose,
  location
}: VehicleLocationModalProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)
  const vectorSource = useRef<VectorSource>(new VectorSource())

  // Khởi tạo map chỉ 1 lần khi component mount và mapRef đã có
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: vectorSource.current })
      ],
      view: new View({
        center: fromLonLat([location.lng, location.lat]),
        zoom: 15
      })
    })
  }, [mapRef, location.lng, location.lat])

  // Cập nhật vị trí map và marker mỗi khi modal mở
  useEffect(() => {
    if (!open || !mapInstance.current) return

    const coords = fromLonLat([location.lng, location.lat])

    // Reset center và zoom khi modal mở
    mapInstance.current.getView().setCenter(coords)
    mapInstance.current.getView().setZoom(15)

    // Cập nhật marker mới
    vectorSource.current.clear()
    const marker = new Feature({
      geometry: new Point(coords)
    })
    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          anchor: [0.5, 1],
          scale: 0.1
        })
      })
    )
    vectorSource.current.addFeature(marker)
  }, [open, location])

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Modal>
  )
}
