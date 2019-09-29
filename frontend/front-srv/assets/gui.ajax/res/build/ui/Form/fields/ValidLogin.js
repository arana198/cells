/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _mixinsFormMixin = require('../mixins/FormMixin');

var _mixinsFormMixin2 = _interopRequireDefault(_mixinsFormMixin);

var _pydioUtilPass = require('pydio/util/pass');

var _pydioUtilPass2 = _interopRequireDefault(_pydioUtilPass);

var _Pydio$requireLib = _pydio2['default'].requireLib('hoc');

var ModernTextField = _Pydio$requireLib.ModernTextField;

/**
 * Text input, can be single line, multiLine, or password, depending on the
 * attributes.type key.
 */
exports['default'] = _react2['default'].createClass({
    displayName: 'ValidLogin',

    mixins: [_mixinsFormMixin2['default']],

    textValueChanged: function textValueChanged(event, value) {
        var err = _pydioUtilPass2['default'].isValidLogin(value);
        var prevStateValid = this.state.valid;
        var valid = !err;
        if (prevStateValid !== valid && this.props.onValidStatusChange) {
            this.props.onValidStatusChange(valid);
        }
        this.setState({ valid: valid, err: err });

        this.onChange(event, value);
    },

    render: function render() {
        var _this = this;

        if (this.isDisplayGrid() && !this.state.editMode) {
            var value = this.state.value;
            if (this.props.attributes['type'] === 'password' && value) {
                value = '***********';
            } else {
                value = this.state.value;
            }
            return _react2['default'].createElement(
                'div',
                { onClick: this.props.disabled ? function () {} : this.toggleEditMode, className: value ? '' : 'paramValue-empty' },
                !value ? 'Empty' : value
            );
        } else {
            var err = this.state.err;

            var field = _react2['default'].createElement(ModernTextField, {
                floatingLabelText: this.isDisplayForm() ? this.props.attributes.label : null,
                value: this.state.value || "",
                onChange: function (e, v) {
                    return _this.textValueChanged(e, v);
                },
                onKeyDown: this.enterToToggle,
                type: this.props.attributes['type'] === 'password' ? 'password' : null,
                multiLine: this.props.attributes['type'] === 'textarea',
                disabled: this.props.disabled,
                errorText: this.props.errorText || err,
                autoComplete: 'off',
                fullWidth: true
            });
            if (this.props.attributes['type'] === 'password') {
                return _react2['default'].createElement(
                    'form',
                    { autoComplete: 'off', style: { display: 'inline' } },
                    field
                );
            } else {
                return _react2['default'].createElement(
                    'span',
                    null,
                    field
                );
            }
        }
    }

});
module.exports = exports['default'];
