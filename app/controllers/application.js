import Ember from 'ember';

export default Ember.Controller.extend({
  userStatusChanged: function () {

    var previousTransition = this.get('session.transition');

    // if you were trying to get somewhere, let's try again
    if (previousTransition) {

      Ember.Logger.log('Retrying route `%@`.'.fmt(previousTransition.targetName));

      if (previousTransition.targetName === this.get('currentPath')) {
        this.send('refreshRoute');
      } else {
        previousTransition.retry();
      }

    }

    else if (this.get('currentPath') === 'login') {
      this.transitionToRoute('index');
    }

    else {
      this.send('refreshRoute');
    }

  }.observes('session.user')
});
