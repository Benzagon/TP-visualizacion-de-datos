import React from 'react'
import CafeSection from '../CafeSection'
import { MasTomanCafe } from '../MasToman'
import { ProduccionCafe } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'

const CafePage = () => {
  return (
    <>
        <CafeSection></CafeSection>
        <MasTomanCafe />
        <ParalaxSeparator title="La producción" image="/cafe_prod.jpg" />
        <ProduccionCafe />
        <ParalaxSeparator title="El consumo" image="/cafe_consumo.jpg" />
    </>
  )
}

export default CafePage