import React from 'react'
import imgError from '../svg/undraw_page_not_found_re_e9o6.svg'


function PageNotFound() {
  return (
    <div className='flex flex-col justify-center gap-20 items-center mt-20'> 
        <p className='text-center text-4xl font-light'> Page Not Found</p>
        <img src={imgError} alt="" className=''/>
    </div>
  )
}

export default PageNotFound