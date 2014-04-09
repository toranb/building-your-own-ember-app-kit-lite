App = Ember.Application.create();

App.Router.map(function() {
    this.resource("people", { path: "/" });
});

App.PeopleRoute = Ember.Route.extend({
    model: function() {
        return App.Person.find();
    }
});

App.Person = Ember.Object.extend().reopenClass({
    people: [],
    find: function() {
        var first = App.Person.create({name: 'toran'});
        var last = App.Person.create({name: 'matt'});
        this.people.pushObject(first);
        this.people.pushObject(last);
        return this.people;
    }
});
