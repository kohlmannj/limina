/* tslint:disable no-implicit-dependencies */
import { shallow } from 'enzyme';
import React, { ReactElement } from 'react';

export class StoriesOf {
  private suiteName: string;

  constructor(name: string) {
    this.suiteName = name;
  }

  public add(description: string, getElement: () => ReactElement<{}>) {
    describe(this.suiteName, () => {
      it(description, () => {
        const element = getElement();
        const wrapper = shallow(element);
        expect(wrapper).toMatchSnapshot();
      });
    });
    return this;
  }

  public addDecorator() {
    return this;
  }
}

export const storiesOf = (name: string) => new StoriesOf(name);
