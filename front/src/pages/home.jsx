import React from 'react'
import Header from '../components/header';
import Steps from '../components/Steps';
import BackgroundSlider from '../components/BackgroundSlider';
import Testimonials from '../components/Testimonials';
import Upload from '../components/Upload';

const home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <BackgroundSlider/>
        <Testimonials/>
        <Upload/>
    </div>
  )
}

export default home;