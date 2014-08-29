import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function () {
      this.get('session.auth').login('anonymous');
    }
  }
});
