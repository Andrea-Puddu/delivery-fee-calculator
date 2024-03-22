import '@testing-library/jest-dom';

import {render, fireEvent, screen} from '@testing-library/react';
import DeliveryFeeCalculator from '../components/DeliveryFeeCalculator';

test('Renders the calculator page', () => {
  render(<DeliveryFeeCalculator />);
  expect(true).toBeTruthy();
});

test('calculates delivery fee with valid inputs', () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '15'}});
  fireEvent.change(screen.getByTestId('deliveryDistance'), {target: {value: '1200'}});
  fireEvent.change(screen.getByTestId('numItems'), {target: {value: '7'}});
  fireEvent.change(screen.getByTestId('orderTime'), {target: {value: '2022-01-25T12:00'}});

  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate the displayed fee
  expect(screen.getByTestId('fee')).toHaveTextContent('4.50 €');
});

test('applies small order surcharge', () => {
  render(<DeliveryFeeCalculator />);

  // Set cart value less than 10
  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '8.90'}});
  fireEvent.change(screen.getByTestId('deliveryDistance'), {target: {value: '1200'}});
  fireEvent.change(screen.getByTestId('numItems'), {target: {value: '7'}});
  fireEvent.change(screen.getByTestId('orderTime'), {target: {value: '2022-01-25T12:00'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the small order surcharge is applied
  expect(screen.getByTestId('fee')).toHaveTextContent('5.60 €');
});

test('calculates delivery distance fee correctly', () => {
  render(<DeliveryFeeCalculator />);

  // Set delivery distance greater than 1000 meters
  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '8.90'}});
  fireEvent.change(screen.getByTestId('deliveryDistance'), {target: {value: '1600'}});
  fireEvent.change(screen.getByTestId('numItems'), {target: {value: '7'}});
  fireEvent.change(screen.getByTestId('orderTime'), {target: {value: '2022-01-25T12:00'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the additional distance fee is calculated correctly
  expect(screen.getByTestId('fee')).toHaveTextContent('6.60 €');
});

test('applies bulk fee for more than 12 items', () => {
  render(<DeliveryFeeCalculator />);

  // Set number of items to 15
  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '8.90'}});
  fireEvent.change(screen.getByTestId('deliveryDistance'), {target: {value: '1600'}});
  fireEvent.change(screen.getByTestId('numItems'), {target: {value: '15'}});
  fireEvent.change(screen.getByTestId('orderTime'), {target: {value: '2022-01-25T12:00'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the bulk fee is applied
  expect(screen.getByTestId('fee')).toHaveTextContent('14.20 €');
});

test('applies Friday rush hour multiplier', () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '15'}});
  fireEvent.change(screen.getByTestId('deliveryDistance'), {target: {value: '1200'}});
  fireEvent.change(screen.getByTestId('numItems'), {target: {value: '7'}});
  fireEvent.change(screen.getByTestId('orderTime'), {target: {value: '2024-01-26T17:00'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the fee is multiplied by 1.2 during Friday rush hours
  expect(screen.getByTestId('fee')).toHaveTextContent('5.40 €');
});

test('prevents negative cart value', () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '-10'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the fee is 0 when the cart value is negative
  expect(screen.getByTestId('fee')).toHaveTextContent('0 €');
});

test('handles free delivery for cart value >= 200', () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(screen.getByTestId('cartValue'), {target: {value: '250'}});
  fireEvent.click(screen.getByText(/Calculate Delivery Fee/i));

  // Validate that the fee is 0 when cart value is >= 200
  expect(screen.getByTestId('fee')).toHaveTextContent('0 €');
});
