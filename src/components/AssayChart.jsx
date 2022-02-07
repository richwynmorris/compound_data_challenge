import { ResponsivePie } from '@nivo/pie'

function AssayChart({data}) {
  return (
    <div className="shadow-2xl rounded-md p-10" style={{height: '100%', width: '100%'}} role="assay-results">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        tooltip={(e) => {
            let data = e.datum.data
            return (
                <div
                style={{
                    padding: 12,
                    color: 'black',
                    background: '#f2f2f2',
                    borderRadius: 10,
                }}
            >
                <p>
                    Result: { data.result + ' '  + data.operator + ' ' + data.value + data.unit }
                </p>
                <p>
                    Target: { data.target}
                </p>
            </div>
            )
        }}
    />
  </div>
  )
}

export default AssayChart;

