import AppFunctional from "./AppFunctional"
import React from "react";
import { render, screen } from '@testing-library/react';
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('Component renders correctly', () => {
  render (<AppFunctional />)
})

