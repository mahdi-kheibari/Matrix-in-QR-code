import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// @mui
import { Box, Stack, Grid, Divider, Typography } from '@mui/material'
// anime js
import anime from 'animejs';

function StepThree({ binaryData, handleDefaultConfigImg, setStep, changeStep, setChangeStep }) {
  const animation = useRef(null);
  const stepTitleAnimation = useRef(null);
  useEffect(() => {
    stepTitleAnimation.current = anime({
      targets: '.text-wrapper .letter',
      rotateY: [-90, 0],
      duration: 1300,
      delay: (el, i) => 45 * i,
      autoplay: false
    })

    animation.current = anime.timeline({
      autoplay: true,
      easing: "easeInOutSine"
    })
      .add({
        targets: `.binary-data`,
        opacity: [0.5, 1],
        duration: 500,
      })
      .add({
        targets: `.divider`,
        height: ["0%", "100%"],
        duration: 800,
        complete: () => stepTitleAnimation.current.play()
      })
      .add({
        targets: `.count-number`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: (el, i) => i * 250,
        complete: () => handleDefaultConfigImg().play()
      })
    return () => {
      handleDefaultConfigImg().pause()
    };
  }, []);
  useEffect(() => {
    if (changeStep) {
      setStep((prev) => prev + 1)
      setChangeStep(false)
    }
  }, [changeStep]);
  return (
    <Grid container spacing={1} sx={{ mt: 3 }}>
      <Grid item xs={9}>
        <Stack direction={"column"} spacing={1.5} sx={{ "& .MuiTypography-root": { fontWeight: "500 !important" } }}>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#DBD8E3" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Zm-23.25 32h13.5m-13.5-23.32L24 10.5m0 0v27" />
            </svg>
            {"Quite zone".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#e21818" strokeLinecap="round" strokeLinejoin="round" d="M33.05 19.55a9.06 9.06 0 0 0-9.54-9c-4.89.26-8.56 4.65-8.56 9.55m18.1 17.4H15l13.6-9.43a10 10 0 0 0 4.12-5.48a10.21 10.21 0 0 0 .33-2.53" />
              <path className='count-number' fill="none" stroke="#e21818" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" />
            </svg>
            {"Position pattern".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#ff8400" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" />
              <path className='count-number' fill="none" stroke="#ff8400" strokeLinecap="round" strokeLinejoin="round" d="M26.195 24.003a6.748 6.748 0 0 0 6.749-6.748h0a6.748 6.748 0 0 0-6.749-6.749" />
              <path className='count-number' fill="none" stroke="#ff8400" strokeLinecap="round" strokeLinejoin="round" d="M26.195 37.5a6.748 6.748 0 0 0 6.749-6.748h0a6.748 6.748 0 0 0-6.749-6.749M15.06 35.223c1.863 1.561 3.876 2.277 8.395 2.277h2.74M15.056 12.755c1.868-1.557 3.883-2.267 8.402-2.255l2.74.006M19.32 24.003h6.875" />
            </svg>
            {"Seperator".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#a459d1" strokeLinecap="round" strokeLinejoin="round" d="M29.59 37.5v-27L15.01 28.64h17.98" strokeDasharray="68.25306701660156" />
              <path className='count-number' fill="none" stroke="#a459d1" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" strokeDasharray="144.5681610107422" />
            </svg>
            {"Timing pattern".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#fbff00" strokeLinecap="round" strokeLinejoin="round" d="M15 35.22c1.87 1.56 3.88 2.28 8.4 2.28h1a8.72 8.72 0 0 0 8.73-8.72h0a8.72 8.72 0 0 0-8.73-8.72H15V10.5h18.1" strokeDasharray="74.38394165039062" />
              <path className='count-number' fill="none" stroke="#fbff00" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" strokeDasharray="144.5681610107422" />
            </svg>
            {"Format information".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#ff55bb" strokeLinecap="round" strokeLinejoin="round" d="M23.51 10.5c-4.89.26-8.57 4.65-8.57 9.55v8.4A9.06 9.06 0 0 0 24 37.5h0a9.06 9.06 0 0 0 9.06-9.06" strokeDasharray="50.98591232299805" />
              <path className='count-number' fill="none" stroke="#ff55bb" strokeLinecap="round" strokeLinejoin="round" d="M33.06 28.44a9.06 9.06 0 0 0-9.06-9h0a9.06 9.06 0 0 0-9.06 9.06m16.52-15.04c-1.65-2.16-3.73-3-6.62-3h-1.33" strokeDasharray="37.30769348144531" />
              <path className='count-number' fill="none" stroke="#ff55bb" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" strokeDasharray="144.5681610107422" />
            </svg>
            {"Error correction level".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#38e54d" strokeLinecap="round" strokeLinejoin="round" d="m18.39 37.5l14.6-27H15.01" strokeDasharray="48.67462158203125" />
              <path className='count-number' fill="none" stroke="#38e54d" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" strokeDasharray="144.5681610107422" />
            </svg>
            {"Mask pattern".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
          <Typography className='text-wrapper' variant="h4" sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="38" height="38" viewBox="0 0 48 48">
              <path className='count-number' fill="none" stroke="#0079FF" strokeLinecap="round" strokeLinejoin="round" d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2Z" strokeDasharray="144.5681610107422" />
              <path className='count-number' fill="none" stroke="#0079FF" strokeLinecap="round" strokeLinejoin="round" d="M21.806 24a6.75 6.75 0 0 0-6.75 6.75h0a6.75 6.75 0 0 0 6.75 6.75h4.388a6.75 6.75 0 0 0 6.75-6.75h0a6.75 6.75 0 0 0-6.75-6.75m0 0a6.75 6.75 0 0 0 6.75-6.75h0a6.75 6.75 0 0 0-6.75-6.75h-4.388a6.75 6.75 0 0 0-6.75 6.75h0a6.75 6.75 0 0 0 6.75 6.75m0 0h4.388" strokeDasharray="97.9990234375" />
            </svg>
            {"Encode type".split("").map((item, i) => (<Box component={'span'} key={i} className='letter' sx={{ transformOrigin: "0 0" }}>{item === " " ? "\u00A0" : item}</Box>))}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Divider orientation='vertical' className='divider' />
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1} className='binary-data'>
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
  binaryData: PropTypes.array,
  handleDefaultConfigImg: PropTypes.func,
  setStep: PropTypes.func,
  changeStep: PropTypes.bool,
  setChangeStep: PropTypes.func,
}

export default StepThree
