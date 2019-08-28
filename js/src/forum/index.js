import app from 'flarum/app';
import UserCard from 'flarum/components/UserCard';
import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import PronounSettingsPage from './components/PronounSettingsPage';

app.initializers.add('shriker/flarum-pronouns', () => {
  User.prototype.pronouns = Model.attribute('pronouns');
  PronounSettingsPage();
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.props.user;
    const pronouns = user.pronouns();
    if (pronouns != 'undefined' && pronouns != null) {
      items.add('pronouns', (
        <span className="UserCard-personalPronouns">
          {app.forum.attribute('pronounsPrefix') ? app.forum.attribute('pronounsPrefix') : ''}{ pronouns }
        </span>
      ), 10);
    }
  });
});
