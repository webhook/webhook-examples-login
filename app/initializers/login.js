import Ember from 'ember';

export default {
  name: 'login',

  initialize: function (container, application) {

    application.deferReadiness();

    var session = Ember.Object.create();

    var auth = new FirebaseSimpleLogin(new Firebase('https://webhook-examples.firebaseio.com/login/'), function (error, user) {

      if (error) {
        Ember.Logger.error(error);
        session.set('error', error);
      } else if (user) {
        Ember.Logger.log('Logged in as %@'.fmt(user.uid));
        session.set('user', user);
      } else {
        Ember.Logger.log('Not logged in.');
        session.set('user', null);
      }

      Ember.run(application, application.advanceReadiness);

    });

    // use to access Simple Login methods ie: route.get('session.auth.logout()
    session.set('auth', auth);

    application.register('login:session:current', session, { instantiate: false, singleton: true });

    // Add `session` object to route to check user
    application.inject('route', 'session', 'login:session:current');

    // Add `session` object to controller to visualize in templates
    application.inject('controller', 'session', 'login:session:current');

  }
};
