import React from 'react'
import MateSection from '../MateSection'
import { MasTomanMate } from '../MasToman'
import { ProduccionMate } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'
import TiposDeMate from '../TiposDeMate'

const MatePage = () => {
  return (
    <>
        <MateSection />
        <ParalaxSeparator title="La producción" image="/mate_prod.jpg" />
        <ProduccionMate />
        <ParalaxSeparator title="Los tipos de Mate" image="/tipos_mate.jpg" />
        <TiposDeMate />
        <MasTomanMate />
        <ParalaxSeparator title="El consumo" image="/mate_consumo.jpg" />
    </>
)
}

export default MatePage