import React, { Component } from 'react';
import './App.css';
const filterCriteria = {
  string: ['Is', 'Is not'],
  numbers: ['Is greater than', 'Is less than'],
  zipRadius: [
    '2 mi.',
    '5 mi.',
    '10 mi.',
    '15 mi.',
    '20 mi.',
    '25 mi.',
    '35 mi.',
    '50 mi.',
    '75 mi.',
    '100 mi.',
    '150 mi.',
    '200 mi.',
  ],
}
const subSets = {
  positions: [
    'Food Service, Hospitality & Hotel (any)',
    'Server',
    'Cook',
    'Dishwasher',
    'Bartender',
    'Cashier',
    'Housekeeping',
    'Beer & Wine Pourer',
    'Porter',
    'Other Food Service, Hospitality & Hotel',
    'Retail, In Store (any)',
    'General Labor',
    'Store Remodel Associate',
    'Inventory Stocker',
    'Greeter',
    'Customer Service',
    'Sales Associate',
    'Changing Room Attendant',
    'Cashier',
    'Other Retail, In Store',
    'Warehouse & Distribution Center (any)',
    'General Labor',
    'Picker / Packer',
    'Material Handler',
    'Inventory Stocker',
    'Other Warehouse & Distribution Center',
    'Experiential Marketing (any)',
    'Conventions, Festivals & Events',
    'Brand Ambassador',
    'Charity Events',
    'Event Registration',
    'Product Demo Sampling',
    'Promo Model',
    'Street Team',
    'Other Experiential Marketing',
    'Customer Service & Call Center (any)',
    'Sales',
    'Customer Service',
    'Administrative Assistant',
    'Lead Generation',
    'Other Customer Service & Call Center',
  ],
  workQualification: [
    'W2',
    '1099',
    'EOR-TargetCW',
    'EOR-EPS',
    'EOR-NextSource',
  ],
  expRange:[
    'no experience',
    '0 to 3 months',
    '3 to 6 months',
    '6 to 12 months',
    '1 to 2 years',
    'more than 2 years',
  ],
  age: ['18 or older', '21 or older'],
}

/* City filter should also render a dropdown with criterias and an input field
City / IS-ISNot / input
City / subItems = [{ criteria (IS-ISNot) , fields (input) , values (selected criteria / input value) }]
City / subItems = [{ filterCriteria['string'] , [{type:'input', placeholder:'city', id:'cityInput'}], {} }}] */
const filters = [
  {value: 'select', description: 'Select Option'},
  {value: 'city', description: 'City', subItems:[
    {
      criteria: filterCriteria['string'],
      fields:[{type:'input', placeholder:'city', id:'cityInput'}],
      values: {selectedCriteria: filterCriteria['string'][0], fieldValue:''},
    }
  ]},
  {value: 'age', description: 'Age', subItems:[
    {
      criteria: filterCriteria['string'],
      subset: subSets['age'],
      values: {selectedCriteria: filterCriteria['string'][0], selectedSubset: subSets['age'][0]},
    }
  ]},
  {value: 'zipRadius', description: 'Zip Code Radius', subItems:[
    {
      criteria: filterCriteria['zipRadius'],
      fields:[({type:'input', placeholder:'zipCode', id:'zipcodeInput'})],
      values: {selectedCriteria: filterCriteria['string'][0], fieldValue:''},
    }
    ]},
  {value: 'experience',description: 'Experience', subItems:[{
    criteria: filterCriteria['string'],
    subset: subSets['positions'],
    values: {selectedCriteria: filterCriteria['string'][0], selectedSubset: subSets['positions'][0]},
  },{
    criteria: filterCriteria['numbers'],
    subset: subSets['expRange'],
    values: {selectedCriteria: filterCriteria['numbers'][0], selectedSubset: subSets['expRange'][0]},
  }]}
]
const DropDown = props => {
  const {
    id,
    style,
    options,
    onChange,
  } = props
  return (
    <select onChange={e => onChange(e)} id={id} style={style}>
      { options.map((option, i) => {
        return <option key={i} value={option}>{option}</option>
      })
      }
    </select>
  )
}

