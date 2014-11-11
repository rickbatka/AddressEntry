#AddressEntry

AddressEntry is an extension of the jQuery UI autocomplete widget aimed at helping in collecting addresses from existing customers, for example at the "Choose shipping address" stage of checkout. It will help your existing customers choose from a list of addresses on file and quickly get out of the way when the user begins typing an address that it doesn't recognize, only exposing the "new address" UI when needed.

*Author: Rick Batka, idea Gabriel Harris*

##Usage

(try it out right now on CodePen: http://codepen.io/anon/pen/PwYvQJ)

```js
$('input[name=street1]').addressentry({
    delay: 0,
    source: addresses,
    summarize: true,
    formFieldClass: 'address-entry',
});
```
Initializing addressentry is identical to initializing jQuery UI's autocomplete widget with a few extra parameters - in fact, addressentry is an extension of autocomplete and supports all of autocomplete's options (plus a few more). 

**The main difference between addressentry and vanilla autocomplete** is the role of the *source* option:
> In Autocomplete, the *source* option is an array of objects that must contain two fields, *label* and *value*.
> However, in Addressentry, *source* is an array of addresses. Addresses must contains a field called *streeet1* and may optionally also contain any other fields you can think of (street2, city, state, zip, addressId, category... any metadata you may need). Don't worry about *label* - addressentry will summarize your addresses for your autocompleted search results.

In addition to all the options provided by jQuery UI autocomplete (http://api.jqueryui.com/autocomplete/), the following options are used:

|Option|Usage|
|------|-----|
|source|an array of objects containing common fields displayed in mailing addresses (see examples).|
|formFieldClass|important. this is the class that you need to apply to all your fields that you want populated. if you have a hidden field called addressId, and your addresses in the *source* field contain addressId, then apply this class to the field and it will get its value populated when the user selectes an address. same for other fields you might want to collect, like street1, city, zip, etc.|
|summarize|bool - when true, hides all input boxes except the address1(search) box when they are not needed. Defaults to true.|
##
