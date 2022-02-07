import DataTable from "react-data-table-component"
import { useContext, useState } from "react";
import { DataContext } from "./CompoundData";
import { useNavigate } from "react-router-dom"

const columns = [
  {
    name: 'Molecular Formula',
    selector: row => row.molecular_formula,
    sortable: true,
  },
  {
    name: 'Molecular Weight',
    selector: row => row.molecular_weight,
    sortable: true,
  },
  {
    name: 'ALogP',
    selector: row => row.ALogP,
    sortable: true,
  },
  {
    name: 'Number of Rings',
    selector: row => row.num_rings,
    sortable: true,
  },
  {
    name: 'Smiles',
    selector: row => row.smiles,
  },
];

const FilterComponent = ({ filterText, onFilter}) => (
	<>
    <input			
      id="search"
			type="text"
			placeholder="Filter By Compound Details"
      aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
      className="flex divide-x divide-gray-200 rounded-md shadow-lg pr-6 p-3 mr-2 font-body text-gray-500 focus:outline-none focus:ring focus:ring-amber-500"
    ></input>
	</>
);

const CompoundTable = () => {
  const data = useContext(DataContext)
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');
  const filteredItems = data.filter(
    item => {
      let searchTerm = filterText.toLowerCase()
        return (
          item.smiles.toLowerCase().includes(searchTerm) ||
          String(item.molecular_weight).includes(searchTerm) ||
          item.molecular_formula.toLowerCase().includes(searchTerm) ||
          String(item.ALogP).includes(searchTerm) ||
          String(item.num_rings).includes(searchTerm))
    }
);

function onFilter(e) {
  setFilterText(e.target.value)
}

const TableHeader = () => {
  return (
      <div className="flex items-center ml-14 mr-16 pt-16 mb-16">
        <h1 className="font-head text-black text-center text-3xl">Compounds</h1>
        <span className="w-full"></span>
        <FilterComponent onFilter={onFilter} filterText={filterText} />
      </div>
  )
}

const handleRowClick = (e) => {
  const compoundId = e.compound_id
  navigate(`/compound/${compoundId}`)
}

return (
    <div id="table-data-component">
      {TableHeader()}
      <div className="ml-14 mr-14 cursor-pointer">
      <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          dense
          onRowClicked={handleRowClick}
          className="rounded-lg"
          striped={true}
      />
      </div>
    </div>
  );
}

export default CompoundTable;