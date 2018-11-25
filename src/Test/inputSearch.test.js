import InputSearch from '../components/searchView/inputSearch';
import React from 'react';
import { mount, shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function InputSearchComponent(extraProps){
  return (<InputSearch {...extraProps}/>);
}

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
  setTimeout.mockClear();
  clearTimeout.mockClear();
});

/*it('renders without props', () => {
  const component = shallow(InputSearchComponent({}));
  expect(component).toMatchSnapshot();
});
it('renders with props', () => {
  let inputObj = {id: 'is1', listName: 'apts'};
  const component = shallow(InputSearchComponent(inputObj));
  expect(component).toMatchSnapshot();
});*/
describe ('Input Search Component', () => {
  let inputObj = {id: 'is1', listName: 'apts'};
  let onClick, inputSearch;
  beforeEach(() => {
    onClick = jest.fn();
    inputSearch = mount(<InputSearch id='is1' listName='apts' onClick={onClick}/>);
  });
  it('renders with props', () => {
    expect(inputSearch).toMatchSnapshot();
  });
  it('Input Search requires onClick props', () => {
    expect(inputSearch.props().onClick).toBeDefined();
  });
  it('IS render list', () => {
    const input = inputSearch.find('input').first();
    input.simulate('change', {target:{ value:'Nag'}});
    //expect(inputSearch.state.searchedItems.children().length).toBeGreaterThan(0);
    expect(inputSearch.state('isOpen')).toBe(true);
    //expect(onClick).toBeCalledWith('');
  });

});

/*describe ('Input Search Acceptance Test', () => {
  const inputSearchWrapper = mount(InputSearchComponent({}));
  const inputSearchInputWrapper = inputSearchWrapper.find('input');
  it('should show result when value is a partial match', () => {
    expect(inputSearchWrapper.state('isOpen').toBe(false));
    expect(inputSearchWrapper.instance.refs.menu).toBe(undefined);
  });
});*/
