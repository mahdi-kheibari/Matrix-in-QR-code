import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Grid, Divider, Typography } from '@mui/material'
// anime js
import anime from 'animejs'
// components
import Iconify from '../../components/iconify/Iconify'
// custom hooks
import useResponsive from '../../hooks/useResponsive'

function StepFour({ binaryData, setStep, changeStep, setChangeStep, setDataToMatrix }) {
  const animation = useRef(null)
  const mdAndDown = useResponsive('down', 'md')

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
        targets: `.binary-data`,
        scale: [1, 1.25],
        translateY: (el, i) => mdAndDown ? i < 5 ? (-i + 1) * 89 + (i - 1) * 32.5 : i < 9 ? (-i + 3) * 89 + (i - 5) * 32.5 : (-i + 5) * 89 + (i - 9) * 32.5 : i < 5 ? (-i + 1) * 211 + (i - .5) * 96 : i < 9 ? (-i + 3) * 211 + (i - 3.5) * 96 : (-i + 5) * 211 + (i - 6.5) * 96,
        translateX: (el, i) => mdAndDown ? i < 5 ? -195 + (i + 1) * 60 : i < 9 ? -195 + (i - 3) * 60 : -195 + (i - 7) * 60 : i < 5 ? -340 + (i + 1) * 90 : i < 9 ? -340 + (i - 3) * 90 : -340 + (i - 7) * 90,
        opacity: [1, 1.5],
        duration: 1000,
      })
      .add({
        targets: `.binary-data .data`,
        translateY: (el, i) => mdAndDown ? i < 4 ? -150 : i < 8 ? -200 : -250 : i < 4 ? -80 : i < 8 ? -215 : -340,
        translateX: (el, i) => mdAndDown ? 0 : i < 4 ? -260 + (i + 1) * -50 : i < 8 ? -260 + (i - 3) * -50 : -260 + (i - 7) * -50,
        opacity: [1, 0],
        duration: 2000,
      })
      .add({
        targets: `.binary-data`,
        opacity: [1, 0],
        duration: 1000,
        complete: () => setDataToMatrix()
      })
      .add({
        targets: `.example`,
        opacity: [0, 1],
        duration: 1500,
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
        <Box className='example' sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "secondary.main", borderRadius: "10px", width: "100%", opacity: 0, pb: 2 }}>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
            <Iconify icon="ph:info" sx={{ mx: 1 }} />
            <span>example</span>
          </Typography>
          <Box component={'img'} src='/assets/images/binary_data_example.png' sx={{ px: 2, borderRadius: "6%" }} />
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Divider className='divider' orientation='vertical' />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1} className='binary-data'>
          {binaryData.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box className="binary-data" sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 2 }}>
                <Box className='bracket' sx={{ fontSize: { xs: "42px", md: "90px" }, fontWeight: 300 }}>
                  {"["}
                </Box>
                <Box className='data' sx={{ position: "relative", lineHeight: { xs: "5px", md: "initial" } }}>
                  {item.match(/.{1,2}/g).map((secondItem, secondIndex) => {
                    const data = secondItem.split("").map((i, thirdIndex) => <Box component={'span'} sx={{ fontSize: { xs: "8px", md: "initial" } }} key={thirdIndex} >{`${i}${thirdIndex !== secondItem.length - 1 ? "\u00A0 \u00A0 \u00A0 \u00A0" : ""}`}</Box>)
                    return (
                      <Box key={secondIndex}>
                        {data}
                      </Box>
                    )
                  })}
                </Box>
                <Box className='bracket' sx={{ fontSize: { xs: "42px", md: "90px" }, fontWeight: 300 }}>
                  {"]"}
                </Box>
              </Box>
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
