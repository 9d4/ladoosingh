import { h } from 'preact';
import { useEffect } from 'preact/hooks';
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

  let itemID = itemID = data.info.received;
  useEffect(() => {

    setTimeout(() => {
      const el = document.getElementById(itemID);
      if (el !== undefined) el.setAttribute('class', `${style.card} ${style.noticed}`)
    }, 450);
  }, []);

  return (
    <div className={`${style.card}`} id={`${itemID}`}>
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
