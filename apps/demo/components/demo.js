import React from 'libs/reactable';
import Component from 'libs/ui/component/component';

const style = `
  .test {
    padding: 15px;
  }
`;

class DemoComponent2 extends Component {
  render() {
    return (
      <ul>
        <li onclick={() => console.log(this.props.name1) }>{'test 1 ' + this.props.name1}</li>
        <li>{'test 1 ' + this.props.name2}</li>
      </ul>
    );
  }
}

class DemoComponent1 extends Component {
  constructor() {
    super();
    this.state = { i: 1 };
    this.count();
  }

  count() {
    setTimeout(() => {
      this.setState({
        i: this.state.i + 1,
      });
      this.count();
    }, 1000);
  }

  render() {
    return (
      <div class="test">
        <style>{style}</style>
        <div hello="world">{'test' + this.state.i}</div>
        <DemoComponent2 name1="hello 1" name2={this.state.i} />
        <DemoComponent2 name1="hello 2" name2={this.state.i + 1} />
        <img src="http://placeponi.es/300/300" />
        { this.state.i % 2 && <DemoComponent2 name1="hello 3" name2="hello 4" /> }
      </div>
    );
  }
}

export default DemoComponent1;
