import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid, Divider, Typography } from '@mui/material'
// components
import Iconify from '../../components/iconify/Iconify'

function StepFour({ binaryData }) {
  const [dataMatrix, setDataMatrix] = useState({ data: binaryData[0], index: 0 });
  const changeMatrix = setInterval(() => {
    if (binaryData[dataMatrix.index + 1]) {
      setDataMatrix((prev) => { return { data: binaryData[prev.index + 1], index: prev.index + 1 } })
    }
  }, 1500);
  useEffect(() => {
    if (binaryData[dataMatrix.index + 1]) {
      clearInterval(changeMatrix)
    }
    return () => {
      clearInterval(changeMatrix)
    };
  }, [dataMatrix]);
  return (
    <Grid container spacing={1} sx={{ mt: 3 }}>
      <Grid item xs={9}>
        {/* <Grid
          container
          spacing={0}
          justifyContent={'center'}
          sx={{
            backgroundImage: "url('/assets/icons/bracket.svg')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            alignContent: "center",
            backgroundPosition: "center",
            "&.MuiGrid-root": {
              "&.MuiGrid-root:nth-child(odd)": { "& .item": { textAlign: "end", mr: "50px" } },
              "&.MuiGrid-root:nth-child(2)": { "& .item": { color: "blue", mr: "185px" } },
            },
            height: "270px"
          }}>
          {dataMatrix.data?.split("").map((i, innerIndex) =>
            <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
              <Box sx={{ ml: 1, mr: 1, fontSize: "30px" }} className="item">{i}</Box>
            </Grid>
          )}
        </Grid> */}
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

StepFour.propTypes = {
  binaryData: PropTypes.array
}

export default StepFour
