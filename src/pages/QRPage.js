import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import Container from '@mui/material/Container';
import { Box, Typography, Button, Stack, Grow } from '@mui/material';
// mock data
import { animationData } from '../_mock/qrData';

export default function QRPage() {
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true)
  }, 2500);
  return (
    <>
      <Helmet>
        <title> QR code </title>
      </Helmet>
      <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ position: "relative", overflow: "hidden", width: "380px", height: "380px" }}>
          <Box className="animate__animated animate__zoomIn" sx={{ fontSize: "316.5px", position: "absolute", left: "-8px", top: "-55.5px", fontWeight: 300 }}>
            {"["}
          </Box>
          <Box className="animate__animated animate__zoomIn" sx={{ fontSize: "316.5px", position: "absolute", right: "-8px", top: "-55.5px", fontWeight: 300 }}>
            {"]"}
          </Box>
          <Box sx={{ position: "absolute", top: "57.5px", left: "52.25px" }}>
            {animationData.map((item, index) => {
              const data = item.map((i, innerIndex) => <Box component={'span'} key={innerIndex} className='animate__animated animate__fadeInDown animate__slower'>{`${i}${innerIndex !== item.length - 1 ? "\u00A0 \u00A0" : ""}`}</Box>)
              return (
                <Box key={index} sx={{ fontSize: "12.5px", lineHeight: "16.5px" }}>
                  {data}
                </Box>
              )
            })}
          </Box>
          {show && (<Box component={'img'} src='/assets/images/animation.svg' width={'100%'} height={'100%'} className='animate__animated animate__flash animate__fast' sx={{ position: "absolute", top: "0", left: "0", objectFit: "contain" }} />)}
        </Box>
        {show && <Stack direction={"column"} className=''>
          <Grow in={show} timeout={5500}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Matrix in QR code
            </Typography>
          </Grow>
          <Grow in={show} timeout={5500}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={"generate"}
                sx={{ display: "flex", flexDirection: "column", fontWeight: "normal", fontSize: "20px", flexGrow: 1 }}
              >
                <Box component={'img'} src='/assets/images/generate.svg' alt='generate' width={65} height={65} sx={{ my: 1 }} />
                Generating
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={"scan"}
                sx={{ display: "flex", flexDirection: "column", fontWeight: "normal", fontSize: "20px", flexGrow: 1, ml: 1 }}
              >
                <Box component={'img'} src='/assets/images/scan.gif' alt='generate' width={65} height={65} sx={{ my: 1 }} />
                Scaning
              </Button>
            </Box>
          </Grow>
        </Stack>}
      </Container>
    </>
  );
}
