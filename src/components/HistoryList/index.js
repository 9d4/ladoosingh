import { h } from 'preact';
import HistoryItem from '../HistoryItem';

const HistoryList = ({ histories }) => {
  return (
    <div>
      {histories.map((history) => (
        <HistoryItem history={history} />
      ))}
    </div>
  );
};

export default HistoryList;
