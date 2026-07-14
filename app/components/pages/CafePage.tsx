import React from 'react'
import CafeSection from '../CafeSection'
import { MasTomanCafe } from '../MasToman'
import { ProduccionCafe } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'
import TiposDeCafetera from '../TiposDeCafetera'
import ComoPrepararCafe from '../ComoPrepararCafe'
import { MapaCafe } from '../Mapas'
import Cafeto from '../Cafeto'
import PlantationCafe from '../PlantationCafe'
import TiposGranos from '../TiposGranos'

const CafePage = () => {
  return (
    <>
        <ParalaxSeparator title="La fuente de la infusión" image="/cafePlantacion.jpg" highlightedWord='fuente' />
        <Cafeto></Cafeto>
        <PlantationCafe />
        <ParalaxSeparator title="Brasil, la tierra del cafetero" image="/cafePlantation.jpg" highlightedWord='cafetero' />
        <ProduccionCafe />
        <ParalaxSeparator title="La anatomía de un café" image="/anatomiaCafe.png" highlightedWord='anatomía'/>
        <CafeSection></CafeSection>
        <ParalaxSeparator title="El grano y sus matices" image="/granos.jpg" />
        <TiposGranos />
        <ParalaxSeparator title="El consumo" image="/cafe_consumo.jpg" highlightedWord='consumo'/>
        <MasTomanCafe />
        <MapaCafe />
        <ParalaxSeparator title="El arte del cafe filtrado" image="/cafe_consumo.jpg" highlightedWord='filtrado' />
        <ComoPrepararCafe />
    </>
  )
}

export default CafePage
