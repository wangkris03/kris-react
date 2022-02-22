import krisReact from "./lib/krisReact";
import { h } from "./lib/krisReact";

function Fish(props) {
  console.log(props);

  return <p>我是{props.fish}</p>;
}

class Cat extends krisReact.Component {
  constructor(props) {
    super(props);
    console.log("Cat.props", props);

    this.state = {
      fish: "fish12",
    };
  }

  render() {
    return (
      <div>
        <h1>hello {this.props.name}</h1>
        <button onClick={this.doReName.bind(this)}>修改name</button>
        <Fish fish={this.state.fish}></Fish>
      </div>
    );
  }
  doReName() {
    this.props.doReName("React工程师");
  }
}

export default Cat;
