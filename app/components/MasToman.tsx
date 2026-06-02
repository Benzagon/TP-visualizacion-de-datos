import React from 'react'
import Title from './Title'
import FlourishChart from './FlourishChart'

const MasToman = () => {
  return (
    <div className="w-full p-12 h-fit bg-background">
        <Title>Las categorías</Title>
        <div>
            <div className="w-full p-12 flex items-start justify-start gap-2 pt-12">
                <div className="w-[60%]">
                <FlourishChart
                    visualisationId="29226983"
                    type="chart"
                    title="Los mates dulces son los mas consumidos"
                    description="Cantidad de personas que prefieren cada tipo de mate"
                    className="w-20 bg-transparent"
                    height={400}
                />
                </div>
            </div>
            <div className="w-full p-12 flex items-start justify-end gap-2 pt-6">
                <div className="w-[60%]">
                <FlourishChart
                    visualisationId="29147797"
                    type="chart"
                    title="Los cafés de filtro manual son los mas consumidos"
                    description="Cantidad de personas por tipo de café que prefieren"
                    className="w-20 bg-transparent text-right "
                    height={700}
                />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MasToman

{/* <div className="w-[50%]">
                <FlourishChart
                    visualisationId="29147797"
                    type="chart"
                    title="Los Cafés de filtro manual son los mas consumidos por la población"
                    description="Cantidad de personas que prefieren cada tipo de café"
                    className="w-20"
                />
                </div> */}