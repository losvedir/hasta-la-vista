hasta-la-vista
==============

Hasta La Vista is a **HA**skell **STA**tsd viewer. `statsd` is a lovely little
stats daemon by the folks at etsy that listens for UDP packets sent by your app
or what have you.

There are a number of backends available to store and view statsd data, the de
facto standard being graphite. `hasta-la-vista` is intended to be an all-in-one
solution for processing, storing, and visualizing statsd data.

`statsd` flushes aggregated packet data to its backends (`hasta-la-vista` in this
case) at a configurable rate. `hasta-la-vista` stores this data in a redis
backend and, if someone is connected to its frontent, updates its D3 graphs
over websockets.
