import React, { Component } from 'react';
import './App.css';

const inputField = props => {
  return (
    <input placeholder={props.placeholder} className={props.className} id={props.id} key={props.id} />
  )
}
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
const filters = [
  {value: 'select', description: 'Select Option'},
  {value: 'city', description: 'City', subItems:[
      {
        criteria: filterCriteria['string'],
        fields:[inputField({placeholder:'city', id:'cityInput'})]
      }
    ]},
  {value: 'age', description: 'Age', subItems:[{criteria: filterCriteria['string'], subset: subSets['age']}]},
  {value: 'zipRadius', description: 'Zip Code Radius', subItems:[{criteria: filterCriteria['zipRadius'], fields:[inputField({placeholder:'zipCode', id:'zipcodeInput'})]}]},
  {value: 'experience',description: 'Experience', subItems:[{
      criteria: filterCriteria['string'],
      subset: subSets['positions'],
    },{
      criteria: filterCriteria['numbers'],
      subset: subSets['expRange'],
    }]}
]
const DropDown = props => {
  const {
    id,
    style,
    options,
    onChange
  } = props
  return (
    <select onChange={(e) => onChange(e)} id={id} style={style}>
      { options.map((option, i) => {
        return <option key={i} value={option}>{option}</option>
      })
      }
    </select>
  )
}
const advancedFilterSubItems = (item, i) => {
   return (
       <div key={i} style={{'display':'inline-block'}}>
         { item.criteria && <DropDown id={`criteria${i}`} style={{'margin':'0 10px'}} options={item.criteria} /> }
         { item.subset && <DropDown id={`subItem${i}`} options={item.subset} /> }
         { item.fields && item.fields.map(field => { return field }) }
       </div>
   )
}

class AdvancedFilters extends Component {
  constructor(props){
    super(props)
    this.state = {
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
      ...selectedFilters.slice(parseInt(id)+1),]
    })
  }

  handleAddFilter() {
    const selectOptionFilter = Object.assign({}, filters.find(f => f.value === 'select'))
    this.setState({selectedFilters: [...this.state.selectedFilters, selectOptionFilter]})
  }

  render() {
    const {selectedFilters} = this.state
    return (
      <div>
        {
          selectedFilters.map((item, i) => {
            return (
              <div key={`div${i}`} style={{'margin':'20px 0'}}>
                <select id={i} onChange={e => this.onChangeFilter(e)}>
                {
                  filters.map((f, i) => {
                    return <option key={i} value={f.value}>{f.description}</option>
                  })
                }
                </select>
                { item.subItems &&
                  item.subItems.map((subItem, i) => {
                    return advancedFilterSubItems(subItem, i)
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
export default App;
