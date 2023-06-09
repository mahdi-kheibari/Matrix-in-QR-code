import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid } from '@mui/material'
// anime js
import anime from 'animejs';
// components
import Iconify from '../../components/iconify/Iconify'

function StepTwo({ binaryData, setStep, changeStep, setChangeStep }) {
  const animation = useRef(null);
  const endAnimation = useRef(null);

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
          targets: `.bracket`,
          translateY: (el, i) => i < 4 ? -220 + (i * 110) : -440 + (i * 110),
          translateX: (el, i) => i < 4 ? 710 - (i + 1) * 170 : 710 - (i - 3) * 170,
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
          top: ["55%", "5%"],
          duration: 1500,
        })
        .add({
          targets: `.icon`,
          opacity: 1,
          top: ["8%", "15%"],
          duration: 1500,
        })
        .add({
          targets: `.bracket`,
          opacity: [0, 1],
          width: ["0%", "100%"],
          duration: 1500,
          delay: (el, i) => 50 * (i + 1)
        })
        .add({
          targets: `.bracket-data`,
          fontSize: ["0", "14px"],
          duration: 1000,
          delay: (el, i) => 50 * (i + 1)
        })
    }
  }, [binaryData]);
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} height={"100%"} position={'relative'} mt={4}>
      <Box className='binary-code' sx={{ opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "25px", marginRight: "10px", flexShrink: 0 }}>{`Binary code: `}</div>
        <Box sx={{ fontSize: "85px", fontWeight: 300 }}>
          {"["}
        </Box>
        <Box sx={{ fontSize: "22px", mx: "auto" }}>{`${binaryData.join(`,\u00A0 \u00A0`)}`}</Box>
        <Box sx={{ fontSize: "85px", fontWeight: 300 }}>
          {"]"}
        </Box>
      </Box>
      <Box className='icon' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      </Box>
      <Grid container spacing={1}>
        {binaryData.map((item, index) => (
          <Grid item xs={3} key={index} sx={{ width: "192px", height: "192px" }}>
            <Grid container className='bracket' spacing={0} sx={{ backgroundImage: "url('/assets/icons/bracket.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", height: "100%", alignContent: "center", backgroundPosition: "center" }}>
              {item.split("").map((i, innerIndex) =>
                <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
                  <Box className='bracket-data' sx={{ ml: 4.5, mr: 1, fontSize: "14px" }}>{i}</Box>
                </Grid>
              )}
            </Grid>
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
