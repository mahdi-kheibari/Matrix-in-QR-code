import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack } from '@mui/material'
// anime js
import anime from 'animejs';
// components
import Iconify from '../../components/iconify/Iconify'
// custom hooks
import useResponsive from '../../hooks/useResponsive';

function StepOne({ inputVal, binaryData, setStep, changeStep, setChangeStep }) {
  const animation = useRef(null);
  const mdAndDown = useResponsive('down', 'md')

  useEffect(() => {
    if (changeStep) {
      setStep((prev) => prev + 1)
      setChangeStep(false)
    }
  }, [changeStep]);

  useEffect(() => {
    if (inputVal) {
      animation.current = anime.timeline({
        autoplay: true,
        easing: "easeInOutSine"
      })
        .add({
          targets: `.input-val`,
          top: ["-10%", "5%"],
          duration: 1500,
          delay: 1000
        })
        .add({
          targets: `.first-icon`,
          opacity: 1,
          top: [mdAndDown ? "5%" : "8%", mdAndDown ? "8%" : "12.5%"],
          duration: 1500,
        })
        .add({
          targets: `.ascii-code`,
          opacity: 1,
          top: [mdAndDown ? "15%" : "20%", mdAndDown ? "20%" : "25%"],
          duration: 1500,
        })
        .add({
          targets: `.second-icon`,
          opacity: 1,
          top: [mdAndDown ? "29.5%" : "32.5%", mdAndDown ? "32.5%" : "38%"],
          duration: 1500,
        })
        .add({
          targets: `.binary-code`,
          opacity: 1,
          top: [mdAndDown ? "45%" : "50%", mdAndDown ? "48%" : "55%"],
          duration: 1500,
        })
    }
  }, [inputVal]);
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} position={'relative'} overflow={'hidden'} sx={{ height: "100%", minHeight: { xs: "400px", md: "initial" } }} mt={4}>
      <Box className='input-val' sx={{ fontSize: { xs: "20px", md: "28px" }, position: "absolute", left: "50%", top: "-10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {`[ ${inputVal.split("").join(`,\u00A0 \u00A0`)} ]`}
      </Box>
      <Box className='first-icon' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: { xs: 1, md: 2 }, width: { xs: "1.5rem", md: "3rem" }, height: { xs: "1.5rem", md: "3rem" }, mx: "auto" }} />
      </Box>
      <Box className='ascii-code' sx={{ fontSize: { xs: "20px", md: "25px" }, opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ flexShrink: 0 }}>{`ASCII code: `}</div>
        <Box sx={{ fontSize: { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"["}
        </Box>
        <Box sx={{ fontSize: { xs: "18px", md: "22px" }, mx: "auto" }}>{`${inputVal.split("").map((item) => item.charCodeAt()).join(`,\u00A0 \u00A0`)}`}</Box>
        <Box sx={{ fontSize: { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"]"}
        </Box>
      </Box>
      <Box className='second-icon' sx={{ fontSize: { xs: "20px", md: "28px" }, opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: { xs: 1, md: 2 }, width: { xs: "1.5rem", md: "3rem" }, height: { xs: "1.5rem", md: "3rem" }, mx: "auto" }} />
      </Box>
      <Box className='binary-code' sx={{ fontSize: { xs: "20px", md: "25px" }, opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginRight: "10px", flexShrink: 0 }}>{`Binary code: `}</div>
        <Box sx={{ fontSize: binaryData.length > 6 ? "120px" : { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"["}
        </Box>
        <Box sx={{ fontSize: binaryData.length > 6 ? { xs: "15px", md: "18px" } : { xs: "18px", md: "22px" }, mx: "auto" }}>{`${binaryData.join(`,\u00A0 \u00A0`)}`}</Box>
        <Box sx={{ fontSize: binaryData.length > 6 ? "120px" : { xs: "65px", md: "85px" }, fontWeight: 300 }}>
          {"]"}
        </Box>
      </Box>
    </Stack>
  )
}

StepOne.propTypes = {
  inputVal: PropTypes.string,
  binaryData: PropTypes.array,
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
}

export default StepOne
