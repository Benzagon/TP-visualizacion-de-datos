import React from 'react'
import Title from './Title'
import FlourishChart from './FlourishChart'

const HombresMujeres = () => {
  return (
    <div className="w-full p-12 h-fit bg-dark-background">
          <Title dark>Los hombres toman más <span className='text-coffee-brown'>café</span> que las mujeres</Title>
          <div className="w-full p-12 flex items-start justify-center gap-2 pt-12">
              <FlourishChart
                  dark
                  visualisationId="29146983"
                  type="chart"
                  title="Los hombres toman más café que las mujeres"
                  description="Consumo de café por dia por rango etario"
                  className="w-20"
              />
          </div>
      </div>
  )
}

export default HombresMujeres