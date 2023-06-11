import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid } from '@mui/material'
// anime js
import anime from 'animejs';
// components
import Iconify from '../../components/iconify/Iconify'
// custom hook
import useResponsive from '../../hooks/useResponsive';

function StepTwo({ binaryData, setStep, changeStep, setChangeStep }) {
  const animation = useRef(null);
  const endAnimation = useRef(null);
  const mdAndDown = useResponsive('down', 'md')

  useEffect(() => {
    if (changeStep) {
      endAnimation.current = anime.timeline({
        autoplay: true,
        easing: "easeInOutSine"
      })
        .add({
          targets: `.binary-code,.icon`,
          opacity: [1, 0],
          duration: 300,
        })
        .add({
          targets: `.binary-data`,
          translateY: (el, i) => mdAndDown ? i < 4 ? -90 + (i * 90) : i < 8 ? ((i - 3) * -90) + ((i - 1) * 90) : ((i - 7) * -90) + ((i - 1) * 90) : i < 4 ? -196 + (i * 196) : i < 8 ? ((i - 3) * -196) + ((i - 1) * 196) : ((i - 7) * -196) + ((i - 1) * 196),
          translateX: (el, i) => mdAndDown ? i < 4 ? 376 - (i + 1) * 90 : i < 8 ? 376 - (i - 3) * 90 : 376 - (i - 7) * 90 : i < 4 ? 710 - (i + 1) * 170 : i < 8 ? 710 - (i - 3) * 170 : 710 - (i - 7) * 170,
          scale: [1, 0.6],
          opacity: [1, 0.5],
          duration: 1000,
          complete: () => { setStep((prev) => prev + 1); setChangeStep(false) },
        })
    }
  }, [changeStep]);

  useEffect(() => {
    if (binaryData) {
      animation.current = anime.timeline({
        autoplay: true,
        easing: "easeInOutSine"
      })
        .add({
          targets: `.binary-code`,
          opacity: 1,
          top: ["55%", binaryData.length > 4 ? "10%" : "5%"],
          duration: 1500,
        })
        .add({
          targets: `.icon`,
          opacity: 1,
          top: ["8%", "17%"],
          duration: 1500,
        })
        .add({
          targets: `.binary-data .bracket`,
          fontSize: mdAndDown ? "70px" : "120px",
          opacity: [0, 1],
          duration: 500
        })
        .add({
          targets: `.binary-data .data`,
          fontSize: ["0", mdAndDown ? "12.5px" : "18px"],
          lineHeight: ["0", mdAndDown ? "12.5px" : "22px"],
          opacity: [0, 1],
          duration: 1300
        })
    }
  }, [binaryData]);
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} height={"100%"} position={'relative'} mt={4}>
      <Box className='binary-code' sx={{ opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ fontSize: { xs: "20px", md: "25px" }, mr: "10px", flexShrink: 0 }}>{`Binary code: `}</Box>
        <Box sx={{ fontSize: binaryData.length > 4 ? "120px" : { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"["}
        </Box>
        <Box sx={{ fontSize: binaryData.length > 4 ? { xs: "13px", sm: "15px", md: "18px" } : { xs: "18px", md: "22px" }, mx: "auto" }}>{`${binaryData.join(`,\u00A0 \u00A0`)}`}</Box>
        <Box sx={{ fontSize: binaryData.length > 4 ? "120px" : { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"]"}
        </Box>
      </Box>
      <Box className='icon' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: { xs: 1, md: 2 }, width: { xs: "1.5rem", md: "3rem" }, height: { xs: "1.5rem", md: "3rem" }, mx: "auto" }} />
      </Box>
      <Grid container spacing={2} sx={{ mt: { xs: 4, md: "initial" } }}>
        {binaryData.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Box className="binary-data" sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 2 }}>
              <Box className='bracket' sx={{ fontSize: { xs: "70px", md: "150px" }, fontWeight: 300 }}>
                {"["}
              </Box>
              <Box sx={{ position: "relative" }}>
                {item.match(/.{1,2}/g).map((secondItem, secondIndex) => {
                  const data = secondItem.split("").map((i, thirdIndex) => <Box component={'span'} key={thirdIndex} >{`${i}${thirdIndex !== secondItem.length - 1 ? "\u00A0 \u00A0 \u00A0 \u00A0" : ""}`}</Box>)
                  return (
                    <Box key={secondIndex} className='data'>
                      {data}
                    </Box>
                  )
                })}
              </Box>
              <Box className='bracket' sx={{ fontSize: { xs: "70px", md: "150px" }, fontWeight: 300 }}>
                {"]"}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

StepTwo.propTypes = {
  binaryData: PropTypes.array,
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
}

export default StepTwo
