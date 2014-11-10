$.widget("Custom.addressentry", $.ui.autocomplete, {
	_create: function () {
		this._super();

		//set up UI
		this.summarySpan = $('<span class="address-entry-summary"></span>').hide();
		this.resetLink = $('<a href="#">Reset</a>').hide();
		this.element.before(this.summarySpan);
		this.summarySpan.after(this.resetLink);

		if (this.options.summarize) {
			this._toggleAllFieldsVisibility(false, true);
		}

		// wire up new event handlers
		this._on(this.element, { addressentryselect: "handleSelect" });
		this._on(this.element, { addressentryresponse: "handleResponse" });
		this._on(this.resetLink, { click: "handleResetClick" });

		// make categories non-selectable options in menu
		this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");

		// create search labels for source addresses
		for (var i in this.options.source) {
			this.options.source[i].label = this._combineAddress(this.options.source[i]);
		}
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

	_renderMenu: function (ul, items) {
		//add categories in menu
		var that = this,
		  currentCategory = "";
		$.each(items, function (index, item) {
			var li;
			if (item.category != currentCategory) {
				ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
				currentCategory = item.category;
			}
			li = that._renderItemData(ul, item);
			if (item.category) {
				li.attr("aria-label", item.category + " : " + item.label);
			}
		});
	},

	handleSelect: function (event, ui) {
		var selectedAddress = ui.item;
		this._setField(this.options.fields.street1, selectedAddress.street1);
		this._setField(this.options.fields.street2, selectedAddress.street2);
		this._setField(this.options.fields.city, selectedAddress.city);
		this._setField(this.options.fields.state, selectedAddress.state);
		this._setField(this.options.fields.zip, selectedAddress.zip);

		if (this.options.summarize) {
			this._summarize(selectedAddress);
			this._toggleAllFieldsVisibility(false);
		}

		//prevent the parent autocomplete select event from firing - it'll try to munge the entire address into the autocomplete field
		return false;
	},

	handleResponse: function (event, ui) {
		if (ui.content.length == 0) {
			this._toggleAllFieldsVisibility(true);
		} else {
			//this._toggleAllFieldsVisibility(false, true);
		}
	},

	handleResetClick: function () {
		this._resetAllFields();
		$(this.options.fields.street1).show();
		if (this.options.summarize) {
			this._unsummarize();
		}
		$(this.options.fields.street1).focus();
	},

	_setField: function (ele, val) {
		if (ele) {
			if (val) {
				$(ele).val(val);
			} else {
				$(ele).val('');
			}
		}
	},

	_summarize: function (selectedAddress) {
		$(this.summarySpan).html(this._combineAddress(selectedAddress, true));
		$(this.summarySpan).show();
		$(this.resetLink).show();
	},

	_unsummarize: function () {
		$(this.summarySpan).html('');
		$(this.summarySpan).hide();
		$(this.resetLink).hide();
	},

	_resetAllFields: function () {
		for (var i in this.options.fields) {
			this._setField(this.options.fields[i], '');
		}
	},

	_toggleAllFieldsVisibility: function (visible, ignoreStreet1) {
		for (var i in this.options.fields) {
			if (!ignoreStreet1 || i != 'street1') {
				if (visible) {
					$(this.options.fields[i]).show();
				} else {
					$(this.options.fields[i]).hide();
				}
			}
		}
	},


});
