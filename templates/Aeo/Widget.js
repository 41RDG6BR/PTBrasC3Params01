define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./Widget.html",
  "esri/dijit/Search",
  'dojo/Deferred',
  'dgrid/OnDemandList',
  'dgrid/Selection',
  "dojo/store/Memory",
  "esri/layers/FeatureLayer", 
  "dojo/on", 
  "dojo/_base/lang",
  "jimu/Utils",
], function(
  declare,
  _WidgetBase,
  _TemplatedMixin,
  template,
  Search,
  Deferred,
  OnDemandList, 
  Selection, 
  Memory,
  FeatureLayer,
  on,
  lang,
  utils
){
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    // params
    // required
    wabWidget: null,
    serviceUrl: null,
    codFieldInst: null,
    codFieldSeq: null,
    _outFields: [],

    startup: function() {
      this.inherited(arguments)
      this.wabWidget = this.params.wabWidget

      console.log(this.wabWidget, 'from aeo')
      console.log(this.params, 'params')

      var search = new Search({

          enableButtonMode: false, 
  
          showInfoWindowOnSelect: false,
  
          theme: 'arcgisSearch',
  
          sources: []
  
      });

      console.log(this.serviceUrl, 'service')

      this.searchTwo.appendChild(search.domNode);

      var sources = search.get("sources");

      sources.push({
    
        featureLayer: new FeatureLayer(this.serviceUrl),
  
        searchFields: [this.codFieldInst],
  
        displayField: this.codFieldInst,
  
        exactMatch: false,
  
        outFields: ["*"],
  
        maxResults: 6,
  
        maxSuggestions: 6,
  
        enableSuggestions: true,
  
        minCharacters: 1,
  
      });

      sources.push({
    
        featureLayer: new FeatureLayer(this.serviceUrl),
  
        searchFields: [this.codFieldSeq],
  
        displayField: this.codFieldSeq,
  
        exactMatch: false,
  
        outFields: ["*"],
  
        maxResults: 6,
  
        maxSuggestions: 6,
  
        enableSuggestions: true,
  
        minCharacters: 1,
  
      });

      search.set("sources", sources);

    },
    
  })
})