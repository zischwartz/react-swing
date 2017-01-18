'use strict';

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Stack, Card , Direction} from 'swing';


class Swing extends Component {
    static propTypes = {
        setStack: PropTypes.func.isRequired,
        tagName: PropTypes.string,
        config: PropTypes.object
    };

    static defaultProps = {
        tagName: 'div',
        children: [] // moved from required PropTypes to default of empty array here
    };

    constructor(props, context) {
        super(props, context);

        const stack = Stack(props.config);
        this.state = {
            stack: stack,
            // cardList: [] // XXX removed by Zach, this doesn't seem to appear anywhere in either library
        };
    }

    componentDidMount() {
        console.log("componentDidMount")
        const events = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove','dragend'];
        const stack = this.state.stack;
        console.log('mapping events ❌')
        events.map((event) => {
            if (this.props[event]) {
                stack.on(event, this.props[event]);
            }
        });

        React.Children.forEach(this.props.children, (child, key) => {
            let ref = child.ref || key;
            let element = ReactDOM.findDOMNode(this.refs[`${ref}`]);
            let card = stack.createCard(element);
            card.throwIn(0,-1) // needed?
            // events.map((event) => {
            //     if (child.props[event]) {
            //         card.on(event, child.props[event]);
            //     }
            // });
        });

        this.setState({
            stack: stack
        });
        this.props.setStack(stack);
    }

    componentDidUpdate(prevProps, prevState){
      // console.log("componentDidUpdate", this.props.children.length,  prevProps.children.length )
      if(this.props.children.length > prevProps.children.length){
        const events = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove','dragend'];
        const stack = this.state.stack;
        // XXX I think this is causing multiple calls XXX Zach
        // seems to be, also unneccesary
        // events.map((event) => {
        //     if (this.props[event]) {
        //         stack.on(event, this.props[event]);
        //     }
        // });

        React.Children.forEach(this.props.children, (child, key) => {
            let ref = child.ref || key;
            let el = ReactDOM.findDOMNode(this.refs[`${ref}`]);
            // let card = stack.createCard(element);
            // zomg this is it
            let card = Card(stack, el)
            card.throwIn(0,-1)
            // console.log(card)
            // let result = prevProps.children.find((c) => {
            //   return c.key === child.key
            // })
            //
            // if(!result){
            //   events.map((event) => {
            //       if (child.props[event]) {
            //           card.on(event, child.props[event]);
            //       }
            //   });
            // }
        });
        this.setState({
            stack: stack
        });
        this.props.setStack(stack);
      }
    }

    render() {
        console.log('swing render' )
        // XXX added throwout here, to prevent it from being passed to the child
        // as it is not a valid dom prop so causes errors
        const { children, setStack, tagName, config, throwout, throwoutend, ...others } = this.props;
        // const { children, setStack, tagName, config, throwout, throwoutend, ...others } = this.props;
        const Tag = tagName;
        return (
            <Tag {...others}>
                {React.Children.map(children, (child, key) => {
                    // console.log(key, child)
                    const ref = child.ref || key;
                    return React.cloneElement(child, {
                        ref: `${ref}`
                    });
                })}
            </Tag>
        )
    }
}

export default Swing;
export { Stack, Card, Direction };
