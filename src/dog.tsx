import krisReact, { h } from "./lib/krisReact";
import { render } from "./lib/krisReactDom";
import Cat from "./Cat";

class Dog extends krisReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "my name is dog",
      ex: "cat",
    };
  }
  render() {
    return (
      <div className="foo" style={{ color: "red" }}>
        <span>{this.state.name}</span>
        <Cat name={this.state.ex} doReName={this.doReName.bind(this)}></Cat>
      </div>
    );
  }
  doReName(newName) {
    this.setState({ ex: newName });
  }
}

const app = document.querySelector<HTMLDivElement>("#app")!;
render(<Dog></Dog>, app);
