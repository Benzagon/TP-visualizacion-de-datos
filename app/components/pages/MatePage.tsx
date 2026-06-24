import React from 'react'
import MateSection from '../MateSection'
import { MasTomanMate } from '../MasToman'
import { ProduccionMate } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'
import TiposDeMate from '../TiposDeMate'
import ComoPrepararMate from '../ComoPrepararMate'
import { MapaMate } from '../Mapas'

const MatePage = () => {
  return (
    <>
        <MateSection />
        <ParalaxSeparator title="Nada más argentino que el mate" image="/mate_prod.jpg" highlightedWord='mate'/>
        <ProduccionMate />
        <ParalaxSeparator title="Los tipos de mate" image="/tipos_mate.jpg" highlightedWord='mate'/>
        <TiposDeMate />
        <MasTomanMate />
        <ParalaxSeparator title="El consumo" image="/mate_consumo.jpg" highlightedWord='consumo'/>
        <MapaMate />
        <ParalaxSeparator title="El arte de armar un buen mate" image="/mate_consumo.jpg" highlightedWord='armar'/>
        <ComoPrepararMate />
    </>
)
}

export default MatePage