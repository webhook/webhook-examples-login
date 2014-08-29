define("webhook-examples-login/app",["ember","ember/resolver","ember/load-initializers","exports"],function(e,t,o,s){"use strict";var n=e["default"],i=t["default"],r=o["default"];n.MODEL_FACTORY_INJECTIONS=!0;var a=n.Application.extend({modulePrefix:"webhook-examples-login",Resolver:i});r(a,"webhook-examples-login"),n.Route.reopen({beforeModel:function(e){var t=["login"];-1===t.indexOf(e.targetName)&&n.isEmpty(this.get("session.user"))&&(n.Logger.warn("Attempting to access protected route when not logged in. Aborting."),this.set("session.transition",e),this.transitionTo("login"))}}),s["default"]=a}),define("webhook-examples-login/config/environment",["exports"],function(e){"use strict";e["default"]={environment:"production",baseURL:"/webhook-examples-login/",locationType:"hash",EmberENV:{FEATURES:{}},APP:{}}}),define("webhook-examples-login/controllers/application",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Controller.extend({userStatusChanged:function(){var e=this.get("session.transition");e?(o.Logger.log("Retrying route `%@`.".fmt(e.targetName)),e.targetName===this.get("currentPath")?this.send("refreshRoute"):e.retry()):"login"===this.get("currentPath")?this.transitionToRoute("index"):this.send("refreshRoute")}.observes("session.user")})}),define("webhook-examples-login/initializers/login",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]={name:"login",initialize:function(e,t){t.deferReadiness();var s=o.Object.create(),n=new FirebaseSimpleLogin(new Firebase("https://webhook-examples.firebaseio.com/login/"),function(e,n){e?(o.Logger.error(e),s.set("error",e)):n?(o.Logger.log("Logged in as %@".fmt(n.uid)),s.set("user",n)):(o.Logger.log("Not logged in."),s.set("user",null)),o.run(t,t.advanceReadiness)});s.set("auth",n),t.register("login:session:current",s,{instantiate:!1,singleton:!0}),t.inject("route","session","login:session:current"),t.inject("controller","session","login:session:current")}}}),define("webhook-examples-login/router",["ember","exports"],function(e,t){"use strict";var o=e["default"],s=o.Router.extend({location:WebhookExamplesLoginENV.locationType});s.map(function(){this.route("login")}),t["default"]=s}),define("webhook-examples-login/routes/application",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Route.extend({actions:{refreshRoute:function(){this.refresh()}}})}),define("webhook-examples-login/routes/index",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Route.extend({actions:{logout:function(){this.get("session.auth").logout()}}})}),define("webhook-examples-login/routes/login",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Route.extend({actions:{login:function(){this.get("session.auth").login("anonymous")}}})}),define("webhook-examples-login/templates/application",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Handlebars.template(function(e,t,s,n,i){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,o.Handlebars.helpers),i=i||{};var r,a="";return i.buffer.push("<h2>Webhook Examples: Ember/Firebase Authentication</h2>\n\n<p>This is a simple demonstation of how we protect CMS routes with Ember and Firebase at Webhook.</p>\n\n<hr>\n\n"),r=s._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:i}),(r||0===r)&&i.buffer.push(r),i.buffer.push("\n"),a})}),define("webhook-examples-login/templates/index",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Handlebars.template(function(e,t,s,n,i){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,o.Handlebars.helpers),i=i||{};var r,a="",u=this.escapeExpression;return i.buffer.push("<strong>Index Route (Protected)</strong>\n\n<p>User ID: "),r=s._triageMustache.call(t,"session.user.uid",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:i}),(r||0===r)&&i.buffer.push(r),i.buffer.push('</p>\n\n<button type="button" '),i.buffer.push(u(s.action.call(t,"logout",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:i}))),i.buffer.push(">Logout</button>\n"),a})}),define("webhook-examples-login/templates/login",["ember","exports"],function(e,t){"use strict";var o=e["default"];t["default"]=o.Handlebars.template(function(e,t,s,n,i){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,o.Handlebars.helpers),i=i||{};var r="",a=this.escapeExpression;return i.buffer.push('<strong>Login Route (Unprotected)</strong>\n\n<p>This uses Firebase\'s <a href="https://www.firebase.com/docs/web/guide/simple-login/anonymous.html">anonymous authentication</a> for demonstration purposes but works the same with a username/password.</p>\n\n<button type="button" '),i.buffer.push(a(s.action.call(t,"login",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:i}))),i.buffer.push(">Login</button>\n"),r})});