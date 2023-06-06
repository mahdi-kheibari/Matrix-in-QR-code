import React from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid } from '@mui/material'
// components
import Iconify from '../../components/iconify/Iconify'

function StepTwo({ binaryData }) {
  return (
    <Stack direction={"column"} spacing={4} justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <Box sx={{ fontSize: "22px" }}>{`Binary code: [ ${binaryData.join(`,\u00A0 \u00A0`)} ]`}</Box>
      <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
      <Grid container spacing={1}>
        {binaryData.map((item, index) => (
          <Grid item xs={3} key={index} sx={{ width: "192px", height: "192px" }}>
            <Grid container spacing={0} sx={{ backgroundImage: "url('/assets/icons/bracket.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", height: "100%", alignContent: "center", backgroundPosition: "center" }}>
              {item.split("").map((i, innerIndex) =>
                <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
                  <Box sx={{ ml: 4.5, mr: 1, fontSize: "14px" }}>{i}</Box>
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
  binaryData: PropTypes.array
}

export default StepTwo
