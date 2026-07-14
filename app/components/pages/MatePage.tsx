import React from 'react'
import MateSection from '../MateSection'
import { MasTomanMate } from '../MasToman'
import { ProduccionMate } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'
import TiposDeMate from '../TiposDeMate'
import ComoPrepararMate from '../ComoPrepararMate'
import { MapaMate } from '../Mapas'
import Ilex from '../Ilex'
import Plantation from '../Plantation'
import TiposYerba from '../TiposYerba'

const MatePage = () => {
  return (
    <>
        <ParalaxSeparator title="La fuente de la infusión" image="/planta.jpg" highlightedWord='fuente'/>
        <Ilex/>
        <Plantation />
        <ParalaxSeparator title="Nada más argentino que el mate" image="/mate_prod.jpg" highlightedWord='mate'/>
        <ProduccionMate />
        <ParalaxSeparator title="La anatomía de un mate" image="/anatomiaMate.png" highlightedWord='anatomía'/>
        <MateSection />
        <ParalaxSeparator title="Para mates, colores" image="/tipos_mate.jpg" highlightedWord='colores'/>
        <TiposDeMate />
        <TiposYerba />
        <ParalaxSeparator title="El consumo" image="/mate_consumo.jpg" highlightedWord='consumo'/>
        <MasTomanMate />
        <MapaMate />
        <ParalaxSeparator title="El arte de armar un buen mate" image="/mate_consumo.jpg" highlightedWord='armar'/>
        <ComoPrepararMate />
    </>
)
}

export default MatePage