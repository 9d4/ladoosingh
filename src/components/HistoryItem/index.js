import { h } from 'preact';
import style from './style.css';

const HistoryItem = ({ history }) => {
  const { data } = history;
  const getFormattedHeader = () => {
    const keys = Object.keys(data.header);
    let output = '';

    keys.forEach((key) => {
      output += `${key}: ${data.header[key]}\n`;
    });

    return output;
  };

  const getFormattedBody = () => {
    const body = data.body;

    if (body === undefined) {
      return '';
    }

    if (typeof body == 'object') {
      return JSON.stringify(body);
    }
  };

  return (
    <div className={style.card}>
      <div className={style.card_body}>
        <section>
          <p>Header:</p>
          <pre>
            {`${data.method.toUpperCase()} ${data.path} HTTP/${data.http}\n`}
            {getFormattedHeader()}
          </pre>
        </section>
        <br />
        <section>
          <p>Body:</p>
          <pre>{`${getFormattedBody()}`}</pre>
        </section>
      </div>
    </div>
  );
};

export default HistoryItem;
