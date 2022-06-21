import { h } from 'preact';
import style from './style.css';
import { host } from '../../api/paths';
import copy from 'copy-to-clipboard';

const Inspect = ({ linkID }) => {
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
            <a href={linkHook} target="_blank" id="linkHook">
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


    </div>
  );
};

export default Inspect;
