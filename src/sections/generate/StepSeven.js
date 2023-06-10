import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Button } from '@mui/material'
// anime js
import anime from 'animejs'

function StepSeven({ handleDownloadImage }) {
  const animation = useRef(null)
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    animation.current = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine"
    })
      .add({
        targets: `.info`,
        opacity: [0, 1],
        duration: 1000,
      })
      .add({
        targets: `.info img`,
        translateY: [340, 0],
        translateX: [-390, 0],
        opacity: [0, 1],
        duration: 1000,
      })
    setImageSrc(handleDownloadImage())
  }, []);

  return (
    <Box className='info' sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", opacity: 0, mt: 3 }}>
      <Box component={'img'} src={imageSrc} sx={{ borderRadius: "5px", opacity: 0, my: 4 }} />
      <Button component={'a'} download={'QR_code.png'} size='large' href={imageSrc} variant="outlined" color="secondary">
        Download
      </Button>
    </Box>
  )
}

StepSeven.propTypes = {
  handleDownloadImage: PropTypes.func,
}

export default StepSeven
