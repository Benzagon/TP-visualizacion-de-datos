import React from 'react'
import Title from './Title'
import FlourishChart from './FlourishChart'
const Produccion = () => {
  return (
    <div className="w-full p-12 h-fit bg-dark-background">
        <Title>La era del <span className='text-yerba-green'>mate.</span></Title>
        <div className="w-full p-12 flex items-start justify-center gap-2 pt-12">
            <FlourishChart
                dark
                visualisationId="29147963"
                type="chart"
                title="1999, algo de mucho mate..."
                description="Producción argentina de yerba mate a través del tiempo"
                className="w-20"
            />
        </div>
    </div>
  )
}

export default Produccion