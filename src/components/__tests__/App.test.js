import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import App from '../../App'
const setUp = () => render(<App/>)
afterEach(() => {
  cleanup()
})

describe("Compound Landing Page", () => {
  test("data is rendered in the table", () => {
    setUp()
    let firstCell = document.getElementById('cell-1-0').children[0].innerHTML
    expect(firstCell).toEqual("C25H21N5O2")
  })

  test("data table contains all 100 compounds", () => {
    setUp()
    const tableNav = document.getElementsByTagName('nav')[0].childNodes[2]
    expect(tableNav.textContent).toContain('100')
  })
  
  test("data is filtered correctly by search input in the table", () => {
    setUp()
    let search = document.getElementById('search')
    fireEvent.change(search,{ target: {value: 'cccccc'}})
    let firstCell = screen.getByRole('table').childNodes[1].firstChild.id
    expect(firstCell).toEqual('row-39')
  })
  
  test("data is sorted by highest weight when table column clicked", () => {
    setUp()
    const sortableButton = document.querySelector('[data-sort-id="2"]')
    fireEvent.click(sortableButton)
    fireEvent.click(sortableButton)
    const cell = screen.getByRole('table').childNodes[1].childNodes[0].childNodes[1]
    expect(cell.textContent).toEqual('807.0353')
  })

  test("data is sorted by highest number of rings when table column clicked", () => {
    setUp()
    const sortableButton = document.querySelector('[data-sort-id="4"]')
    fireEvent.click(sortableButton)
    fireEvent.click(sortableButton)
    const cell = screen.getByRole('table').childNodes[1].childNodes[0].childNodes[0]
    expect(cell.textContent).toEqual('C25H21N5O2')
  })

  test("scatter graph is rendered on the the landing page", () => {
    setUp() 
    const scatterGraph = document.getElementById('responsive-scatter-plot')
    expect(scatterGraph).toBeInTheDocument()
  })  
  
  test("table data component is rendered on the the landing page", () => {
    setUp() 
    const table = document.getElementById('table-data-component')
    expect(table).toBeInTheDocument()
  })

  test("table click takes user to the correct assay results page", () => {
    setUp()
    const cell = document.getElementById('cell-1-0')
    const text = document.getElementById('cell-1-0').children[0].innerHTML
    fireEvent.click(cell)
    let assayTitle = screen.getByText('Assay Results:')
    let compoundTitle = screen.getByRole('compound-title')
    expect(assayTitle).toBeInTheDocument()
    expect(compoundTitle).toHaveTextContent(text) 
  })

})

describe("Assay Results:", () => {
  test("compound details div and assay results div are rendered", () => {
    setUp()
    let assayRole = screen.getByRole('assay-results')
    let compoundRole = screen.getByRole('compound-details')
    expect(assayRole).toBeInTheDocument()
    expect(compoundRole).toBeInTheDocument()
  })

  test("details for compound are correct", () => {
    setUp()
    let compoundRole = screen.getByRole('compound-details')
    expect(compoundRole).toHaveTextContent('Molecular Forumla: C25H21N5O2')
    expect(compoundRole).toHaveTextContent('Smiles: Cc1nnc2[C@H](NC(=O)OCc3ccccc3)N=C(c4ccccc4)c5ccccc5n12')
    expect(compoundRole).toHaveTextContent('Molecular Weight: 423.46654')
    expect(compoundRole).toHaveTextContent('ALogP: 4.686')
    expect(compoundRole).toHaveTextContent('Number of Rings: 5')
  })

  test("image is rendered correctly", () => {
    setUp()
    let image = screen.getByRole('compound-image')
    expect(image).toBeInTheDocument()
  })

  test("return button takes user back to homepage", () => {
    setUp()
    let button = screen.getByText('Return to Compounds')
    fireEvent.click(button)
    let scatterplot = document.getElementById('responsive-scatter-plot')
    expect(scatterplot).toBeInTheDocument()
  })

  test("click logo returns user to home page", () => {
    setUp()
    const cell = document.getElementById('cell-1-0')
    fireEvent.click(cell)
    let logo = document.getElementById('app-header-logo')
    fireEvent.click(logo)
    let scatterplot = document.getElementById('responsive-scatter-plot')
    expect(scatterplot).toBeInTheDocument()
  })
})