goog.provide('bitex.ui.AccountActivity');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.AccountActivity = function( opt_domHelper) {
  var grid_columns = [
    {
      'property': 'OrderID',
      'label': 'ID',
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'order-id'); }
    },{
      'property': 'Side',
      'label': 'Side',
      'sortable': false,
      'formatter': function(s){
        switch(s){
          case '1': return 'C';
          case '2': return 'V';
        }
        return '';
      },
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'side'); }
    },{
      'property': 'OrderDate',
      'label': 'Date/Time',
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'order-date'); }
    },{
      'property': 'Price',
      'label': 'Price',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(2);},
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'price'); }
    },{
      'property': 'CumQty',
      'label': 'Qty',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(8);},
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'cum-qty'); }
    },{
      'property': 'AvgPx',
      'label': 'Average Price',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(2);},
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'avg-price'); }
    },{
      'property': 'Volume',
      'label': 'Total',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(2);},
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'vol'); }
    }
  ];

  bitex.ui.DataGrid.call(this,  { 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.AccountActivity, bitex.ui.DataGrid);


/**
 * @type {string}
 */
bitex.ui.AccountActivity.CSS_CLASS = goog.getCssName('account-activity');

/** @inheritDoc */
bitex.ui.AccountActivity.prototype.getCssClass = function() {
  return bitex.ui.AccountActivity.CSS_CLASS;
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.AccountActivity.prototype.getRowClass = function(row_set) {
  var side =  row_set['Side'];

  var class_status;
  switch(side) {
    case '1':
      class_status = goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'buy');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'sell');
      break;
  }

  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.AccountActivity.CSS_CLASS,
    function() {
      return new bitex.ui.AccountActivity();
    });
