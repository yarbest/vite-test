// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// below here is the setup for vitest-fetch-mock for mocking fetch requests
import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

const fetchMocker = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to mocked version
fetchMocker.enableMocks()
