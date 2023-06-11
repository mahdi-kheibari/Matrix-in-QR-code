import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
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
import StepFive from '../sections/generate/StepFive';
import StepSix from '../sections/generate/StepSix';
import StepSeven from '../sections/generate/StepSeven';
// custom hooks
import useResponsive from '../hooks/useResponsive';

const STEPS = [
  { step: 1, title: "Text to binary", component: (props) => (<StepOne {...props} />) },
  { step: 2, title: "Create binary matrix", component: (props) => (<StepTwo {...props} />) },
  { step: 3, title: "Set default config", component: (props) => (<StepThree {...props} />) },
  { step: 4, title: "Add data to main matrix", component: (props) => (<StepFour {...props} />) },
  { step: 5, title: "Create error correction message", component: (props) => (<StepFive {...props} />) },
  { step: 6, title: "Add mask pattern", component: (props) => (<StepSix {...props} />) },
  { step: 7, title: "Create QR code image", component: (props) => (<StepSeven {...props} />) },
]

export default function GeneratePage() {
  const canvasRef = useRef(null);
  const mdAndDown = useResponsive('down', 'md')
  const [qrArray, setQRArray] = useState([]);
  const [qrMatrix, setQrMatrix] = useState(initGenerateMatrix);
  const [inputVal, setInputVal] = useState("");
  const [binaryData, setBinaryData] = useState([]);
  const [generate, setGenerate] = useState(false);
  const [changeStep, setChangeStep] = useState(false);
  const [step, setStep] = useState(1);
  const stepTitle = useRef(null);
  const animation = useRef(null);
  const textAnimation = useRef(null);
  const otherElAnimation = useRef(null);
  const configAnimation = useRef(null);
  const defaultConfigRef = useRef(null);

  useEffect(() => {
    if (stepTitle.current) {
      stepTitleAnime()
    }
  }, [step]);

  useEffect(() => {
    if (generate) {
      const canvas = canvasRef.current;
      generateQRCodeCanvas(qrMatrix, canvas);
      otherElAnimation.current = anime.timeline({
        autoplay: false,
        easing: "easeInOutSine"
      })
        .add({
          targets: `.first .zoomIn`,
          fontSize: mdAndDown ? "120px" : "275px",
          duration: 500
        })
        .add({
          targets: `.first .data`,
          fontSize: ["0", mdAndDown ? "4px" : "10px"],
          lineHeight: ["0", mdAndDown ? "4.5px" : "11px"],
          duration: 1300
        })
        .add({
          targets: `.down-icon`,
          opacity: 1,
          translateY: [-40, mdAndDown ? 0 : -30],
          duration: 1500,
        })
        .add({
          targets: `.qr-canvas`,
          width: [0, mdAndDown ? 115 : 230],
          height: mdAndDown ? 115 : 230,
          duration: 1500,
        })
      otherElAnimation.current.play()
    }
  }, [qrMatrix, generate]);

  useEffect(() => {
    if (generate) {
      generateQRCodeImg()
      animation.current = anime.timeline({
        easing: "easeInOutSine"
      })
        .add({
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
  const generateQRCodeCanvas = (qrArray, canvas) => {
    const context = canvas.getContext('2d');
    const cellSize = mdAndDown ? 5 : 10;
    const margin = mdAndDown ? 5 : 10;

    const qrSize = qrArray.length;
    const canvasSize = qrSize * cellSize + 2 * margin;

    canvas.width = canvasSize;
    canvas.height = canvasSize;


    context.fillStyle = '#DBD8E3';
    context.fillRect(0, 0, canvasSize, canvasSize);
    context.fillStyle = '#352F44';


    for (let i = 0; i < qrSize; i += 1) {
      for (let j = 0; j < qrSize; j += 1) {
        if (qrArray[i][j] === 1) {
          context.fillRect(margin + j * cellSize, margin + i * cellSize, cellSize, cellSize);
        }
      }
    }
  };
  // generate QR code img to array
  const generateQRCodeImg = () => {
    QRCode.toDataURL(inputVal, { errorCorrectionLevel: 'L', maskPattern: 0b001 })
      .then(dataURL => {
        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const qrData = context.getImageData(0, 0, img.width, img.height).data;

          const qrArray = [];
          for (let y = 0; y < img.height; y += 1) {
            qrArray[y] = [];
            for (let x = 0; x < img.width; x += 1) {
              const pixelIndex = (y * img.width + x) * 4;
              const isBlack = qrData[pixelIndex] < 128;
              qrArray[y][x] = isBlack ? 1 : 0;
            }
          }

          setQRArray(qrArray);
        };
      })
      .catch(error => console.error(error));
  };

  const handleGenerateBtn = () => {
    if (inputVal) {
      setGenerate(true)
    }
  }
  const handleChangeStep = () => {
    setChangeStep(true)
  }

  const handleDefaultConfigImg = () => {
    function setConfig() {
      const defaultConfigIndex = [
        [0, 1, 2, 3, 4, 5, 6, 8, 14, 15, 16, 17, 18, 19, 20],
        [0, 6, 8, 14, 20],
        [0, 2, 3, 4, 6, 8, 14, 16, 17, 18, 20],
        [0, 2, 3, 4, 6, 8, 14, 16, 17, 18, 20],
        [0, 2, 3, 4, 6, 8, 14, 16, 17, 18, 20],
        [0, 6, 8, 14, 20],
        [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 17, 18, 19, 20],
        [8],
        [0, 1, 2, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20],
        [],
        [6],
        [],
        [6],
        [8],
        [0, 1, 2, 3, 4, 5, 6, 8],
        [0, 6, 8],
        [0, 2, 3, 4, 6],
        [0, 2, 3, 4, 6],
        [0, 2, 3, 4, 6, 8],
        [0, 6, 8, 19, 20],
        [0, 1, 2, 3, 4, 5, 6, 8, 19, 20],
      ]
      defaultConfigIndex.forEach((item, index) => {
        item.forEach((i) => {
          setQrMatrix(prev => prev.map((row, indexRow) => {
            if (indexRow === index) {
              return row.map((col, indexCol) => indexCol === i ? qrArray[((index + 4) * 4) + 1][((i + 4) * 4) + 1] : col)
            }
            return row
          }))
        })
      })
    }
    function play() {
      configAnimation.current = anime.timeline({
        autoplay: false,
        easing: "easeInOutSine"
      }).add({
        targets: `.default-config`,
        keyframes: [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 1 },
        ],
        loop: 4,
        duration: 1500,
        delay: 1000
      })
      configAnimation.current.play()
    }
    return {
      play: () => play(),
      pause: () => {
        configAnimation.current = anime({
          autoplay: true,
          targets: `.default-config`,
          opacity: [1, 0],
          duration: 1500
        })
        defaultConfigRef.current.style.visibility = "hidden"
      },
      setConfig
    }
  }
  const handleMaskConfigImg = () => {
    configAnimation.current = anime.timeline({
      autoplay: false,
      easing: "easeInOutSine"
    }).add({
      targets: `.mask-config`,
      keyframes: [
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
      ],
      loop: 4,
      duration: 2000,
      delay: 2000
    })
    return {
      play: () => configAnimation.current.play(),
      pause: () => {
        configAnimation.current = anime({
          autoplay: true,
          targets: `.mask-config`,
          opacity: [1, 0],
          duration: 1500
        })
      }
    }
  }
  const setDataToMatrix = () => {
    let startRow = 18
    let startCol = 20
    let horizontalMatrixIndex = 0
    const horizontalMatrix = [9, 20, 9, 20, 0]
    let rowOperation = -1
    let counter = 0
    const lengthMatrix = binaryData.length.toString(2);
    const newBinaryData = [new Array(9 - lengthMatrix.length).join('0') + lengthMatrix, ...binaryData]
    const operation = (row, indexRow) => {
      if (indexRow === startRow) {
        return row.map((col, indexCol) => {
          if (indexCol === startCol) {
            // console.log(`[${indexRow}][${indexCol}]`);
            return parseInt(newBinaryData.join("")[counter], 10)
          }
          return col
        })
      }
      return row
    }
    let newQrMatrix = [...qrMatrix]
    while (counter < newBinaryData.join("").length) {
      if (startRow !== horizontalMatrix[horizontalMatrixIndex]) {
        for (let i = 0; i < 2; i += 1) {
          newQrMatrix = newQrMatrix.map((row, indexRow) => {
            return operation(row, indexRow)
          })
          counter += 1
          startCol -= 1
        }
        startCol += 2
        startRow += rowOperation
      } else {
        for (let i = 0; i < 4; i += 1) {
          newQrMatrix = newQrMatrix.map((row, indexRow) => {
            return operation(row, indexRow)
          })
          counter += 1
          startCol -= 1
        }
        startCol += 2
        rowOperation *= -1
        startRow += rowOperation
        horizontalMatrixIndex += 1
      }
    }
    setQrMatrix(newQrMatrix)
  }
  const setAllDataToMatrix = () => {
    const newQrMatrix = [...qrMatrix]
    for (let indexRow = 0; indexRow < 21; indexRow += 1) {
      for (let indexCol = 0; indexCol < 21; indexCol += 1) {
        newQrMatrix[indexRow][indexCol] = qrArray[((indexRow + 4) * 4) + 1][((indexCol + 4) * 4) + 1]
      }
    }
    setQrMatrix(newQrMatrix)
  }
  const handleDownloadImage = () => {
    return canvasRef.current.toDataURL("image/png");
  }
  return (
    <>
      <Helmet>
        <title> QR code | Generate </title>
      </Helmet>
      <Container maxWidth={'lg'} sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box className='input' component={'section'} sx={{ my: 2 }}>
          <Stack direction={mdAndDown ? "column" : "row"} spacing={5} alignItems={"center"}>
            {(!mdAndDown || !generate) && <Button variant="outlined" color="secondary" sx={{ mb: "20px" }} size='large' onClick={() => { setInputVal(Math.random().toString(36).slice(2, 7)); setGenerate(true) }} disabled={generate}>
              Generate new
            </Button>}
            {(!mdAndDown || !generate) && <Box sx={{ fontSize: "20px", fontWeight: "bold", mb: "20px !important" }}> Or </Box>}
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
        {generate && <Grid className='steps' container component={'section'} sx={{ my: { md: 2 }, opacity: 0, transform: "translateY(300px)" }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, alignItems: "center" }}>
              <Box className="first" sx={{ width: "425px", height: { md: "380px" }, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 2 }}>
                <Box className="zoomIn" sx={{ fontSize: 0, fontWeight: 300 }}>
                  {"["}
                </Box>
                <Box sx={{ position: "relative" }}>
                  {qrMatrix.map((item, index) => {
                    const data = item.map((i, innerIndex) => <Box component={'span'} key={innerIndex} >{`${i}${innerIndex !== item.length - 1 ? "\u00A0 \u00A0" : ""}`}</Box>)
                    return (
                      <Box key={index} className='data' >
                        {data}
                      </Box>
                    )
                  })}
                </Box>
                <Box className="zoomIn" sx={{ fontSize: 0, fontWeight: 300 }}>
                  {"]"}
                </Box>
              </Box>
              <Box className='down-icon' sx={{ fontSize: "28px", opacity: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 3 }}>
                <Iconify icon="icon-park-twotone:down-two" sx={{ my: 2, width: { xs: "1.5rem", md: "3rem" }, height: { xs: "1.5rem", md: "3rem" }, mx: { md: "auto" }, transform: { xs: "rotate(-90deg)", md: "initial" } }} />
              </Box>
              <Box className='qr-canvas' sx={{ width: "0", height: "0", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <Box className='default-config' ref={defaultConfigRef} component={'img'} sx={{ position: "absolute", top: 0, bottom: 0, opacity: 0 }} src='/assets/images/qrcode_config.png' />
                <Box className='mask-config' component={'img'} sx={{ position: "absolute", top: 0, bottom: 0, opacity: 0 }} src='/assets/images/qrcode_mask.png' />
                <canvas ref={canvasRef} style={{ width: { xs: "115px", md: "230px" }, height: { xs: "115px", md: "230px" } }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={1} sx={{ display: "flex", justifyContent: "center", my: { xs: 1, md: "initial" } }}>
            <Divider orientation={mdAndDown ? "horizontal" : 'vertical'} sx={{ width: { xs: "100%", md: "initial" } }} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h3" fontWeight={500} sx={{ display: "flex", alignItems: "center", position: "relative", fontSize: { xs: "18px", md: "25px" } }}>
                <span style={{ flexShrink: 0 }}>{`Step ${step}: `}</span>
                <Box className='step-title' ref={stepTitle} sx={{ fontSize: { xs: "18px", md: "25px" }, ml: 1, position: "relative" }}>
                  <Box component={'span'} className="line" sx={{ position: "absolute", top: 0, left: 0, opacity: 0, height: "100%", width: "3px", backgroundColor: "#fff", transformOrigin: "0 50%" }} />
                  {STEPS.find(item => item.step === step).title.split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item}</Box>))}
                </Box>
              </Typography>
              <Button variant="outlined" color="secondary" onClick={handleChangeStep} disabled={step === STEPS.length} sx={{ position: "relative", zIndex: 10 }}>
                next
                <Iconify icon="icon-park-twotone:right-one" />
              </Button>
            </Box>
            {STEPS.find((item) => item.step === step).component({ inputVal, binaryData, setStep, changeStep, setChangeStep, handleDefaultConfigImg, setDataToMatrix, setAllDataToMatrix, handleMaskConfigImg, handleDownloadImage })}
          </Grid>
        </Grid>
        }
      </Container>
    </>
  );
}
