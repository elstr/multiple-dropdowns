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
  workQualification: ['W2',
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

//const filters = [
//  {
//    value: 'select',
//    description: 'Select Option',
//  },
//  {
//    value: 'experience',
//    description: 'Experience',
//    criteria: filterCriteria['strings'],
//    subset: subSets['expRange'],
//  },{
//    value: 'workqualification',
//    description: 'Work Qualification Type',
//    criteria: filterCriteria['strings'],
//    subset: subSets['workQualification'],
//  },{
//    value: 'city',
//    description: 'City',
//    criteria: filterCriteria['strings'],
//  },
//]

const filters = [
  {value: 'select', description: 'Select Option'},
  {value: 'city', description: 'City',  subItems:[{criteria: filterCriteria['string']}]},
  {value: 'age', description: 'Age',  subItems:[{criteria: filterCriteria['string'], subset: subSets['age']}]},
  {value: 'zipRadius', description: 'Zip Code Radius',  subItems:[{criteria: filterCriteria['zipRadius']}]},
  {value: 'experience',description: 'Experience',subItems:[{
      criteria: filterCriteria['string'],
      subset: subSets['positions'],
    },{
      criteria: filterCriteria['numbers'],
      subset: subSets['expRange'],
    }]}
]


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCriteria: false,
      showSubset: false,
      selectedFilter: {}
    }
  }

  onChangeFilter (e) {
    const {value} = e.target
    const selected = filters.find(f => f.value === value)
    console.log(selected)
    console.log(selected.subItems)
    this.setState({showSubItems: true, selectedFilter: selected})
  }

  render () {
    const {showSubItems, selectedFilter} = this.state
    return (
      <div className="App">
        <select onChange={e => this.onChangeFilter(e)}>
          {
            filters.map((f, i) => {
              return <option key={i} value={f.value}>{f.description}</option>
            })
          }
        </select>
        {
          (showSubItems && selectedFilter.subItems) &&
          selectedFilter.subItems.map((item, i) => {
            return (
              <div>
                <select key={i}>
                  {
                    item.criteria.map((criteria, i) => {
                      return <option key={i} value={criteria}>{criteria}</option>
                    })
                  }
                </select>
                {selectedFilter.subItems[0].subset &&
                <select key={`subItem${i}`}>
                  {
                    item.subset.map((subset, i) => {
                      return <option key={i} value={subset}>{subset}</option>
                    })
                  }
                </select>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default App;
