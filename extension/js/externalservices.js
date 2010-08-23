/* Check CoNetServ object */
if(!Conetserv) var Conetserv = {};

/* LocalServices object */
Conetserv.ExternalServices = {
   isRunning : 0,

   Ping : {
      next: 1,
      max: 3,  // number of fields to draw services to

      console: false
   },

   Ping6 : {
      next: 1,
      max: 3,  // number of fields to draw services to

      console: false
   },

   Tracert : {
      next: 1,
      max: 2,  // number of fields to draw services to

      console: false
   },

   Tracert6 : {
      next: 1,
      max: 2,  // number of fields to draw services to

      console: false
   },

   initialize : function () {
      this.Ping.console = [];
      this.Ping.console[1] = new Conetserv.Console("external-ping-console-1");
      this.Ping.console[2] = new Conetserv.Console("external-ping-console-2");
      this.Ping.console[3] = new Conetserv.Console("external-ping-console-3");

      this.Ping6.console = [];
      this.Ping6.console[1] = new Conetserv.Console("external-ping6-console-1");
      this.Ping6.console[2] = new Conetserv.Console("external-ping6-console-2");
      this.Ping6.console[3] = new Conetserv.Console("external-ping6-console-3");

      this.Tracert.console = [];
      this.Tracert.console[1] = new Conetserv.Console("external-tracert-console-1");
      this.Tracert.console[2] = new Conetserv.Console("external-tracert-console-2");

      this.Tracert6.console = [];
      this.Tracert6.console[1] = new Conetserv.Console("external-tracert6-console-1");
      this.Tracert6.console[2] = new Conetserv.Console("external-tracert6-console-2");
   },

   start : function ()  {
      /*
       * Check if start is possible
       */
      if(this.isRunning)
         return false;

      /*
       * Set URL value or show red bar around url field
       */
      if(!Conetserv.Url.set(document.getElementById("external-url").value)) {
         document.getElementById("external-url").style.color="red";
         document.getElementById("external-url").focus();
         return false;
      }

      this.isRunning = 1;

      Conetserv.Ui.addIcons(".external", ".ping", '', '', 'ui-icon-clock');
      Conetserv.Ui.addIcons(".external", ".ping6", '', '', 'ui-icon-clock');
      Conetserv.Ui.addIcons(".external", ".tracert", '', '', 'ui-icon-clock');
      Conetserv.Ui.addIcons(".external", ".tracert6", '', '', 'ui-icon-clock');

      /* Start external info services */
      Conetserv.LookingGlass.start(
         /* started */
         function() {
         },
         /* service results */
         function(service, result) {
            switch(service.service) {
               case 'PING':
                  if(Conetserv.ExternalServices.Ping.next > Conetserv.ExternalServices.Ping.max) {
                     return;
                  }
                  if(Conetserv.ExternalServices.Ping.next == Conetserv.ExternalServices.Ping.max) {
                     Conetserv.Ui.removeIcons(".external", ".ping");
                  }
                  $("#external-ping-service-" + Conetserv.ExternalServices.Ping.next).html(service.name);
                  Conetserv.ExternalServices.Ping.console[Conetserv.ExternalServices.Ping.next++].add(result + '\n');
                  break;
                case 'PING6':
                  if(Conetserv.ExternalServices.Ping6.next > Conetserv.ExternalServices.Ping6.max) {
                     return;
                  }
                  if(Conetserv.ExternalServices.Ping6.next == Conetserv.ExternalServices.Ping6.max) {
                     Conetserv.Ui.removeIcons(".external", ".ping6");
                  }
                  $("#external-ping6-service-" + Conetserv.ExternalServices.Ping6.next).html(service.name);
                  Conetserv.ExternalServices.Ping6.console[Conetserv.ExternalServices.Ping6.next++].add(result + '\n');
                  break;
               case 'TRACE':
                  if(Conetserv.ExternalServices.Tracert.next > Conetserv.ExternalServices.Tracert.max) {
                     return;
                  }
                  if(Conetserv.ExternalServices.Tracert.next == Conetserv.ExternalServices.Tracert.max) {
                     Conetserv.Ui.removeIcons(".external", ".tracert");
                  }
                  $("#external-tracert-service-" + Conetserv.ExternalServices.Tracert.next).html(service.name);
                  Conetserv.ExternalServices.Tracert.console[Conetserv.ExternalServices.Tracert.next++].add(result + '\n');
                  break;
               case 'TRACE6':
                  if(Conetserv.ExternalServices.Tracert6.next > Conetserv.ExternalServices.Tracert6.max) {
                     return;
                  }
                  if(Conetserv.ExternalServices.Tracert6.next == Conetserv.ExternalServices.Tracert6.max) {
                     Conetserv.Ui.removeIcons(".external", ".tracert6");
                  }
                  $("#external-tracert6-service-" + Conetserv.ExternalServices.Tracert6.next).html(service.name);
                  Conetserv.ExternalServices.Tracert6.console[Conetserv.ExternalServices.Tracert6.next++].add(result + '\n');
                  break;
               default:
                  break;
            }
         },
         /* stopped */
         function() {
            this.isRunning = 0;
         }
      )
      return true;
   }
}
