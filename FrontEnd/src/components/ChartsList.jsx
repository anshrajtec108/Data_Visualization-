import React, { useEffect, useState } from 'react'

import LineChart from './ChartS/LineChart'
import { makeGetRequest } from '../services/ApiCalls';
import BarChart from './ChartS/BarChart';
import PieChart from './ChartS/PieChart';

function ChartsList() {
  const [startYearData, setStartYearData] = useState(null)
  const [endYearData, setEndYearData] = useState(null)
  const [sectorAndRelevanceData, setSectorAndRelevanceData] = useState(null)
  const [sectorAndLikelihoodData, setSectorAndLikelihoodData] = useState(null)
  const [sectorAndIntensityData, setSectorAndIntensityData] = useState(null)
  const [pieCountry, setPieCountry] = useState(null)
  const [pieRegion, setPieRegion] = useState(null)

  const [feachOver, setFeachOver] = useState(false)


  const feachAllCharts = async () => {
    const StartYear = await makeGetRequest('/charts/start_year', {}, {});
    setStartYearData(StartYear.data)

    const EndYear = await makeGetRequest('/charts/end_year', {}, {});
    setEndYearData(EndYear.data)

    const sectorAndRelevance = await makeGetRequest('/charts/SectorAndRelevance', {}, {});
    setSectorAndRelevanceData(sectorAndRelevance.data)

    const sectorAndLikelihood = await makeGetRequest('/charts/SectorAndLikelihood', {}, {});
    setSectorAndLikelihoodData(sectorAndLikelihood.data)

    const sectorAndIntensity = await makeGetRequest('/charts/SectorAndIntensity', {}, {});
    setSectorAndIntensityData(sectorAndIntensity.data)

    const pieCountry = await makeGetRequest('/charts/PieCountry', {}, {});
    setPieCountry(pieCountry.data)

    const pieRegion = await makeGetRequest('/charts/PieRegion', {}, {});
    setPieRegion(pieRegion.data)

    setFeachOver(true)
  }
  useEffect(() => {
    feachAllCharts()
  }, [])
  return (
    <div style={{ marginLeft: '6.1vw' }}>
      {feachOver ? (
        <div style={{ display: 'flex', flexDirection: 'column', overflowY:'scroll'}}>
          <div style={{ display: 'flex', flex: '1', overflowX: 'scroll', height: '48vh', width: '100vw', paddingRight: '250px' }}>
            [ <LineChart key={'startYearData'} data={startYearData} name={"StartYear"} heading={'Number of Events started and will start year'} />,
            <LineChart key={'endYearData'} data={endYearData} name={"EndYear"} heading={'Number of Events Ended are Ending year'} />]
          </div>
          <div style={{ display: 'flex', flex: '1', overflowX: 'scroll', height: '48vh', width: '100vw', paddingRight:'250px' }}>

            [
            <BarChart key={'sectorAndRelevanceData[0].totalRelevance'} data={sectorAndRelevanceData} name={"sectorAndRelevanceData"} heading={'sector And RelevanceData'} />
            <BarChart key={'sectorAndLikelihoodData[0].totalRelevance'} data={sectorAndLikelihoodData} name={"sectorAndLikelihoodData"} heading={'sector And LikelihoodData'} />
            <BarChart key={'sectorAndIntensityData[0].totalRelevance'} data={sectorAndIntensityData} name={"sectorAndIntensityData"} heading={'sector And IntensityData'} />

            ]
          </div>
          <div style={{ display: 'flex', flex: '1', overflowX: 'scroll', height: '600px', width: '100vw' }}>
    
            [
              <PieChart key={pieCountry[0]} data={pieCountry} name={"Country"} heading={'Country  '} />,
            <PieChart key={'pieRegion[0]'} data={pieRegion} name={"Region"} heading={'Region  '} />,
            ]
            
          </div>
        </div>) : <div>Loading</div>}

    </div>
  )
}

export default ChartsList
