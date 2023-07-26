import { IPriceType, PriceTypesProps } from '../../types';
import './PriceTypes.scss';

const PriceTypes = ({ priceType, setPriceType }: PriceTypesProps) => {
  const priceTypes = [
    { name: 'Open', value: 'o' },
    { name: 'High', value: 'h' },
    { name: 'Low', value: 'l' },
    { name: 'Close', value: 'c' },
  ];
  return (
    <div className="card mt-2">
      <div className="card-body price-types-main-wrapper">
        <h6 className="text-center m-2">Price Type</h6>
        <div className="wrapper">
          {priceTypes.map((price: IPriceType) => {
            const { name, value } = price;
            const isActive = value === priceType;
            return (
              <button
                key={value}
                type="button"
                className={`btn btn-sm btn-dark mx-2 ${
                  isActive ? 'active' : ''
                }`}
                onClick={() => setPriceType(value)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PriceTypes;