class AdvancedFilters extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters: [...filters],
      selectedFilters: [filters[0]],
    }
  }

  onChangeFilter (e) {
    const {value, id} = e.target
    const {selectedFilters} = this.state
    const selected = Object.assign({}, filters.find(f => f.value === value))
    this.setState({
      selectedFilters: [...selectedFilters.slice(0, id),
        selected,
        ...selectedFilters.slice(parseInt(id, 0)+1),]
    })
  }

  handleAddFilter() {
    const selectOptionFilter = Object.assign({}, filters.find(f => f.value === 'select'))
    this.setState({selectedFilters: [...this.state.selectedFilters, selectOptionFilter]})
  }

  handleInputChange = (e, filterIndex, subItemIndex) => {
    const {value} = e.target
    const {selectedFilters} = this.state

    let filter = Object.assign({}, selectedFilters[filterIndex])
    filter.subItems[subItemIndex].values.fieldValue = value

    this.setState({
      selectedFilters: [...selectedFilters.slice(0, filterIndex),
        filter,
        ...selectedFilters.slice(parseInt(filterIndex, 0)+1),]
    })
  }

  handleCriteriaChange = (e, filterIndex, subItemIndex) => {
    const {options} = e.target
    const {value} = options[options.selectedIndex]
    const {selectedFilters} = this.state

    let filter = Object.assign({}, selectedFilters[filterIndex])
    filter.subItems[subItemIndex].values.selectedCriteria = value

    this.setState({
      selectedFilters: [...selectedFilters.slice(0, filterIndex),
        filter,
        ...selectedFilters.slice(parseInt(filterIndex, 0)+1),]
    })
  }

  handleSubsetChange = (e, filterIndex, subItemIndex) => {
    const {options} = e.target
    const {value} = options[options.selectedIndex]
    const {selectedFilters} = this.state

    let filter = Object.assign({}, selectedFilters[filterIndex])
    filter.subItems[subItemIndex].values.selectedSubset = value

    this.setState({
      selectedFilters: [...selectedFilters.slice(0, filterIndex),
        filter,
        ...selectedFilters.slice(parseInt(filterIndex, 0)+1),]
    })
  }

  render() {
    const {selectedFilters, filters} = this.state
    return (
      <div>
        {
          selectedFilters.map((filter, filterIndex) => {
            return (
              <div key={filterIndex} style={{'margin':'20px 0'}}>
                <select id={filterIndex } onChange={e => this.onChangeFilter(e)}>
                  {
                    filters.map((f, i) => {
                      return <option key={i} value={f.value}>{f.description}</option>
                    })
                  }
                </select>
                { filter.subItems &&
                  filter.subItems.map((subItem, subItemIndex) => {
                    return (
                      <div key={subItemIndex} style={{'display':'inline-block'}}>
                        { subItem.criteria && <DropDown onChange={e => this.handleCriteriaChange(e, filterIndex, subItemIndex)} id={`criteria${subItemIndex}`} style={{'margin':'0 10px'}} options={subItem.criteria} /> }
                        { subItem.subset && <DropDown onChange={e => this.handleSubsetChange(e, filterIndex, subItemIndex)} id={`subItem${subItemIndex}`} options={subItem.subset} /> }
                        { subItem.fields && subItem.fields.map(field => {
                          switch(field.type) {
                            case 'input':
                              return <input onChange={e => this.handleInputChange(e, filterIndex, subItemIndex)} placeholder={field.placeholder} className={field.className} id={field.id} key={field.id} />
                              break;
                            case 'calendar':
                              break;
                            default:
                          }
                        }) }
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
        <div style={{'margin':'20px 0'}}>
          <button onClick={() => this.handleAddFilter()}>+ Add filter</button>
        </div>
        <div style={{'display':'block'}}>
          <button>Search</button>
        </div>
      </div>
    )
  }
}


class App extends Component {
  render () {
    return (
      <div className="App">
        <AdvancedFilters />
      </div>
    )
  }
}
export default App