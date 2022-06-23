import { h } from 'preact';
import style from './style.css';

const HistoryItem = ({ history }) => {
  const { data } = history;
  const getFormattedHeader = () => {
    const keys = Object.keys(data.header);
    let output = '';

    keys.forEach((key) => {
      output += `${key}: ${data.header[key]}\n`
    });

    return output;
  };

  return (
    <div className={style.card}>
      <div className={style.card_body}>
        <pre>
          {`${data.method.toUpperCase()} ${data.path} HTTP/${data.http}\n`}
          {getFormattedHeader()}
        </pre>
      </div>
    </div>
  );
};

export default HistoryItem;
