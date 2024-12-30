import React from 'react'
import { Link } from 'react-router-dom'

const Errorpage = () => {
  return (
    <div>
      Page not found
      <Link to={'/'} >Back</Link>
    </div>
  )
}

export default Errorpage
