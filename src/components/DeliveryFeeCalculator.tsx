import {useState} from 'react';
import DeliveryFeeForm from './DeliveryFeeForm';
import Output from './Output';

const DeliveryFeeCalculator = () => {
  const [fee, setFee] = useState<number | string>(0);

  return (
    <div className=' app-wrapper'>
      {/* HEADER */}
      <header>
        <h1 className=' text-center'>
          <span>Delivery Fee</span>
          <br />
          <span>Calculator</span>
        </h1>
      </header>

      {/* FORM */}
      <DeliveryFeeForm setFee={setFee} />

      {/* OUTPUT */}
      <Output title='Delivery Fee' testIdValue='fee' value={fee} />
    </div>
  );
};

export default DeliveryFeeCalculator;
