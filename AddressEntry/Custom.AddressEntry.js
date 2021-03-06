﻿$.widget("Custom.addressentry", $.ui.autocomplete, {
	_create: function () {
		this._super();

		if (this.options.summarize) {
			this._toggleAllFieldsVisibility(false);
		}

		//set up UI
		this.summaryContainer = $('<div class="address-entry-summarycontainer" style="z-index: -1"></div>');
		this.summaryInner = $('<div class="address-entry-summary" style="min-height:100px;"></div>').css('visibility', 'hidden');
		this.resetLink = $('<span class="address-entry-link-container" style="display:block;"><a class="addressentry-resetlink" href="#" tabindex="-1">Retry Address Suggestion</a></span>').css('visibility', 'hidden');;

		var addressEntryPosition = $(this.element).position();
		this.summaryContainer.css({ 'position': 'absolute', 'top': addressEntryPosition.top + 'px', 'left': addressEntryPosition.left+'px' });
		this.summaryContainer.append(this.summaryInner);
		this.summaryContainer.append(this.resetLink);
		$(this.element).after(this.summaryContainer);

		// wire up new event handlers
		this._on(this.element, { addressentryselect: "handleSelect" });
		this._on(this.element, { addressentryresponse: "handleResponse" });
		this._on(this.resetLink, { click: "handleResetClick" });

		// create search labels for source addresses
		for (var i in this.options.source) {
			this.options.source[i].label = this._combineAddress(this.options.source[i]);
		}

		$(this.element).css('visibility', 'visible');
	},
	_combineAddress: function (address, withBreaks) {
		var combined = address.street1;
		if (address.street2) {
			combined += ' ' + address.street2;
		}

		if (withBreaks) {
			combined += '<br />';
		} else {
			combined += ' ';
		}

		combined += address.city + ', ' + address.state + ' ' + address.zip;
		return combined;
	},

	handleSelect: function (event, ui) {
		var selectedAddress = ui.item;
		
		// check if they clicked "New Address" entry in list
		if (ui.item.newaction) {
			this.handleResetClick();
			this._enterNewAddress();
			$('input.' + this.options.formFieldClass + '[name=street1]').val(this.term);
		} else {
			for (var i in selectedAddress) {
				this._setField(i, selectedAddress[i]);
			}

			if (this.options.summarize) {
				this._summarize(selectedAddress);
				this._toggleAllFieldsVisibility(false);
			}
		}

		//prevent the parent autocomplete select event from firing - it'll try to munge the entire address into the autocomplete field
		return false;
	},

	_setField: function (label, val) {
		var selector = 'input.'+this.options.formFieldClass+'[name='+label+']';

		if ($(selector)) {
			if (val) {
				$(selector).val(val);
			} else {
				$(selector).val('');
			}
		}
	},

	handleResponse: function (event, ui) {
		// if there are no search results for a query, show everything
		if (ui.content.length == 0) {
			this._enterNewAddress();
		} else {
			ui.content.push({ 'label': 'New Address', 'value': this.term, 'newaction': true });
		}
	},

	_enterNewAddress: function () {
		this._toggleAllFieldsVisibility(true);
		$(this.resetLink).css('visibility', 'visible');;
	},

	handleResetClick: function () {
		this._resetAllFields();
		
		if (this.options.summarize) {
			this._toggleAllFieldsVisibility(false);
			this._unsummarize();
		}

		$('input.' + this.options.formFieldClass + '[name=street1]').css('visibility', 'visible');
		$('input.' + this.options.formFieldClass + '[name=street1]').focus();
	},

	_summarize: function (selectedAddress) {
		$(this.summaryInner).html(this._combineAddress(selectedAddress, true));
		$(this.summaryInner).css('visibility', 'visible');
		$(this.summaryContainer).css('z-index', '1');
		$(this.resetLink).css('visibility', 'visible');;
	},

	_unsummarize: function () {
		$(this.summaryInner).html('');
		$(this.summaryInner).css('visibility', 'hidden');
		$(this.summaryContainer).css('z-index', '-1');
		$(this.resetLink).css('visibility', 'hidden');;
	},

	_resetAllFields: function () {
		var allFields = $('input.' + this.options.formFieldClass);

		for (var i = 0; i < allFields.length; i ++) {
			this._setField($(allFields[i]).attr('name'), '');
		}
	},

	_toggleAllFieldsVisibility: function (visible) {
		var allFields = $('input.' + this.options.formFieldClass);
		for (var i = 0; i < allFields.length; i++) {
			if (visible) {
				$(allFields[i]).css('visibility', 'visible');
			} else {
				$(allFields[i]).css('visibility', 'hidden');
			}
		}
	},

});
