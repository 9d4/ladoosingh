import { h } from 'preact';
import HistoryItem from '../HistoryItem';

const HistoryList = ({ histories }) => {
  return (
    <div>
      {histories.map((history) => (
        <HistoryItem history={history} key={history.data.info.received} />
      ))}
    </div>
  );
};

export default HistoryList;
