import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './components/App';
import {TITLE_TEXT} from "./components/SoccerTeamsTable";

// Very basic test
test('fetch test', () => {
    render(<App/>);
    const errorElement = screen.getByText(TITLE_TEXT)
    expect(errorElement).toBeInTheDocument();
});