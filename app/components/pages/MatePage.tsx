import React from 'react'
import MateSection from '../MateSection'
import { MasTomanMate } from '../MasToman'
import { ProduccionMate } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'

const MatePage = () => {
  return (
    <>
        <MateSection />
        <MasTomanMate />
        <ParalaxSeparator title="La producción" image="/mate_prod.jpg" />
        <ProduccionMate />
        <ParalaxSeparator title="El consumo" image="/mate_consumo.jpg" />
    </>
)
}

export default MatePage