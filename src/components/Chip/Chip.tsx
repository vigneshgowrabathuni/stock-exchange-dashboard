import { ChipProps } from '../../types';
import './Chip.scss';

const Chip = ({ stockName, handleClick }: ChipProps) => {
  return (
    <div
      className="chip"
      key={stockName}
      onClick={() => handleClick(stockName)}
    >
      {stockName} <span className="close">X</span>
    </div>
  );
};

export default Chip;
