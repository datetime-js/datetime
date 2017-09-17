# DateTime

DateTime is a lightweight and performant date and time library with iana timezones support.

<a name="motivation"></a>
## Motivation

DateTime does not use native Date object. Instead it uses pre-parsed
[IANA Time Zone Database](https://www.iana.org/time-zones)
directly from JavaScript. That allows to keep it predictable, reliable, and future proof on any platform.

<a name="features"></a>
## Key features

- Supports [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard, including intervals and durations
- Supports timezones and DST
- Works in any browser on any platform independently from the native Date
- [Very fast](#performance)
- Small size – only 10 KB compressed
- No dependencies
- 99% covered with unit tests


<a name="api"></a>
## API documentation

Coming soon.


<a name="performance"></a>
## Performance

DateTime is much faster than any other library with timezones support:

```
Create a new instance with an array
==================================================================
DateTime × 782,154 ops/sec
MomentJS × 260,938 ops/sec
MomentJS + Timezones × 49,593 ops/sec
Fastest is DateTime

Create a new instance with a string
==================================================================
DateTime × 383,795 ops/sec
MomentJS × 34,681 ops/sec
MomentJS with timezones × 20,491 ops/sec
js-joda with timezones × 20,153 ops/sec
Fastest is DateTime

Create a new instance with a string and format
==================================================================
DateTime × 504,000 ops/sec
MomentJS × 38,349 ops/sec
MomentJS + Timezones × 21,643 ops/sec
Fastest is DateTime
```

Check [datetime-benchmark](https://github.com/datetime-js/datetime-benchmark) for details.

<a name="license"></a>
## Licence

MIT
