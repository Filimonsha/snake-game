import {render, screen} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import {App, LocationDisplay} from './AppTest'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

test('full app rendering/navigating', async () => {
    render(<App />, {wrapper: BrowserRouter})
    // verify page content for default route
    expect(screen.getByText(/you are home/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
    const badRoute = '/some/bad/route'
    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[badRoute]}>
        <App />
        </MemoryRouter>,
    )
    // verify navigation to "no match" route
    expect(screen.getByText(/no match/i)).toBeInTheDocument()
})

test('rendering a component that uses useLocation', () => {
    const route = '/some-route'

    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[route]}>
        <LocationDisplay />
        </MemoryRouter>,
    )

    // verify location display is rendered
    expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})