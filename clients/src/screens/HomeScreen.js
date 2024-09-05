import React from 'react'
import Board from '../components/Board'
import ViewProducts from '../components/ViewProducts'
import ViewDevices from '../components/ViewDevices'
import Section from '../components/Section'
import MainProducts from '../components/MainProducts'
import Footer from '../components/Footer'

function HomeScreen() {
  return (
    <div className='flex flex-col gap-20'>
        <Board/>
        <ViewProducts/>
        <ViewDevices/>
        <MainProducts/>
        <Section/>
        <Footer/>
    </div>
  )
}

export default HomeScreen