import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack } from '@mui/material'
// anime js
import anime from 'animejs';
// components
import Iconify from '../../components/iconify/Iconify'

function StepOne({ inputVal, binaryData, setStep, changeStep,setChangeStep }) {
  const animation = useRef(null);

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
          top: ["8%", "12.5%"],
          duration: 1500,
        })
        .add({
          targets: `.ascii-code`,
          opacity: 1,
          top: ["20%", "25%"],
          duration: 1500,
        })
        .add({
          targets: `.second-icon`,
          opacity: 1,
          top: ["32.5%", "38%"],
          duration: 1500,
        })
        .add({
          targets: `.binary-code`,
          opacity: 1,
          top: ["50%", "55%"],
          duration: 1500,
        })
    }
  }, [inputVal]);
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} height={"100%"} position={'relative'} overflow={'hidden'} mt={4}>
      <Box className='input-val' sx={{ fontSize: "28px", position: "absolute", left: "50%", top: "-10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {`[ ${inputVal.split("").join(`,\u00A0 \u00A0`)} ]`}
      </Box>
      <Box className='first-icon' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      </Box>
      <Box className='ascii-code' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "25px" }}>{`ASCII code: `}</div>
        <Box sx={{ fontSize: "25px", mx: "auto" }}>{`[ ${inputVal.split("").map((item) => item.charCodeAt()).join(`,\u00A0 \u00A0`)} ]`}</Box>
      </Box>
      <Box className='second-icon' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "10%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      </Box>
      <Box className='binary-code' sx={{ fontSize: "28px", opacity: 0, position: "absolute", left: "50%", top: "15%", transform: "translate(-50%,-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "25px", marginRight: "10px", flexShrink: 0 }}>{`Binary code: `}</div>
        <Box sx={{ fontSize: "85px", fontWeight: 300 }}>
          {"["}
        </Box>
        <Box sx={{ fontSize: "22px", mx: "auto" }}>{`${binaryData.join(`,\u00A0 \u00A0`)}`}</Box>
        <Box sx={{ fontSize: "85px", fontWeight: 300 }}>
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
