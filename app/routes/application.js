import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    refreshRoute: function () {
      this.refresh();
    }
  }
});
