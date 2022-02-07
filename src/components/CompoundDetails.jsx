
function CompoundDetails({ compound }) {
  return (
    <div className="shadow-2xl rounded-md p-5 mr-10" role="compound-details">
      <img className="mx-auto pb-10" src={`/${compound.image}`} alt={`visual of ${compound.molecular_formula}`} role="compound-image"></img>
        <ul className="list-disc pl-5 overflow-auto">
          <li><strong>Molecular Forumla:  </strong>{compound.molecular_formula}</li>
          <li><strong>Smiles:  </strong>{compound.smiles}</li>
          <li><strong>Molecular Weight:  </strong> {compound.molecular_weight}</li>
          <li><strong>ALogP:  </strong> {compound.ALogP}</li>
          <li><strong>Number of Rings:  </strong> {compound.num_rings}</li>
        </ul>
    </div>
  )
}

export default CompoundDetails;