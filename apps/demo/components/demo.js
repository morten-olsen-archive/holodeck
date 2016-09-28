import Component from 'libs/ui/component/component';

class DemoComponent2 extends Component {
  render() {
    return {
      type: 'ul',
      children: [{
        type: 'li',
        props: {
          content: 'test 1 ' + this.props.name1,
        },
      },{
        type: 'li',
        props: {
          content: 'test 2 ' + this.props.name2,
          onclick: () => {
            console.log('i wass clicked!')
          }
        },
      }]
    }
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
    return {
      type: 'div',
      children: [{
        type: DemoComponent2,
        props: {
          name1: 'hello 1',
          name2: 'hello ' + this.state.i,
        }
      },{
        type: DemoComponent2,
        props: {
          name1: 'hello 1',
          name2: 'hello ' + this.state.i,
        }
      }]
    }
  }
}

export default DemoComponent1;
