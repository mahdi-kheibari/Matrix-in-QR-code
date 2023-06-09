import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Typography } from '@mui/material'
// anime js
import anime from 'animejs'
// components
import Iconify from '../../components/iconify/Iconify'

function StepFive({ setStep, changeStep, setChangeStep, setAllDataToMatrix, setDataToMatrix }) {
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
        begin: () => { setAllDataToMatrix(); setDataToMatrix() }
      })
      .add({
        targets: `.info img`,
        opacity: [0, 1],
        duration: 1000,
      })

  }, []);
  useEffect(() => {
    if (changeStep) {
      setStep((prev) => prev + 1)
      setChangeStep(false)
    }
  }, [changeStep]);

  return (
    <Box className='info' sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "secondary.main", borderRadius: "10px", width: "100%", opacity: 0, mt: 3 }}>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
        <Iconify icon="ph:info" sx={{ mx: 1 }} />
        <span>Reed–Solomon correction method</span>
      </Typography>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center", p: 2 }}>
        <Box component={'img'} src='/assets/images/error_correction_ex_1.jpg' sx={{ borderRadius: "5px", opacity: 0 }} />
        <Box component={'img'} src='/assets/images/error_correction_ex_2.jpg' sx={{ borderRadius: "5px", opacity: 0 }} />
      </Box>
    </Box>
  )
}

StepFive.propTypes = {
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
  setAllDataToMatrix: PropTypes.func,
  setDataToMatrix: PropTypes.func,
}

export default StepFive
