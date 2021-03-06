hasta-la-vista
==============

Hasta La Vista is a **HA**skell **STA**tsd viewer. `statsd` is a lovely little
stats daemon by the folks at etsy that listens for UDP packets sent by your app
or what have you.

`statsd` aggregates these UDP packets and periodically flushes them to any of a number
of backends. `hasta-la-vista` is such a backend. But in contrast to
graphite, the de facto standard statsd backend, which is a combination django +
extjs + cairo rendering webapp (`graphite-web`), plus custom python `whisper`
database engine, and custom `carbon` twisted daemon, `hasta-la-vista` is an
all-in-one haskell binary using common, modern components – redis, websockets, and D3.

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

    hasta-la-vista $ cp statsd-js/hasta-la-vista.js [statsd dir]/backends/

Copy over the `hasta-la-vista` statsd configuration to your stats directory:

    hasta-la-vista $ cp statsd-js/exampleConfig.json [statsd dir]/localConfig.json

Edit the config file if desired. HLV expects host, port, and token. Default is to
aggregate and flush stats once every 5 seconds.

**localConfig.json**

    {
      hlv: { host: "127.0.0.1", port: 80, token: 'knockknockwhosthere' },
      flushInterval: 1,
      backends: [ "./backends/hasta-la-vista" ]
    }

Start statsd:

    statsd $ node stats.js localConfig.js

As of now you will see errors every 5 seconds, because hasta-la-vista is not listening,
although statsd is trying to post.

To verify that statsd is working, try posting to it:

    $ echo "hlv.test:1|c" | nc -w 1 -u 127.0.0.1 8125

You should see it show up in the counters in the running statsd log:

    {   'statsd.bad_lines_seen': 0,
        'statsd.packets_received': 1,
        'hlv.test': 1 },


Installation for Use
--------------------

I believe this will be compilable, so we can just deploy an executable....?
