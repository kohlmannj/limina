const { shallow } = require('enzyme');

exports.StoriesOf = class {
  constructor(name) {
    this.suiteName = name;
  }

  add(description, getElement) {
    describe(`${this.suiteName}`, () => {
      it(description, () => {
        const element = getElement();
        const wrapper = shallow(element);
        expect(wrapper).toMatchSnapshot();
      });
    });
    return this;
  }

  addDecorator() {
    return this;
  }
};

exports.storiesOf = name => new exports.StoriesOf(name);
