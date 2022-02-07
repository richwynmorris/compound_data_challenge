import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { useContext } from 'react'
import { DataContext } from './CompoundData'
function CompoundScatterGraph() {
  let data = useContext(DataContext)
  let scatterData = []
  let highestRings = data.sort((a,b) => b.num_rings - a.num_rings)[0]
                         .num_rings
  
  for (let i = 1; i <= highestRings; i++) {
    let group = {}
    group['id'] = `Rings - ${i}`
    group['data'] = []

    data.filter((compound) => compound.num_rings === i)
        .forEach((compound) => {
          let result = {
            'x': compound.molecular_weight,
            'y': compound.ALogP,
            'formula': compound.molecular_formula,
          }
          group['data'].push(result)
        })
    
    scatterData.push(group)    
  }

  const TableHeader = () => {
    return (
        <div className="flex items-center ml-14 mr-16 pt-16">
          <h1 className="font-head text-black text-center text-3xl">Solubility</h1>
          <span className="w-full"></span>
        </div>
    )
  }

  const MyResponsiveScatterPlot = () => {
    return (
      <div id="responsive-scatter-plot" style={{ height: 500 }}>
        <ResponsiveScatterPlot
          data={scatterData}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 0, max: 'auto' }}
          xFormat=">-.2f"
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          yFormat=">-.2f"
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Molecular Weight',
              legendPosition: 'middle',
              legendOffset: 46
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'ALogP',
              legendPosition: 'middle',
              legendOffset: -60
          }}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 130,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 12,
                  itemsSpacing: 5,
                  itemDirection: 'left-to-right',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
          tooltip={(e) => {
            let data = e.node.data
            return (
                <div
                style={{
                    padding: 12,
                    color: 'black',
                    background: '#f2f2f2',
                    borderRadius: 10,
                }}
            >
                <p><strong>weight:</strong> {data.x}</p>
                <p><strong>AlogP:</strong> {data.y}</p>
                <p><strong>formula:</strong> {data.formula}</p>
            </div>
            )
        }}
        />
      </div>
    )
  }

  return (
    <div>
      {TableHeader()}
      {MyResponsiveScatterPlot()}
    </div>
  )
}

export default CompoundScatterGraph;