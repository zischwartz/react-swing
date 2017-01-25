'use strict';

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Direction = exports.Card = exports.Stack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _swing = require('swing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swing = function (_Component) {
    _inherits(Swing, _Component);

    function Swing(props, context) {
        _classCallCheck(this, Swing);

        var _this = _possibleConstructorReturn(this, (Swing.__proto__ || Object.getPrototypeOf(Swing)).call(this, props, context));

        var stack = (0, _swing.Stack)(props.config);
        _this.state = {
            stack: stack
        };
        return _this;
    }

    _createClass(Swing, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var events = ['throwout', 'throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove', 'dragend'];
            var stack = this.state.stack;
            events.map(function (event) {
                if (_this2.props[event]) {
                    stack.on(event, _this2.props[event]);
                }
            });

            _react2.default.Children.forEach(this.props.children, function (child, key) {
                var ref = child.ref || key;
                var element = _reactDom2.default.findDOMNode(_this2.refs['' + ref]);
                var card = stack.createCard(element);
                card.throwIn(0, -1); // needed?
                // let ref = child.ref || key;
                // let el = ReactDOM.findDOMNode(this.refs[`${ref}`]);
                // // zomg this is it
                // let card = Card(stack, el)
                // card.throwIn(0,-1)

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
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this3 = this;

            console.log("react-swing - componentDidUpdate", this.props.children.length, prevProps.children.length);

            _react2.default.Children.forEach(this.props.children, function (child, key) {
                // console.log(this.state.stack)
                var ref = child.ref || key;
                var el = _reactDom2.default.findDOMNode(_this3.refs['' + ref]);
                // aha!
                if (!_this3.state.stack.getCard(el)) {
                    console.log('react-swing - add card');
                    var card = _this3.state.stack.createCard(el);
                    card.throwIn(0, -1);
                }
            });

            // xxx do we still need that set stack?

            if (this.props.children.length > prevProps.children.length) {
                var events = ['throwout', 'throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove', 'dragend'];
                var stack = this.state.stack;
                // XXX I think this is causing multiple calls XXX Zach
                // seems to be, also unneccesary
                // events.map((event) => {
                //     if (this.props[event]) {
                //         stack.on(event, this.props[event]);
                //     }
                // });
                this.setState({
                    stack: stack
                });
                this.props.setStack(stack);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log('swing render' )
            // XXX added throwout here, to prevent it from being passed to the child
            // as it is not a valid dom prop so causes errors
            var _props = this.props,
                children = _props.children,
                setStack = _props.setStack,
                tagName = _props.tagName,
                config = _props.config,
                throwout = _props.throwout,
                throwoutend = _props.throwoutend,
                others = _objectWithoutProperties(_props, ['children', 'setStack', 'tagName', 'config', 'throwout', 'throwoutend']);
            // const { children, setStack, tagName, config, throwout, throwoutend, ...others } = this.props;


            var Tag = tagName;
            return _react2.default.createElement(
                Tag,
                others,
                _react2.default.Children.map(children, function (child, key) {
                    // console.log(key, child)
                    var ref = child.ref || key;
                    return _react2.default.cloneElement(child, {
                        ref: '' + ref
                    });
                })
            );
        }
    }]);

    return Swing;
}(_react.Component);

Swing.propTypes = {
    setStack: _react.PropTypes.func.isRequired,
    tagName: _react.PropTypes.string,
    config: _react.PropTypes.object
};
Swing.defaultProps = {
    tagName: 'div',
    children: [] // moved from required PropTypes to default of empty array here
};
exports.default = Swing;
exports.Stack = _swing.Stack;
exports.Card = _swing.Card;
exports.Direction = _swing.Direction;
