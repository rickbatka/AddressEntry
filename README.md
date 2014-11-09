#AddressEntry
============

AddressEntry is an extension of the jQuery UI autocomplete widget for collecting addresses from existing customers. It will help your existing customers choose from a list of addresses on file and will quickly get out of the way when the user begins typing an address that it doesn't recognize, only exposing the "new address" UI when needed.

##Usage
============
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
