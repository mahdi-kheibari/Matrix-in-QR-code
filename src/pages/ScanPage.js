import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import jsQR from 'jsqr';
// @mui
import Container from '@mui/material/Container';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
// anime js
import anime from 'animejs';
// components
import Iconify from '../components/iconify/Iconify'


export default function ScanPage() {
  const uploadInputRef = useRef(null)
  const animation = useRef(null)
  const hideInputAnimation = useRef(null)
  const textAnimation = useRef(null)
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (preview) {
      animation.current = anime.timeline({
        easing: "easeInOutSine"
      })
        .add({
          targets: `.preview`,
          opacity: [0, 1],
          duration: 500
        })
        .add({
          targets: `.preview .scanner`,
          keyframes: [
            { translateY: 0 },
            { translateY: "300px" },
            { translateY: 0 },
            { translateY: "300px" },
            { translateY: 0 },
          ],
          duration: 3000,
        })
        .add({
          targets: `.preview .scanner`,
          opacity: [1, 0],
          duration: 1000,
        })
        .add({
          targets: `.preview`,
          translateX: -400,
          translateY: 150,
          duration: 1000,
        })
        .add({
          targets: `.divider-2`,
          opacity: [0, 1],
          duration: 1000,
        })
        .add({
          targets: `.divider`,
          height: ["0px", "600px"],
          duration: 1000,
          complete: () => sectionTitleAnime()
        })
        .add({
          targets: `.bracket`,
          opacity: [0, 1],
          width: ["0%", "100%"],
          duration: 1500,
          delay: (el, i) => 50 * (i + 1)
        })
        .add({
          targets: `.bracket-data`,
          fontSize: ["0", "14px"],
          duration: 1000,
          delay: (el, i) => 50 * (i + 1)
        })
    }
  }, [preview]);

  // text animation
  const sectionTitleAnime = () => {
    textAnimation.current = anime.timeline({
      autoplay: false,
      easing: "easeInOutSine"
    })
      .add({
        targets: '.info',
        translateY: -300,
        easing: "easeOutExpo",
        duration: 300
      })
      .add({
        targets: '.info',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 500
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

  const handleSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      hideInputAnimation.current = anime.timeline({
        easing: "easeInOutSine"
      })
        .add({
          targets: `.input`,
          opacity: 0,
          duration: 1000,
          complete: () => {
            handleUpload(e)
            const previewUrl = URL.createObjectURL(e.target.files[0])
            setPreview(previewUrl)
          }
        })
    }
  }
  function handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        console.log(code);
        if (code) {
          setResult({
            content: code.data,
            encodeType: code.chunks[0].type,
            version: code.version,
            binaryData: code.binaryData.map((item) => { const newItem = item.toString(2); return new Array(9 - newItem.length).join('0') + newItem })
          })
        } else {
          console.log('No QR code found.');
        }
      };

      // Set the image source to the loaded data
      img.src = event.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }

  return (
    <>
      <Helmet>
        <title> QR code | Scan </title>
      </Helmet>
      <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box component={'section'} sx={{ my: 2 }}>
          {!preview ? (
            <Stack className='input' direction={"row"} spacing={5} alignItems={"baseline"}>
              <Box sx={{ fontSize: "20px", fontWeight: "bold", mb: "20px !important" }}> Upload your QR code : </Box>
              <Button variant="outlined" color="secondary" sx={{ mb: "20px" }} size='large' onClick={() => uploadInputRef.current.click()} disabled={preview || false}>
                <input
                  ref={uploadInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  hidden
                  onChange={(e) => handleSelectFile(e)}
                />
                Upload
              </Button>
            </Stack>
          ) : (
            <Box className='preview' sx={{ width: "300px", height: "300px", backgroundImage: `url('${preview}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
              <Divider className='scanner' sx={{ borderWidth: "5px", borderColor: "error.main", opacity: 0.8 }} />
            </Box>
          )}
        </Box >
        {result && <Grid className='info' container component={'section'} sx={{ my: 2, opacity: 0 }}>
          <Grid item xs={4} />
          <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Divider className='divider' orientation='vertical' />
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid", borderColor: "secondary.main", borderRadius: "10px", width: "100%", pt: 2 }}>
              <Typography variant="h3" fontWeight={500} sx={{ display: "flex", alignItems: "center", position: "relative", mr: "auto", ml: 1 }}>
                <Box className='step-title' sx={{ fontSize: "25px", ml: 1, position: "relative" }}>
                  {`QR code info: `.split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item}</Box>))}
                </Box>
              </Typography>
              <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center", p: 2 }}>
                <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
                  <Iconify icon="ph:info" sx={{ mx: 1 }} />
                  <span>{`Version : ${result.version}`}</span>
                </Typography>
                <Typography variant="h5" sx={{ display: "flex", alignItems: "center", my: 2, mr: "auto", ml: 1, fontWeight: "normal" }}>
                  <Iconify icon="ph:info" sx={{ mx: 1 }} />
                  <span>{`Encode type : ${result.encodeType}`}</span>
                </Typography>
              </Box>
            </Box>
            <Divider className='divider-2' sx={{ mt: 2 }} />
            <Typography variant="h3" fontWeight={500} sx={{ display: "flex", alignItems: "center", position: "relative", mr: "auto", ml: 1 }}>
              <Box className='step-title' sx={{ fontSize: "25px", ml: 1, position: "relative" }}>
                {`Binary Data: `.split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item}</Box>))}
              </Box>
            </Typography>
            <Grid container spacing={0.5}>
              {result.binaryData.map((item, index) => (
                <Grid item xs={3} key={index} sx={{ width: "192px", height: "192px" }}>
                  <Grid container className='bracket' spacing={0} sx={{ backgroundImage: "url('/assets/icons/bracket.svg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", height: "100%", alignContent: "center", backgroundPosition: "center" }}>
                    {item.split("").map((i, innerIndex) =>
                      <Grid key={innerIndex} item xs={6} sx={{ height: "fit-content", pt: "0 !important" }}>
                        <Box className='bracket-data' sx={{ ml: 4.5, mr: 1, fontSize: "14px" }}>{i}</Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Divider className='divider-2' sx={{ mt: 2 }} />
            <Typography variant="h3" fontWeight={500} sx={{ display: "flex", alignItems: "center", position: "relative", mr: "auto", ml: 1 }}>
              <Box className='step-title' sx={{ fontSize: "25px", ml: 1, position: "relative" }}>
                {`Result: `.split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item}</Box>))}
              </Box>
            </Typography>
            <Box sx={{ display: "flex", justifyItems: "center" }}>
              <TextField
                value={result.content}
                variant='outlined'
                color='secondary'
                sx={{ mx: "auto", "& input": { py: 3, fontSize: "25px", color: "secondary.main" }, }}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Grid>
        </Grid>
        }
      </Container >
    </>
  );
}
