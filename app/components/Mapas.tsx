import FlourishChart from './FlourishChart'
import Title from './Title'

function Mapas() {
  return (
    <div className="w-full p-12 h-fit bg-background">
        <Title>El consumo de <span className='text-coffee-brown'>café</span> y <span className='text-yerba-green'>mate</span> en LATAM</Title>
        <div className="w-full p-12 flex items-start justify-center gap-2 pt-12">
            <div className="w-[50%]">
            <FlourishChart
                visualisationId="29147316"
                type="map"
                title="Guyana, consumidores de café"
                description="Consumo de cafe per capita (en kg)"
                className="w-20 text-center"
            />
            </div>
            <div className="w-[50%]">
            <FlourishChart
                visualisationId="29146920"
                type="map"
                title="Argentina, adicta al mate"
                description="Consumo de mate per capita (en kg)"
                className="w-20 text-center"
            />
            </div>
        </div>
    </div>
  )
}

export default Mapas