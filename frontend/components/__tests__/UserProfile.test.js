import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserProfile, { getFullName } from '../UserProfile'

// Unit tests for the helper function
// this is isolated tests using Jest
describe('unit tests for getFullName', () => {
  it('should return the full name when provided both first and last names', () => {
    expect(getFullName('John', 'Doe')).toBe('John Doe')
  })
  it('should return only the last name when the first name is missing', () => {
    expect(getFullName('', 'Doe')).toBe('Doe')
  })
  it('should return only the first name when the last name is missing', () => {
    expect(getFullName('John')).toBe('John')
  })
  it('should return "Anonymous" when both names are missing', () => {
    expect(getFullName('', '')).toBe('Anonymous')
  })
})

// React Testing Library tests for the UserProfile component
describe('RTL tests for UserProfile', () => {
  it('should render user profile correctly', () => {
    render(<UserProfile
      fname='John'
      lname='Doe'
      email='johndoe@example.com'
      location='New York'
    />)
    screen.debug()
    // Select by visible text
    expect(screen.queryByText('John Doe')).toBeVisible()
    expect(screen.queryByText('johndoe@example.com')).toBeVisible()
    expect(screen.queryByText('Location:')).toBeVisible()
    expect(screen.queryByText('New York')).toBeVisible()

    // screen.getByText('John Doe')
    // this test if this text is anywhere in the DOM it doesn't have to be visible. This makes it an easier and quicker test but if you need the text to be visible specifically then you should stick with the above stricter statement
    // this test also does not require the screen.debug() to run the test

    // Select by role
    expect(screen.queryByRole('button')).toBeInTheDocument()
    expect(screen.queryByRole('foo')).not.toBeInTheDocument()
    // if you run this same test as 
    // screen.getByRole('foo')
    // it will not allow you to test if it is not in the document at all. it would look if the data is in the DOM and if not simply fail the test. Thus, to test if something is NOT in the document you must use the queryByRole()).not funcitonality

    // Select by alt text -- this is important for screen readers!!
    expect(screen.queryByAltText('Profile picture')).toBeInTheDocument()

    // Select by data-testid
    expect(screen.queryByTestId('location')).toHaveTextContent('New York')
    // why use the test id instead of targeting the class or id? if the developer decides to alter the class or id as they update it then it would no longer be compatible with this test thus creating regression in the testing
    // this is targeting the specific data within that id. you have to declare the id and then the content you expect to find there

    // Select by value
    expect(screen.queryByDisplayValue('Search...')).toBeInTheDocument()
    // 
  })
})
