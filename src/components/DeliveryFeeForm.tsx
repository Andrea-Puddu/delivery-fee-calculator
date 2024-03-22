import {useState, Dispatch, SetStateAction} from 'react';

interface Props {
  setFee: Dispatch<SetStateAction<number | string>>;
}

const DeliveryFeeForm: React.FC<Props> = ({setFee}) => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numItems, setNumItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>('');

  // FUNCTION to calculate delivery fee
  const calculateFee = () => {
    let calculatedFee: number = 2; // Base fee

    // Small order surcharge
    if (cartValue < 10) {
      calculatedFee += 10 - cartValue;
    }

    // Delivery distance calculation
    const additionalDistanceFee = Math.ceil((deliveryDistance - 1000) / 500) * 1;
    calculatedFee += additionalDistanceFee > 0 ? additionalDistanceFee : 0;

    // Item surcharge
    if (numItems >= 5) {
      const itemSurcharge = (numItems - 4) * 0.5;
      calculatedFee += itemSurcharge;
    }

    // Bulk fee
    if (numItems > 12) {
      const bulkFee = (numItems - 12) * 1.2;
      calculatedFee += bulkFee;
    }

    // Free delivery if cart value is >= 200
    if (cartValue >= 200) {
      calculatedFee = 0;
    }

    // Friday rush hour multiplier
    const orderDate = new Date(orderTime);
    if (
      orderDate.getDay() === 5 && // Friday
      orderDate.getUTCHours() >= 15 && // After 3 PM UTC
      orderDate.getUTCHours() < 19 // Before 7 PM UTC
    ) {
      calculatedFee *= 1.2;
    }

    // Ensure fee doesn't exceed 15€
    calculatedFee = Math.min(calculatedFee, 15);

    // Result
    setFee(calculatedFee.toFixed(2));
  };

  // EVENT HANDLERS
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cartValue || !deliveryDistance || !numItems || !orderTime) return;
    setFee(0);

    calculateFee();

    // Clear all input fields after calculation
    setCartValue(0);
    setDeliveryDistance(0);
    setNumItems(0);
    setOrderTime('');
  };

  const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCartValue(Math.abs(parseFloat(e.target.value) || 0));

  const handleDeliveryDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDeliveryDistance(Math.abs(parseInt(e.target.value) || 0));

  const handleNumItemsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumItems(Math.abs(parseInt(e.target.value) || 0));

  const handleOrderDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOrderTime(e.target.value);

  // FORM
  return (
    <form onSubmit={handleFormSubmit} className=' flex flex-col gap-6'>
      {/* Cart Value */}
      <div>
        <label htmlFor='cartValue' className='label mb-2'>
          Cart Value
        </label>
        <input
          type='number'
          id='cartValue'
          name='cartValue'
          value={cartValue === 0 ? '' : cartValue}
          onChange={handleCartValueChange}
          data-testid='cartValue'
          placeholder='€ - Euro'
          className=' input'
        />
      </div>

      {/* Delivery Distance */}
      <div>
        <label htmlFor='deliveryDistance' className='label mb-2'>
          Delivery Distance
        </label>
        <input
          type='number'
          id='deliveryDistance'
          name='deliveryDistance'
          value={deliveryDistance === 0 ? '' : deliveryDistance}
          onChange={handleDeliveryDistanceChange}
          data-testid='deliveryDistance'
          placeholder='Distance in meters'
          className=' input'
        />
      </div>

      {/* Amount of Items */}
      <div>
        <label htmlFor='numItems' className='label mb-2'>
          Amount of Items
        </label>
        <input
          type='number'
          id='numItems'
          name='numItems'
          value={numItems === 0 ? '' : numItems}
          onChange={handleNumItemsChange}
          data-testid='numItems'
          placeholder='At least 1 item'
          className=' input'
        />
      </div>

      {/* Order Time */}
      <div>
        <label htmlFor='orderTime' className='label mb-2'>
          Order Time
        </label>
        <input
          type='datetime-local'
          id='orderTime'
          name='orderTime'
          value={orderTime}
          onChange={handleOrderDateChange}
          data-testid='orderTime'
          className=' input-date'
        />
      </div>

      {/* Button */}
      <button type='submit' className=' btn'>
        Calculate Delivery Fee
      </button>
    </form>
  );
};

export default DeliveryFeeForm;
