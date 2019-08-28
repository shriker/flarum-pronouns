import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class ChangePronounsModal extends Modal {

  init() {
    super.init();
    this.success = false;
    this.pronouns = m.prop(app.session.user.pronouns());
  }

  className() {
    return 'ChangePronounsModal Modal--small';
  }

  title() {
    return app.translator.trans('shriker-pronouns.forum.change_pronouns_title');
  }

  content() {
    if (this.success) {
      return (
        <div className="Modal-body">
          <div className="Form Form--centered">
            <p className="helpText">{app.translator.trans('shriker-pronouns.forum.submit_success_text')}</p>
            <div className="Form-group">
              <Button className="Button Button--primary Button--block" onclick={this.hide.bind(this)}>
                {app.translator.trans('shriker-pronouns.forum.dismiss_button')}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="Modal-body">
         <div className="Form">
          <div className="Form-group">
            <label>{ app.translator.trans('shriker-pronouns.forum.my_pronouns_are_label') }</label>
            <input name="pronouns" className="FormControl"
              placeholder={app.session.user.pronouns() ? app.session.user.pronouns() : app.translator.trans('shriker-pronouns.forum.my_pronouns_are_placeholder')}
              bidi={this.pronouns}
              disabled={this.loading}/>
              <p class="helpText">{ app.translator.trans('shriker-pronouns.forum.my_pronouns_are_help_text', {
                a: <a href="https://www.mypronouns.org/what-and-why" target="_blank"/>
              }) }</p>
          </div>
          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
              children: app.translator.trans('shriker-pronouns.forum.submit_button')
            })}
          </div>
         </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.pronouns() === app.session.user.pronouns()) {
      this.hide();
      return;
    }

    this.loading = true;

    app.session.user.save({
      pronouns: this.pronouns()
    }, {
      errorHandler: this.onerror.bind(this),
    }).then(() => this.success = true)
    .catch(() => {})
    .then(this.loaded.bind(this));

  }

  onerror(error) {
    super.onerror(error);
  }

}
