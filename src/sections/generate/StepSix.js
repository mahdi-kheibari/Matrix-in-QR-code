import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Typography } from '@mui/material'
// anime js
import anime from 'animejs'
// components
import Iconify from '../../components/iconify/Iconify'
// images
import maskPatterns from '../../assets/images/mask_patterns.png';

function StepSix({ setStep, changeStep, setChangeStep, setAllDataToMatrix, handleMaskConfigImg }) {
  const animation = useRef(null)

  useEffect(() => {
    animation.current = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine"
    })
      .add({
        targets: `.info`,
        opacity: [0, 1],
        duration: 2000,
        begin: () => { setAllDataToMatrix() }
      })
      .add({
        targets: `.info img`,
        opacity: [0, 1],
        duration: 1000,
        complete: () => handleMaskConfigImg().play()
      })
    return () => {
      handleMaskConfigImg().pause()
    };
  }, []);
  useEffect(() => {
    if (changeStep) {
      setStep((prev) => prev + 1)
      setChangeStep(false)
    }
  }, [changeStep]);

  return (
    <Box className='info' sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "secondary.main", borderRadius: "10px", width: "100%", opacity: 0, mt: 3, px: 1, pb: 1 }}>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
        <Iconify icon="ph:info" sx={{ mx: 1 }} />
        <span>Mask patterns</span>
      </Typography>
      <Box component={'img'} src={maskPatterns} sx={{ borderRadius: "5px", opacity: 0 }} />
    </Box>
  )
}

StepSix.propTypes = {
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
  setAllDataToMatrix: PropTypes.func,
  handleMaskConfigImg: PropTypes.func,
}

export default StepSix
