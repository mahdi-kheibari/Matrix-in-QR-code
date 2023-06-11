import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
// anime js
import anime from 'animejs';
// mock data
import { animationData } from '../_mock/qrData';
// custom hooks
import useResponsive from '../hooks/useResponsive';
// images
import animationSvg from '../assets/images/animation.svg';
import generateSvg from '../assets/images/generate.svg';
import scanGif from '../assets/images/scan.gif';

export default function QRPage() {
  const animation = useRef(null);

  const mdAndDown = useResponsive('down', 'md')
  useEffect(() => {
    animation.current = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine"
    });
    animation.current.add({
      targets: `.first .zoomIn`,
      fontSize: mdAndDown ? "305px" : "316.5px",
      duration: 500
    });
    animation.current.add({
      targets: `.first .data`,
      fontSize: mdAndDown ? "11.5px" : "12.5px",
      lineHeight: "16.5px",
      duration: 1300
    });
    animation.current.add({
      targets: `.first .qrcode`,
      keyframes: [
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
      ],
      duration: 500,
      delay: 500
    });
    animation.current.add({
      targets: `.first`,
      translateY: -50,
      duration: 1000,
    });
    animation.current.add({
      targets: `.btn-section .text`,
      translateY: -70,
      opacity: 1,
      duration: 1000,
    });
    animation.current.add({
      targets: `.btn-section .btn`,
      translateY: -70,
      opacity: 1,
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box className="first" sx={{ width: "425px", height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box className="zoomIn" sx={{ fontSize: 0, fontWeight: 300 }}>
            {"["}
          </Box>
          <Box sx={{ position: "relative" }}>
            {animationData.map((item, index) => {
              const data = item.map((i, innerIndex) => <Box component={'span'} key={innerIndex} className=''>{`${i}${innerIndex !== item.length - 1 ? "\u00A0 \u00A0" : ""}`}</Box>)
              return (
                <Box key={index} className='data' sx={{ fontSize: 0, lineHeight: 0 }}>
                  {data}
                </Box>
              )
            })}
            <Box component={'img'} className="qrcode" src={animationSvg} width={'100%'} height={'100%'} sx={{ position: "absolute", top: 0, left: 0, scale: "1.5", opacity: 0, objectFit: "contain" }} />
          </Box>
          <Box className="zoomIn" sx={{ fontSize: 0, fontWeight: 300 }}>
            {"]"}
          </Box>
        </Box>
        <Stack className='btn-section' direction={"column"}>
          <Typography className='text' variant="h2" sx={{ mb: 1, transform: "translateY(-100px)", opacity: 0 }}>
            Matrix in QR code
          </Typography>
          <Grid className='btn' container spacing={1} sx={{ transform: "translateY(-100px)", opacity: 0 }}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={"generate"}
                sx={{ display: "flex", flexDirection: "column", fontWeight: "normal", fontSize: "20px", flexGrow: 1, width: "100%" }}
              >
                <Box component={'img'} src={generateSvg} alt='generate' width={65} height={65} sx={{ my: 1 }} />
                Generating
              </Button>
            </Grid>
            <Grid item xs={6} >
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={"scan"}
                sx={{ display: "flex", flexDirection: "column", fontWeight: "normal", fontSize: "20px", flexGrow: 1, width: "100%" }}
              >
                <Box component={'img'} src={scanGif} alt='generate' width={65} height={65} sx={{ my: 1 }} />
                Scaning
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container >
    </>
  );
}
