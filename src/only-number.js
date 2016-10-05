(function(angular) {

	'use strict';

	angular.module('DCG.OnlyNumber', [])
		.directive('onlyNumber', function() {

			/*
				this directive allowes only numbers with decimal point.
				You can specify the max decimal points using data-max-decimal-points in the dom element.
				if data-max-decimal-points is not specified, it will allow upto any dicimal point.
			*/

			function postLink(scope, element) {

				if (!$(element).attr('min')) {
					$(element).attr('min', 0);
				}

				function toIncreaseMaxLengthBy(element) {
					return (1 + element.data('maxDecimalPoints'));
				}

				var el = $(element)[0];
				el.initMaxLength = element.data('maxLength');
				el.maxDecimalPoints = element.data('maxDecimalPoints');

				function checkPositive(element, ev) {

					try {

						var el = $(element)[0];

						if (el.value.indexOf('.') > -1) {

							if (ev.charCode >= 48 && ev.charCode <= 57) {

								if (el.value.indexOf('.') === el.value.length - toIncreaseMaxLengthBy(element)) {

									if (el.selectionStart > el.value.indexOf('.')) {
										return false;
									} else {

										if (el.value.length === element.data('maxLength')) {
											return false;
										} else {
											return true;
										}
									}

								} else {

									if (el.selectionStart <= el.value.indexOf('.')) {

										if (el.value.indexOf('.') === toIncreaseMaxLengthBy(element)) {
											return false;
										}

									}

								}
							}

						} else {

							if (el.value.length === element.data('maxLength')) {

								if (ev.charCode === 46) {

									if (typeof el.maxDecimalPoints === undefined) {
										return true;
									} else {

										if (el.selectionStart < el.value.length - el.maxDecimalPoints) {
											return false;
										}

									}

									element.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(element));

									return true;

								} else if (ev.charCode >= 48 && ev.charCode <= 57) {
									return false;
								}

							}

							if (ev.charCode === 46) {

								if (el.selectionStart < el.value.length - element.data('maxDecimalPoints')) {
									return false;
								} else {
									return true;
								}

							}

						}
						if (ev.charCode === 46) {

							if (el.value.indexOf('.') > -1) {
								return false;
							} else {
								return true;
							}

						}

						if ((ev.charCode < 48 || ev.charCode > 57) && ev.charCode !== 0) {
							return false;
						}

					} catch (err) {
						// TODO
					}

				}

				function changeMaxlength(element) {

					try {

						var el = $(element)[0];

						if (el.value.indexOf('.') > -1) {
							element.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(element));
						} else {

							if (element.data('maxLength') === el.initMaxLength + toIncreaseMaxLengthBy(element)) {
								el.value = el.value.substring(0, el.selectionStart);
							}

							element.data('maxLength', el.initMaxLength);

						}

					} catch (err) {
						// TODO
					}

				}

				$(element).on('keypress', function() {
					return checkPositive(element, event);
				});

				$(element).on('input', function() {
					return changeMaxlength(element, event);
				});

			}

			return {
				restrict: 'A',
				link: postLink
			};

		});

}(angular));
