interface OutputProps {
  title: string;
  testIdValue: string;
  value: number | string;
}

const Output = ({title, testIdValue, value}: OutputProps) => {
  return (
    <div className=' flex-center-between bg-primary-shade py-7 px-5 rounded-lg opacity-90 '>
      <h2>{title}</h2>
      <span data-testid={testIdValue} className=' text-lg sm:text-xl text-primary-light font-bold'>
        {value} €
      </span>
    </div>
  );
};

export default Output;
