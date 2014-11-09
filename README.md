#AddressEntry

AddressEntry is an extension of the jQuery UI autocomplete widget for collecting addresses from existing customers. It will help your existing customers choose from a list of addresses on file and will quickly get out of the way when the user begins typing an address that it doesn't recognize, only exposing the "new address" UI when needed.

##Usage

(try it out right now on CodePen: http://codepen.io/anon/pen/gbYGKX)

```js
$('input[name=street1]').addressentry({
    delay: 0,
    source: addresses,
    summarize: true,
    fields: {
        street1: $('input[name=street1]'),
        street2: $('input[name=street2]'),
        city: $('input[name=city]'),
        state: $('input[name=state]'),
        zip: $('input[name=zip]'),
    }
});
```
Initializing addressentry is identical to initializing jQuery UI's autocomplete widget - in fact, addressentry is an extension of autocomplete and supports all of autocomplete's options (plus a few more). 

**The main difference between addressentry and vanilla autocomplete** is the role of the *source* option:
> In Autocomplete, the *source* option is an array of objects that must contain two fields, *label* and *value*.
> However, in Addressentry, *source* is an array of addresses. Addresses must contains a field called *streeet1* and may optionally also contain *street2*, *city*, *state*, and *zip*. Don't worry about *label* - addressentry will summarize your addresses for your autocompleted search results.

In addition to all the options provided by jQuery UI autocomplete (http://api.jqueryui.com/autocomplete/), the following options are used:

|Option|Usage|
|------|-----|
|source|an array of objects containing common fields displayed in mailing addresses (see examples).|
|fields|an optional object that maps address fields to backing HTML Input fields. These fields are where you address parts will live once the user has chosen / entered their address.|
|summarize|bool - when true, hides all input boxes except the address1(search) box when they are not needed. Defaults to true.|
##
