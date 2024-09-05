import React from 'react'
import svgOne from '../svg/undraw_shopping_bags_b0o1.svg'
import svgTwo from '../svg/undraw_web_shopping_re_owap.svg'

function Section() {
  return (
    <div className='flex flex-col gap-40 border-t-2 border-b-2 py-20'>
        <div className='md:flex justify-between text-slate-600'>
            <p className='text-4xl text-center md:pb-0 pb-4'>Easy to navigate in our store</p>
            <img src={svgTwo} alt="" className='md:w-[50%]'/>
        </div>
        <div className='md:flex justify-between text-slate-600'>
            <img src={svgOne} alt="" className='md:w-[50%] md:pb-0 pb-4'/>
            <p className='text-4xl text-center'>The fastest services delivery</p>
        </div>
    </div>
  )
}

export default Section