Ext.define('ArgusApp.view.Welcome', {
    extend: 'Ext.Container',
    xtype: "welcome",
    requires: [
        'Ext.carousel.Carousel'
    ],
    config: {
      styleHtmlContent: true,
      scrollable: true,

      items: [
          {
              docked: 'top',
              xtype: 'titlebar',
              title: "Welcome to Argus Self Storage"
          },
          {
              html: [
                  '<img style="display:block; margin:auto;" src="resources/images/logo.png">',
                  '<h2 style="text-align:center; line-height:100%;">America\'s Premier Self Storage Brokerage Firm.</h2>',
                  '<h3>Our newest listings:</h3>'
                  ].join("")
          },
          {
              xtype: 'rotatingcarousel',
              styleHtmlContent: true,
              delay: 5000,
              height: 300,
              style: 'background: #fff;padding: 10px;border: 1px solid #aaa;',
              masked: {
                  xtype: 'loadmask',
                  message: 'Loading newest properties'
              },
              listeners: {
                initialize: function() {
                  var store = Ext.getStore("Properties");
                  store.load(function() {
                    var items = [];
                    store.clearFilter(true);
                    store.filter('New', '-1' );
                    console.log("store", store);
                    // reach inside store to get filtered items instead of reloding it
                    Ext.each(store.data.items, function(property) {
                        items.push({
                          xtype: 'panel',
                          data: property.data,
                          tpl: 'Property: {State}, {City},{Price}'
                        });
                    });
                    store.clearFilter(true);
                    this.setItems(items);
                    this.setActiveItem(0);
                    this.unmask();
                }, this);

                }
            }
          }
      ]
    }
});


Ext.define('Ext.carousel.RotatingCarousel', {
    extend: 'Ext.carousel.Carousel',
    alternateClassName: 'Ext.RotatingCarousel',
    xtype: 'rotatingcarousel',
    config: {
        delay: 3000,
        start: true,
        listeners: {
            tap: {
                fn: function() {
                    this.pause();
                },
                element: 'element'
            },
            swipe: {
                fn: function() {
                    this.start();
                },
                element: 'innerElement'
            }
        }
    },
    initialize: function() {
        if(this.config.start) {
            this.start();
        }
    },
    rotate: function() {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        if(this.getActiveIndex() === this.getMaxItemIndex()) {
            // this.setActiveItem(0, 'slide');
            this.animateActiveItem(0, {
                type: 'slide',
                direction: 'left'
            });
        } else {
            this.next();
        }
        this.timeout = Ext.defer(this.rotate, this.config.delay, this);
    },
    start: function(delayStart) {
        this.timeout = Ext.defer(this.rotate, delayStart || this.config.delay, this);
    },
    pause: function(delayStart) {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        if(delayStart) {
            this.start(delayStart);
        }
        return this;
    },
    stop: function(delayStart) {
        this.pause(delayStart);
        this.setActiveItem(0, 'slide');
        return this;
    }
});