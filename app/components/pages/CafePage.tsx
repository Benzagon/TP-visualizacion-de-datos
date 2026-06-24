import React from 'react'
import CafeSection from '../CafeSection'
import { MasTomanCafe } from '../MasToman'
import { ProduccionCafe } from '../Produccion'
import ParalaxSeparator from '../ParalaxSeparator'
import TiposDeCafetera from '../TiposDeCafetera'
import ComoPrepararCafe from '../ComoPrepararCafe'

const CafePage = () => {
  return (
    <>
        <CafeSection></CafeSection>
        <MasTomanCafe />
        <ParalaxSeparator title="Brasil, la tierra del cafetero" image="/cafe_prod.jpg" highlightedWord='cafetero' />
        <ProduccionCafe />
        <ParalaxSeparator title="Los tipos de cafetera" image="/tipos_cafetera.jpg" />
        <TiposDeCafetera />
        <ParalaxSeparator title="El arte del cafe filtrado" image="/cafe_consumo.jpg" highlightedWord='filtrado' />
        <ComoPrepararCafe />
        <ParalaxSeparator title="El consumo" image="/cafe_consumo.jpg" />
    </>
  )
}

export default CafePage
