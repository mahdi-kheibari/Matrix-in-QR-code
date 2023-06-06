import React from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid, Divider, Typography } from '@mui/material'
// components
import Iconify from '../../components/iconify/Iconify'

function StepThree({ binaryData }) {
  return (
    <Grid container spacing={1} sx={{ mt: 3 }}>
      <Grid item xs={9}>
        <Stack direction={"column"} spacing={1} sx={{ "& .MuiTypography-root": { fontWeight: "500 !important" } }}>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:1-square" sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Create quite zone
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:2-square" color={"aqua"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Position pattern
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:3-square" color={"chartreuse"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Seperator
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:4-square" color={"darkorange"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Timing pattern
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:5-square" color={"darkmagenta"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Version information
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:6-square" color={"deeppink"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Format information
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:7-square" color={"goldenrod"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Error correction keys
          </Typography>
          <Typography variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <Iconify icon="bi:8-square" color={"skyblue"} sx={{ width: "2rem", height: "3rem", mr: 1 }} />
            Encode type
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Divider orientation='vertical' />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1}>
          {binaryData.map((item, index) => (
            <Grid item xs={12} key={index} sx={{ height: "100px" }}>
              <Grid key={index} container spacing={0} sx={{ backgroundImage: "url('/assets/icons/bracket.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", alignContent: "center", backgroundPosition: "right", height: "110px" }}>
                {item.split("").map((i, innerIndex) =>
                  <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
                    <Box sx={{ ml: 3, mr: 2, fontSize: "9px" }}>{i}</Box>
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

StepThree.propTypes = {
  binaryData: PropTypes.array
}

export default StepThree
