import React from 'react';
import ReactDOM from 'react-dom';

import Home from '../components//home.jsx'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import TimePicker from 'react-time-picker';


describe('<Home />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Router><Home /></Router>);
    });

    it('should match the snapshot', () => {
        const tree = renderer.create(<Router><Home /></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Router><Home /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render <TimePicker /> component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimePicker />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});