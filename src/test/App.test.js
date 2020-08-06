import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import { mockData } from "../mock-Data";

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test("get list of events after user selects a city", async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked("Berlin, Germany");
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith("Berlin, Germany");
    AppWrapper.unmount();
  });

  test("change state after get list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents("all");
    await AppWrapper.update();
    expect(await AppWrapper.state("events")).toStrictEqual(mockData);
    AppWrapper.unmount();
  });
  
  test("render correct list of events", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: mockData,
    });
    expect(AppWrapper.find(".event")).toHaveLength(2);
    AppWrapper.unmount();
  });
  test("updateEvents correctly", async () => {
    const AppWrapper = shallow(<App />);
    //AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().updateEvents(undefined, 1);
    await AppWrapper.update();
    expect(await AppWrapper.state("events")).toHaveLength(1)
    AppWrapper.unmount();
  });

  test("updateEvents correctly", async () => {
    const AppWrapper = shallow(<App />);
    //AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().updateEvents("London, UK", 1);
    await AppWrapper.update();
    expect(await AppWrapper.state("events")).toHaveLength(1)
    expect(await AppWrapper.state("events")).toStrictEqual([mockData[1]]);
    AppWrapper.unmount();
  });

});
