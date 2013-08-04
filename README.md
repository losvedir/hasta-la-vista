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

Installation for Development
----------------------------

First download the [Haskell Platform](http://www.haskell.org/platform/). Next:

    $ cabal update
    $ cabal install yesod-platform
    $ cabal install yesod-bin

Now clone in `hasta-la-vista`:

    $ git clone git@github.com:losvedir/hasta-la-vista.git

Run the development server for `hasta-la-vista` as follows:

    $ yesod devel

Install nodejs, if necessary. On a mac, you can use homebrew:

    $ brew install nodejs

Clone statsd into a different directory

    $ git clone git@github.com:etsy/statsd.git

Copy over the `hasta-la-vista` backend to your statsd directory.

    $ cp [hlv dir]/hasta-la-vista.js [statsd dir]/backends/

Configure statsd:

    $ cp exampleConfig.json localConfig.json

Edit the config file to use the hasta-la-vista backend. HLV expects host, port, and token:

**localConfig.json**

    {
      hlv: { host: "127.0.0.1", port: 80, token: 'knockknockwhosthere' },
      backends: [ "./backends/hasta-la-vista" ]
    }

Start statsd:

    $ node stats.js localConfig.js

As of now you will see errors every 10 seconds, because hasta-la-vista is not listening,
although statsd is trying to post.




Installation for Use
--------------------

I believe this will be compilable, so we can just deploy an executable....?
