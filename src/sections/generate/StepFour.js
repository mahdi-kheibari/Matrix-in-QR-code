import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Grid, Divider, Typography } from '@mui/material'
// anime js
import anime from 'animejs'
// components
import Iconify from '../../components/iconify/Iconify'

function StepFour({ binaryData, setStep, changeStep, setChangeStep, setDataToMatrix }) {
  const animation = useRef(null)

  useEffect(() => {
    animation.current = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine"
    })
      .add({
        targets: `.divider`,
        height: 0,
        duration: 1000,
      })
      .add({
        targets: `.bracket`,
        translateY: (el, i) => i < 4 ? 120 - (i * 110) : 340 - (i * 110),
        translateX: (el, i) => i < 4 ? -710 + (i + 1) * 170 : -710 + (i - 3) * 170,
        scale: [1, 1.6],
        opacity: [1, 1.5],
        duration: 1000,
      })
      .add({
        targets: `.bracket .data`,
        translateY: (el, i) => i < 4 ? 10 : -125,
        translateX: (el, i) => i < 4 ? -260 + (i + 1) * -50 : -260 + (i - 3) * -50,
        opacity: [1, 0],
        duration: 2000,
      })
      .add({
        targets: `.bracket`,
        opacity: [1, 0],
        duration: 1000,
        complete: () => setDataToMatrix()
      })
      .add({
        targets: `.example`,
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
    <Grid container spacing={1} sx={{ mt: 3 }}>
      <Grid item xs={9}>
        <Box className='example' sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "secondary.main", borderRadius: "10px", height: "100%", width: "100%", opacity: 0 }}>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
            <Iconify icon="ph:info" sx={{ mx: 1 }} />
            <span>example</span>
          </Typography>
          <Box component={'img'} src='/assets/images/binary_data_example.png' sx={{ px: 2 }} />
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Divider className='divider' orientation='vertical' />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1}>
          {binaryData.map((item, index) => (
            <Grid item xs={12} key={index} className='bracket' sx={{ backgroundImage: "url('/assets/icons/bracket.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", alignContent: "center", backgroundPosition: "top", height: "110px" }}>
              <Grid className='data' key={index} container spacing={0} sx={{mt:"20px"}}>
                {item.split("").map((i, innerIndex) =>
                  <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
                    <Box sx={{ ml: 2.5, mr: 2, fontSize: "9px" }}>{i}</Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

StepFour.propTypes = {
  binaryData: PropTypes.array,
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
  setDataToMatrix: PropTypes.func,
}

export default StepFour
