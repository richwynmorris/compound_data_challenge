import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { DataContext } from "./CompoundData";
import CompoundDetails from "./CompoundDetails";
import AssayChart from "./AssayChart"

function IndividualCompound() {
  const navigate = useNavigate()
  const data = useContext(DataContext)
  const params = useParams();
  const compound = data.find(element => element.compound_id === Number(params.id));
  const assayData = compound.assay_results.map(obj => {
    obj.id = obj.result_id
    return obj
  })

  const handleReturnButtonClick = () => {
    navigate('/')
  }

  return(
    <div className="pl-14 pr-14" >
      <div className="grid grid-cols-2 justify-center">
        <h1 className="p-5 text-2xl" role="compound-title"><strong>Compound: </strong>{compound.molecular_formula}</h1>
        <h1 className="p-5 text-2xl"><strong>Assay Results:</strong></h1>
        <CompoundDetails compound={compound} />
        <AssayChart data={assayData} />
      </div>
      <button onClick={() => handleReturnButtonClick()}
              className="mt-10 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded">
              Return to Compounds
      </button>
    </div>
  )
}

export default IndividualCompound;