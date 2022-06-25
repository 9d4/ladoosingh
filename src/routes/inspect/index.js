import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import { getLinkHistory } from '../../api/api-client';
import { host } from '../../api/paths';
import copy from 'copy-to-clipboard';
import HistoryList from '../../components/HistoryList';

const Inspect = ({ linkID }) => {
  useEffect(() => {
    document.body.classList.add('staticbg');
  },[]);

  const [histories, setHistories] = useState([]);
  const [gotHistories, setGotHistories] = useState(false);

  useEffect(() => {
    if (gotHistories) {
      return;
    }
    getLinkHistory(linkID)
      .then((_histories) => setHistories(_histories))
      .then(() => setGotHistories(true))
      .catch((err) => console.log(err));
  });

  const linkHook = `${host}/l/${linkID}`;

  const copyLink = () => {
    copy(linkHook);
  };

  return (
    <div class={style.container}>
      <div class={`${style.card} ${style.inspect_header}`}>
        <div class={style.card_body}>
          <div class={style.hook_container}>
            <span>Hook: </span>
            <a href={linkHook} target="_blank" id="linkHook" rel="noreferrer">
              {linkHook}
            </a>
            <button onClick={copyLink}>Copy</button>
          </div>
          <article>
            Make request to this link to inspect the data. The data will be
            showed below.
          </article>
        </div>
      </div>

      {gotHistories ? (
        <HistoryList histories={histories} />
      ) : (
        <p>Loading histories...</p>
      )}
    </div>
  );
};

export default Inspect;
