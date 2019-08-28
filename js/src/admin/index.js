import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PronounSettingsModal from './components/PronounSettingsModal';

app.initializers.add('shriker/flarum-pronouns', () => {
  app.extensionSettings['shriker-pronouns'] = () => app.modal.show(new PronounSettingsModal());
});
