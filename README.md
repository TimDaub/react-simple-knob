# react-simple-knob

[![npm version](https://badge.fury.io/js/react-simple-knob.svg)](https://badge.fury.io/js/react-simple-knob)

> A simple knob element for react.

<a href="https://github.com/TimDaub/react-simple-knob"><img width="600"
src="https://github.com/TimDaub/react-simple-knob/raw/master/assets/examplev2.gif" alt="react-simple-knob screenshot" /></a>


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
    fontFamily: "Arial",
    color: "white" // Sets font color of value and knob name
  };

  return (
    <Knob
      name="Volume"
      unit="dB"
      defaultPercentage={0.7}
      onChange={console.log}
      bg="black"
      fg="white"
      mouseSpeed={5}
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
- [ ] Only very limited styling possible

## Changelog

### 0.0.6

- Bugfix: Fix Arc background

### 0.0.5

- Make `fontSize` configurable using `style` props

### 0.0.4

- Bugfix: Make style options (`color` and `fontFamily`) optional

### 0.0.3

- Allow very limited styling

### 0.0.2

- Bugfix: Fix `defaultPercentage` prop

### 0.0.1

- Initial release

## License

MIT
