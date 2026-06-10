import React from 'react'
import CafeSection from '../CafeSection'
import { MasTomanCafe } from '../MasToman'
import { ProduccionCafe } from '../Produccion'

const CafePage = () => {
  return (
    <>
        <CafeSection></CafeSection>
        <MasTomanCafe />
        <ProduccionCafe />
    </>
  )
}

export default CafePage