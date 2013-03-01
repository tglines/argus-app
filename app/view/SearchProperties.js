Ext.define('ArgusApp.view.SearchProperties', {
    // extend: 'Ext.List',
    extend: 'Ext.navigation.View',
    xtype: "searchProperties",
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
        'Ext.List'
    ],
    config: {
        items: [
            {
                xtype: 'list',
                title: 'Available Properties',
                styleHtmlContent: true,
                store: {xclass:'ArgusApp.store.Properties'},
                itemTpl: ['<div class="listings properties {New} {Contract} {NewPrice}">',
                            '<img src="http://www.argus-selfstorage.com/showdbimage/showproppdf.asp?PropID={PropID}&imagecode=5">',
                            '<div class="info">',
                              '<h3>{State}, {City}</h3>',
                              '{Price} {PriceText}<br>',
                              '{Units} / {RentableSF}',
                            '</div>',
                            '<div style="clear:both"></div>',
                          '</div>'
                        ].join(''),
                onItemDisclosure: true
            }
        ]
    }
});

// Ext.create('ArgusApp.view.SearchProperties');