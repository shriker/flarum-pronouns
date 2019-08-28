import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';

export default class PronounSettingsModal extends SettingsModal {

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('shriker-pronouns.admin.settings.title');
  }

  form() {
    return [
      m('.Form-group', [
        m('label', app.translator.trans('shriker-pronouns.admin.settings.prefix_label')),
        m('input.FormControl', {
          bidi: this.setting('shriker-pronouns.pronouns_prefix'),
        }),
        m('.helpText p', app.translator.trans('shriker-pronouns.admin.settings.prefix_help_text')
        )
      ]),
    ];
  }

}
