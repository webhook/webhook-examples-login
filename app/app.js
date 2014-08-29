import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'webhook-examples-login', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'webhook-examples-login');

Ember.Route.reopen({
  beforeModel: function (transition) {

    // These routes you do not need to be logged in to access.
    var openRoutes = ['login'];

    // Not logged in and attempting to access protected route, redirect to login.
    if (openRoutes.indexOf(transition.targetName) === -1 && Ember.isEmpty(this.get('session.user'))) {
      Ember.Logger.warn('Attempting to access protected route when not logged in. Aborting.');

      // Save the transition to try again status changes.
      this.set('session.transition', transition);

      // Redirect to login.
      this.transitionTo('login');
    }
  }
});

export default App;
