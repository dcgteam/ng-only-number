# ng-only-number

Angular directive to restrict input to only allow numbers in textbox while typing along with additional options to limit no of digits before and after decimal point.

## Install

```bash
bower install --save https://github.com/dcgteam/ng-only-number
```

## How to use

In your Angular app add **DCG.OnlyNumber** as a dependency.
Add the directive **data-only-number** as an attribute to an input textbox.

```javascript
angular
	.module('YourAppName', [
		'DCG.OnlyNumber'
	])
	.run(/* ... */);
```

```html
<input type="text" data-only-number>
```

You can limit the number of digits before decimal point using **data-max-length**. If not specified it will allow any number of digits before decimal point.

```html
<input type="text" data-only-number data-max-length="3">
```

For limiting number of digits after decimal point you can use attribute **data-max-decimal-points**. If not specified it will allow any number of digits after decimal point.

```html
<input type="text" data-only-number data-max-decimal-points="1">
```
