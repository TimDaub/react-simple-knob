# react-simple-knob

> A simple knob element for react.

<a href="https://github.com/TimDaub/react-simple-knob"><img width="600"
src="https://github.com/TimDaub/react-simple-knob/raw/master/assets/example.gif" alt="react-simple-knob screenshot" /></a>


## Installing

```bash
$ npm i --save react-simple-knob
```

or

```bash
$ yarn add react-simple-knob
```

## Usage

Import the component

```js
import Knob from "react-simple-knob";
```

and then use it:

```js
function App() {
  const style = {
	  margin: "20%",
		height: "100px",
  };

  return (
	  <Knob
		  name="Volume"
		  unit="dB"
		  angleRange={270}
		  angleOffset={180}
		  defaultPercentage={0.7}
		  onChange={console.log}
		  transform={p => parseInt(p * 50, 10) - 50}
		  style={style} />
  );
}
```
## Contributing

To try the component:

```bash
$ git clone git@github.com:TimDaub/react-simple-knob.git
$ npm i
$ npm run dev
```

### Current Limitations

Any help is very much appreciated. I'll try to merge your PRs as soon as I can!
The following things could be improved:

- [ ] Component doesn't scale automatically based on `name` and `unit` props
- [ ] No custom styling possible

## Changelog

### 0.0.1

- Initial release

## License

MIT
