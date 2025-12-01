// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock requestAnimationFrame and cancelAnimationFrame for all tests
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 16)
}

global.cancelAnimationFrame = (id) => {
  clearTimeout(id)
}
