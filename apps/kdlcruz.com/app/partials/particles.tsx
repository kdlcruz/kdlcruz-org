'use client'

import { useCallback } from 'react'
// import { useCallback } from 'react'
import Particles from "react-particles"
import type { Engine, Container } from "tsparticles-engine"
import { loadFirePreset } from "tsparticles-preset-fire"
import { loadSnowPreset } from 'tsparticles-preset-snow'

const d = new Date();
const month = d.getMonth()

export default async function BgParticles() {
  const isBer = month >= 8
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    if (isBer) {
      await loadSnowPreset(engine)
    } else {
      await loadFirePreset(engine)
    }
  }, [isBer])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  return (
    <Particles id="tsparticles" init={particlesInit} options={{ preset: isBer ? 'snow' : 'fire', fullScreen: { enable: false }, style: { opacity: '0.7' } }} loaded={particlesLoaded}/>
  )
}
