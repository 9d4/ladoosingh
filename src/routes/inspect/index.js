import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Nes from "@hapi/nes/lib/client";
import style from './style.css';
import { getLinkHistory } from '../../api/api-client';
import { host } from '../../api/paths';
import copy from 'copy-to-clipboard';
import HistoryList from '../../components/HistoryList';

const Inspect = ({ linkID }) => {
  useEffect(() => {
    document.body.classList.add('staticbg');
  }, []);

  const [histories, setHistories] = useState([]);
  const [gotHistories, setGotHistories] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (gotHistories) {
      return;
    }
    getLinkHistory(linkID)
      .then((_histories) => setHistories(_histories))
      .then(() => setGotHistories(true))
      .catch((err) => {
        setErrorMsg(err?.message ?? 'Unknown error. Try refreshing the page!');
      });
  });

  useEffect(async () => {
    const [scheme, url] = host.split('://');
    let wsScheme = scheme === 'http' ? 'ws' : 'wss';

    let wsClient = new Nes.Client(`${wsScheme}://${url}`);

    wsClient.subscribe(`/ws/${linkID}`, (msg) => {
      setHistories((prev) => [{data: msg}, ...prev]);
    });

    await wsClient.connect();
  }, []);

  const linkHook = `${host}/l/${linkID}`;

  const copyLink = () => {
    copy(linkHook);
  };

  return (
    <div class={style.container}>
      {errorMsg === '' ? (
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
      ) : (
        <p>Error: {errorMsg}</p>
      )}

      {gotHistories ? (
        <HistoryList histories={histories} />
      ) : errorMsg === '' ? (
        <p>Loading histories...</p>
      ) : null}
    </div>
  );
};

export default Inspect;
