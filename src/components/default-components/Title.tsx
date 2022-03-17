import React from 'react'
import { Helmet } from 'react-helmet'   

const TITLE = 'NoCom';

const Title = () => {
  return (
    <Helmet>
        <title>{ TITLE }</title>
    </Helmet>
  )
}

export default Title