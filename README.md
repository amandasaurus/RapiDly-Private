# RapiDly Private - a privacy preserving version of RapiD/iD for OpenStreetMap mapping with AI

RapiDly Private is an enhanced version of [RapiD editor]() from Facebook, which is based on the [iD editor](https://github.com/openstreetmap/iD).

For information on iD, see their [GitHub repository](https://github.com/openstreetmap/iD), and the [iD README](https://github.com/openstreetmap/iD/blob/master/README.md). You can also view the original version of [RapiD's README](./README_RapiD.md).

## Privacy

Facebook's policy & track record on privacy speaks for itself. The original version of RapiD uses images and data directly from `www.facebook.com`, which harms the user's privacy. This version proxies all Facebook access through `www.technomancy.org`, which should help hide personally identifying information.

# Settings to change

To proxy connections to Facebook, this change is enough:

    diff --git a/data/imagery.json b/data/imagery.json
    index af1a6761f..d5d904f67 100644
    --- a/data/imagery.json
    +++ b/data/imagery.json
    @@ -14069,7 +14069,7 @@
           "id": "Maxar-FB",
           "name": "Facebook's Map With AI - Maxar Imagery",
           "type": "tms",
    -      "template": "https://www.facebook.com/maps/ml_roads?theme=ml_road_vector&collaborator=fbid&token=ASZUVdYpCkd3M6ZrzjXdQzHulqRMnxdlkeBJWEKOeTUoY_Gwm9fuEd2YObLrClgDB_xfavizBsh0oDfTWTF7Zb4C&hash=ASYM8LPNy8k1XoJiI7A&result_type=satellite_raster_tile&materialize=true&x={x}&y={y}&z={zoom}",
    +      "template": "https://www.technomancy.org/openstreetmap/rapidlyprivate/fb/ml_roads?theme=ml_road_vector&collaborator=fbid&token=ASZUVdYpCkd3M6ZrzjXdQzHulqRMnxdlkeBJWEKOeTUoY_Gwm9fuEd2YObLrClgDB_xfavizBsh0oDfTWTF7Zb4C&hash=ASYM8LPNy8k1XoJiI7A&result_type=satellite_raster_tile&materialize=true&x={x}&y={y}&z={zoom}",
           "zoomExtent": [11, 18],
           "terms_url": "https://wiki.openstreetmap.org/wiki/DigitalGlobe",
           "terms_text": "Terms",
    diff --git a/modules/services/fb_ml_roads.js b/modules/services/fb_ml_roads.js
    index 9a4751df0..dfb3260a2 100644
    --- a/modules/services/fb_ml_roads.js
    +++ b/modules/services/fb_ml_roads.js
    @@ -8,7 +8,7 @@ import { osmEntity, osmNode, osmWay } from '../osm';
     import { utilRebind, utilStringQs, utilTiler } from '../util';
    
     // constants
    -var API_URL = 'https://www.facebook.com/maps/ml_roads?conflate_with_osm=true&theme=ml_road_vector&collaborator=fbid&token=ASZUVdYpCkd3M6ZrzjXdQzHulqRMnxdlkeBJWEKOeTUoY_Gwm9fuEd2YObLrClgDB_xfavizBsh0oDfTWTF7Zb4C&hash=ASYM8LPNy8k1XoJiI7A';
    +var API_URL = 'https://www.technomancy.org/openstreetmap/rapidlyprivate/fb/ml_roads?conflate_with_osm=true&theme=ml_road_vector&collaborator=fbid&token=ASZUVdYpCkd3M6ZrzjXdQzHulqRMnxdlkeBJWEKOeTUoY_Gwm9fuEd2YObLrClgDB_xfavizBsh0oDfTWTF7Zb4C&hash=ASYM8LPNy8k1XoJiI7A';
     var TILEZOOM = 16;
     var tiler = utilTiler().zoomExtent([TILEZOOM, TILEZOOM]);
     var dispatch = d3_dispatch('loadedData');


# Current implementation

## Self Host

The version in this repository uses `https://www.technomancy.org/openstreetmap/rapidlyprivate/fb/` which has the following apache settings.

    SSLProxyEngine on
    ProxyVia Block
    <Location "/openstreetmap/rapidlyprivate/fb/">
      Header set Access-Control-Allow-Origin "*"
      Header unset X-FB-Debug
      ProxyAddHeaders Off
      RequestHeader set DNT 1
      RequestHeader set X-Clacks-Overhead "GNU Terry Pratchett"
      RequestHeader unset Accept
      RequestHeader unset Accept-Encoding
      RequestHeader unset Accept-Language
      RequestHeader unset User-Agent
      ProxyPass "https://www.facebook.com/maps/"
    </Location>

Some effort is made to remove personally identifably HTTP request headers. Feedback on how to impove this is much welcomed! Please [file an issue](https://github.com/rory/RapiDly-Private/issues/new)! 🙂

For basic information about the iD editor (architecture, build and installation instructions, etc.), please refer to the [iD github repo](https://github.com/openstreetmap/iD). RapiDly Private shares the same building and installation process as iD and RapiD.

## Participate!

* Read the project [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guide](CONTRIBUTING.md) to learn about how to contribute.
* To help with internationalization, please follow the [general translating page in iD repo](https://github.com/openstreetmap/iD/blob/master/CONTRIBUTING.md#translating).
* Host a proxy server

## License

RapiDly Private is available under the [ISC License](https://opensource.org/licenses/ISC). See the [LICENSE.md](LICENSE.md) file for more details.
