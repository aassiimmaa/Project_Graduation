'use client'; // Thêm dòng này nếu trong app router

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamic import react-slick
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const images = [
  'https://source.unsplash.com/random/800x400?nature',
  'https://source.unsplash.com/random/800x400?city',
  'https://source.unsplash.com/random/800x400?tech',
];

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: '800px', margin: 'auto' }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`slide-${index}`}
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        ))}
      </Slider>
    </Box>
  );
}
