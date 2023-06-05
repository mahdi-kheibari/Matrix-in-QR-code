import React from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack } from '@mui/material'
// components
import Iconify from '../../components/iconify/Iconify'

function StepOne({ inputVal }) {
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <Box sx={{ fontSize: "28px" }}>{`[ ${inputVal.split("").join(`,\u00A0 \u00A0`)} ]`}</Box>
      <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      <div style={{ fontSize: "25px", marginRight: "auto" }}>{`ASCII code: `}</div>
      <Box sx={{ fontSize: "25px" }}>{`[ ${inputVal.split("").map((item) => item.charCodeAt()).join(`,\u00A0 \u00A0`)} ]`}</Box>
      <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      <div style={{ fontSize: "25px", marginRight: "auto" }}>{`Binary code: `}</div>
      <Box sx={{ fontSize: "22px" }}>{`[ ${inputVal.split("").map((item) => { const newItem = item.charCodeAt(0).toString(2); return new Array(9 - newItem.length).join('0') + newItem }).join(`,\u00A0 \u00A0`)} ]`}</Box>
    </Stack>
  )
}

StepOne.propTypes = {
  inputVal: PropTypes.string
}

export default StepOne
