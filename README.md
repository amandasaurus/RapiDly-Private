# RapiDly Private - a privacy preserving version of RapiD/iD for OpenStreetMap mapping with AI

RapiDly Private is an enhanced version of [RapiD editor]() from Facebook, which is based on the [iD editor](https://github.com/openstreetmap/iD).

For information on iD, see their [GitHub repository](https://github.com/openstreetmap/iD), and the [iD README](https://github.com/openstreetmap/iD/blob/master/README.md). You can also view the original version of [RapiD's README](./README_RapiD.md).

## Privacy

Facebook's policy & track record on privacy speaks for itself. The original version of RapiD uses images and data directly from `www.facebook.com`, which harms the user's privacy. This version proxies all Facebook access through `www.technomancy.org`, which should help hide personally identifying information.

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
