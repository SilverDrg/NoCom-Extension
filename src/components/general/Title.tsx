import React from 'react'
import { Helmet } from 'react-helmet-async'   

const TITLE = 'NoCom';

export const Title = () => {
  return (
    <Helmet>
        <title>{ TITLE }</title>
    </Helmet>
  )
}
