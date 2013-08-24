/*jshint node:true, laxcomma:true */
var http = require('http');

function HastaLaVista(startupTime, config, emitter){
  var self = this;
  this.config = config;
  emitter.on('flush', function(timestamp, metrics) { self.flush(timestamp, metrics); });
}

HastaLaVista.prototype.flush = function(timestamp, metrics) {
  console.log(metrics);
  console.log('Posting stats at', new Date(timestamp * 1000).toString());

  metricsString = JSON.stringify(metrics);

  var postOptions = {
    host: this.config.hlv.host,
    port: this.config.hlv.port,
    path: '/?token=' + this.config.hlv.token,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': metricsString.length
    }
  };

  console.log(postOptions);

  var postRequest = http.request(postOptions, function(res){});
  postRequest.on('error', function(e) {
    console.log(e);
  });

  postRequest.write(metricsString);
  postRequest.end();
};

exports.init = function(startupTime, config, events) {
  hlvConfig = config.hlv;

  if(!hlvConfig.host || !hlvConfig.port || !hlvConfig.token) {
    throw new Error('Must specify HLV host, port, token in statsd config');
  }

  new HastaLaVista(startupTime, config, events);
  return true;
};
