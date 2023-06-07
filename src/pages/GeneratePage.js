import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import Container from '@mui/material/Container';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
// anime js
import anime from 'animejs';
// mock data
import { initGenerateMatrix } from '../_mock/qrData';
// iconify
import Iconify from '../components/iconify/Iconify';
// section
import StepOne from '../sections/generate/StepOne';
import StepTwo from '../sections/generate/StepTwo';
import StepThree from '../sections/generate/StepThree';
import StepFour from '../sections/generate/StepFour';

const STEPS = [
  { step: 1, title: "Text to binary", component: (props) => (<StepOne {...props} />) },
  { step: 2, title: "Create binary matrix", component: (props) => (<StepTwo {...props} />) },
  { step: 3, title: "Set default config", component: (props) => (<StepThree {...props} />) },
  { step: 4, title: "Add data to main matrix", component: (props) => (<StepFour {...props} />) },
  { step: 5, title: "Create error correction message", component: (props) => (<StepOne {...props} />) },
  { step: 6, title: "Create QR code image", component: (props) => (<StepOne {...props} />) },
]

export default function GeneratePage() {
  const canvasRef = useRef(null);

  const [qrMatrix, setQrMatrix] = useState(initGenerateMatrix);
  const [inputVal, setInputVal] = useState("");
  const [binaryData, setBinaryData] = useState([]);
  const [generate, setGenerate] = useState(false);
  const [step, setStep] = useState(1);
  const stepTitle = useRef(null);
  const animation = useRef(null);
  const textAnimation = useRef(null);

  useEffect(() => {
    if (stepTitle.current) {
      stepTitleAnime()
    }
  }, [step]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (generate) {
      generateQRCode(qrMatrix, canvas);
    }
  }, [qrMatrix]);

  useEffect(() => {
    if (generate) {
      animation.current = anime.timeline({
        easing: "easeInOutSine"
      });
      animation.current.add({
        targets: `.input`,
        translateY: 10,
        duration: 500
      })
        .add({
          targets: `.steps`,
          opacity: 1,
          translateY: -10,
          duration: 1500
        })
      stepTitleAnime()
      setBinaryData(inputVal.split("").map((item) => { const newItem = item.charCodeAt(0).toString(2); return new Array(9 - newItem.length).join('0') + newItem }))
    }
  }, [generate]);

  // text animation
  const stepTitleAnime = () => {
    textAnimation.current = anime.timeline({
      autoplay: false,
      easing: "easeInOutSine"
    })
      .add({
        targets: '.step-title .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700
      })
      .add({
        targets: '.step-title .line',
        translateX: [0, stepTitle.current.getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
      })
      .add({
        targets: '.step-title .letter',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=775',
        delay: (el, i) => 34 * (i + 1)
      })
      .add({
        targets: '.step-title .line',
        scaleY: [1, 0],
        opacity: [1, 0.5],
        easing: "easeOutExpo",
        duration: 700
      })
    textAnimation.current.play()
  }
  // generate QR code matrix to canvas
  const generateQRCode = (qrArray, canvas) => {
    const context = canvas.getContext('2d');
    const cellSize = 10;

    const qrSize = qrArray.length;
    const canvasSize = qrSize * cellSize;

    canvas.width = canvasSize;
    canvas.height = canvasSize;


    context.fillStyle = '#DBD8E3';
    context.fillRect(0, 0, canvasSize, canvasSize);

    context.fillStyle = '#352F44';

    for (let i = 0; i < qrSize; i += 1) {
      for (let j = 0; j < qrSize; j += 1) {
        if (qrArray[i][j] === 1) {
          context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  const handleGenerateBtn = () => {
    if (inputVal) {
      setGenerate(true)
    }
  }
  return (
    <>
      <Helmet>
        <title> QR code | Generate </title>
      </Helmet>
      <Container maxWidth={'lg'} sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box className='input' component={'section'} sx={{ my: 2 }}>
          <Stack direction={"row"} spacing={5} alignItems={"center"}>
            <Button variant="outlined" color="secondary" sx={{ mb: "20px" }} size='large' onClick={() => { setInputVal(Math.random().toString(36).slice(2, 7)); setGenerate(true) }} disabled={generate}>
              Generate new
            </Button>
            <Box sx={{ fontSize: "20px", fontWeight: "bold", mb: "20px !important" }}> Or </Box>
            <Box sx={{ display: "flex", alignItems: "stretch", alignSelf: "flex-end" }}>
              <TextField
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                variant='outlined'
                color='secondary'
                placeholder='Enter your text ...'
                helperText='limit 12 characters'
                sx={{ "& input": { py: "13px", color: "secondary.main" }, }}
                inputProps={{
                  readOnly: generate,
                  maxLength: 12
                }}
              />
              <Button variant="outlined" color="secondary" size='large' onClick={handleGenerateBtn} disabled={generate}>
                Create
              </Button>
            </Box>
          </Stack>
        </Box>
        {generate && <Grid className='steps' container component={'section'} sx={{ my: 2, opacity: 0, transform: "translateY(300px)" }}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Grid container>
                <Grid item xs={1} sx={{ lineHeight: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Box className="animate__animated animate__zoomIn" sx={{ fontSize: "275px", fontWeight: 300 }}>
                    {"["}
                  </Box>
                </Grid>
                <Grid item xs={10} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 2 }}>
                  {qrMatrix.map((item, index) => {
                    const data = item.map((i, innerIndex) => <Box component={'span'} key={innerIndex} className='animate__animated animate__fadeInDown animate__slower'>{`${i}${innerIndex !== item.length - 1 ? "\u00A0 \u00A0" : ""}`}</Box>)
                    return (
                      <Box key={index} sx={{ fontSize: "11.2px", lineHeight: "11px" }}>
                        {data}
                      </Box>
                    )
                  })}
                </Grid>
                <Grid item xs={1} sx={{ lineHeight: 1 }}>
                  <Box className="animate__animated animate__zoomIn" sx={{ fontSize: "275px", fontWeight: 300 }}>
                    {"]"}
                  </Box>
                </Grid>
              </Grid>
              <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: "3rem", height: "3rem", mx: "auto" }} />
              <canvas ref={canvasRef} style={{ width: "270px", height: "270px" }} />
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Divider orientation='vertical' />
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h3" fontWeight={500} sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                <span>{`Step ${step}: `}</span>
                <Box className='step-title' ref={stepTitle} sx={{ fontSize: "25px", ml: 1, position: "relative" }}>
                  <Box component={'span'} className="line" sx={{ position: "absolute", top: 0, left: 0, opacity: 0, height: "100%", width: "3px", backgroundColor: "#fff", transformOrigin: "0 50%" }} />
                  {STEPS.find(item => item.step === step).title.split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item}</Box>))}
                </Box>
              </Typography>
              <Button variant="outlined" color="secondary" onClick={() => { setStep((prev) => prev + 1); }} disabled={step === STEPS.length}>
                next
                <Iconify icon="icon-park-twotone:right-one" />
              </Button>
            </Box>
            {STEPS.find((item) => item.step === step).component({ inputVal, binaryData })}
          </Grid>
        </Grid>}
      </Container>
    </>
  );
}
