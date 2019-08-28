import app from 'flarum/app';
import Button from 'flarum/components/Button';
import SettingsPage from 'flarum/components/SettingsPage';
import { extend } from 'flarum/extend';
import ChangePronounsModal from './ChangePronounsModal';

export default function () {
  extend(SettingsPage.prototype, 'accountItems', function (items) {
    items.add('changePronouns',
      Button.component({
        children: app.translator.trans('shriker-pronouns.forum.change_pronouns_button'),
        className: 'Button Button-pronouns',
        icon: 'fas fa-chess-queen',
        onclick: () => app.modal.show(new ChangePronounsModal())
      })
    );
  });
}
