import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';
import Tooltip from 'flarum/common/components/Tooltip';

export default class LevelBar extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    const user = this.attrs.user;
    const pointsText = app.forum.attribute('ianm-level-ranks.pointsText') || app.translator.trans('ianm-level-ranks.lib.defaults.level');
    
// Ahora otorga menos experiencia con los mensajes y los hilos
    
    let expComments = (user.commentCount() - user.discussionCount()) * 5,
      expDiscussions = user.discussionCount() * 10;
    
// Eleva el requisito para subir de nivel    

    let expTotal = expComments + expDiscussions,
      expLevel = Math.floor(expTotal / 300),
      expPercent = (100 / 300) * (expTotal - expLevel * 300);

    return (
      <Tooltip text={app.translator.trans('ianm-level-ranks.forum.desc.expText', { expTotal })}>
        <div class="PostUser-level">
          <span class="PostUser-text">
            <span class="PostUser-levelText">{pointsText}</span>
            &nbsp;
            <span class="PostUser-levelPoints">{expLevel}</span>
          </span>
          <div class="PostUser-bar PostUser-bar--empty"></div>
          <div class="PostUser-bar" style={'width: ' + expPercent + '%;'}></div>
        </div>
      </Tooltip>
    );
  }
}
