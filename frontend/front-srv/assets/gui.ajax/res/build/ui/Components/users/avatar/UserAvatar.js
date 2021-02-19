'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GraphPanel = require('./GraphPanel');

var _GraphPanel2 = _interopRequireDefault(_GraphPanel);

var _ActionsPanel = require('./ActionsPanel');

var _ActionsPanel2 = _interopRequireDefault(_ActionsPanel);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pydioHttpApi = require("pydio/http/api");

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

/**
 * Generic component for display a user and her avatar (first letters or photo)
 */

var debounce = require('lodash.debounce');
var React = require('react');
var Color = require('color');

var _require = require('material-ui');

var FontIcon = _require.FontIcon;
var Popover = _require.Popover;
var Paper = _require.Paper;
var Avatar = _require.Avatar;
var CardTitle = _require.CardTitle;
var Divider = _require.Divider;

var _require2 = require('material-ui/styles');

var muiThemeable = _require2.muiThemeable;

var MetaCacheService = require('pydio/http/meta-cache-service');

var _require3 = require('pydio/http/users-api');

var UsersApi = _require3.UsersApi;

var UserAvatar = (function (_React$Component) {
    _inherits(UserAvatar, _React$Component);

    function UserAvatar(props, context) {
        _classCallCheck(this, UserAvatar);

        _React$Component.call(this, props, context);
        this.state = {
            user: null,
            avatar: null,
            graph: null,
            local: false
        };
    }

    UserAvatar.prototype.componentDidMount = function componentDidMount() {
        this.loadPublicData(this.props.userId, this.props.idmUser);
    };

    UserAvatar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!this.props.userId || this.props.userId !== nextProps.userId) {
            this.setState({ label: nextProps.userId });
            this.loadPublicData(nextProps.userId, nextProps.idmUser);
        }
    };

    UserAvatar.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this._userLoggedObs) {
            this.props.pydio.stopObserving('user_logged', this._userLoggedObs);
        }
    };

    /**
     *
     * @param userId string
     * @param idmUser {IdmUser}
     */

    UserAvatar.prototype.loadPublicData = function loadPublicData(userId, idmUser) {
        var _this = this;

        var _props = this.props;
        var userType = _props.userType;
        var richCard = _props.richCard;
        var pydio = _props.pydio;

        if (userType === "group" || userType === "team") {
            return;
        }
        UsersApi.getUserPromise(userId, idmUser).then(function (userObject) {
            if (userObject.isLocal()) {
                _this._userLoggedObs = function (eventUser) {
                    _this._userLoggedObs = null;
                    if (eventUser !== null) {
                        _this.loadPublicData(userId);
                    }
                };
                pydio.observeOnce('user_logged', _this._userLoggedObs);
            }
            _this.setState({
                user: userObject,
                avatar: userObject.getAvatar(),
                local: userObject.isLocal()
            });
            // Load graph
            if (richCard && !userObject.isNotFound()) {
                _pydioHttpApi2['default'].getRestClient().getIdmApi().loadUserGraph(userId).then(function (response) {
                    var graph = { cells: {}, teams: [] };
                    if (response.SharedCells) {
                        response.SharedCells.forEach(function (workspace) {
                            graph.cells = response.SharedCells;
                        });
                    }
                    if (response.BelongsToTeams) {
                        response.BelongsToTeams.forEach(function (role) {
                            graph.teams.push({
                                id: role.Uuid,
                                label: role.Label,
                                type: 'team',
                                IdmRole: role
                            });
                        });
                    }
                    _this.setState({ graph: graph });
                });
            }
        })['catch'](function (e) {
            // User may have been deleted
            _this.setState({ loadError: true });
        });
    };

    UserAvatar.prototype.render = function render() {
        var _this2 = this;

        var _state = this.state;
        var user = _state.user;
        var avatar = _state.avatar;
        var graph = _state.graph;
        var local = _state.local;
        var loadError = _state.loadError;
        var _props2 = this.props;
        var pydio = _props2.pydio;
        var userId = _props2.userId;
        var userType = _props2.userType;
        var icon = _props2.icon;
        var style = _props2.style;
        var labelStyle = _props2.labelStyle;
        var avatarLetters = _props2.avatarLetters;
        var avatarStyle = _props2.avatarStyle;
        var avatarSize = _props2.avatarSize;
        var className = _props2.className;
        var labelMaxChars = _props2.labelMaxChars;
        var labelClassName = _props2.labelClassName;
        var displayLabel = _props2.displayLabel;
        var displayLocalLabel = _props2.displayLocalLabel;
        var displayLabelChevron = _props2.displayLabelChevron;
        var labelChevronStyle = _props2.labelChevronStyle;
        var displayAvatar = _props2.displayAvatar;
        var useDefaultAvatar = _props2.useDefaultAvatar;
        var richCard = _props2.richCard;
        var muiTheme = _props2.muiTheme;
        var noActionsPanel = _props2.noActionsPanel;
        var label = this.state.label;

        var labelTitle = undefined;
        var userTypeLabel = undefined;
        var userNotFound = loadError;
        var userIsPublic = false;
        if (user) {
            label = user.getLabel();
            userNotFound = user.isNotFound();
            userIsPublic = user.isPublic();
        } else if (!label) {
            label = this.props.userLabel || this.props.userId;
        }
        if (local && displayLocalLabel) {
            label = pydio.MessageHash['634'];
        }

        if (labelMaxChars && label && label.length > labelMaxChars) {
            if (label.split(' ').length > 1) {
                labelTitle = label;
                label = label.split(' ').map(function (word) {
                    return word[0];
                }).join('');
            } else if (label.split('@').length > 1) {
                labelTitle = label;
                if (label.split('@')[0].split('.').length > 1) {
                    label = label.split('@')[0].split('.').map(function (word) {
                        return word[0];
                    }).join('');
                } else {
                    label = label.split('@')[0];
                }
            }
        }

        var avatarContent = undefined,
            avatarColor = undefined,
            avatarIcon = undefined;
        if (richCard) {
            displayAvatar = true;
            useDefaultAvatar = true;
            displayLabel = true;
        }
        if (displayAvatar && !avatar && label && (!displayLabel || useDefaultAvatar)) {
            var avatarsColor = muiTheme.palette.avatarsColor;
            if (userType === 'group' || userType === 'team' || userId.indexOf('PYDIO_GRP_/') === 0 || userId.indexOf('/USER_TEAM/') === 0) {
                avatarsColor = Color(avatarsColor).darken(0.2).toString();
            }
            var iconClassName = undefined;
            switch (userType) {
                case 'group':
                    iconClassName = 'mdi mdi-account-multiple';
                    userTypeLabel = '289';
                    break;
                case 'team':
                    iconClassName = 'mdi mdi-account-multiple-outline';
                    userTypeLabel = '603';
                    break;
                case 'remote':
                    iconClassName = 'mdi mdi-account-network';
                    userTypeLabel = '604';
                    break;
                default:
                    iconClassName = 'mdi mdi-account';
                    if (user) {
                        if (user.getExternal()) {
                            userTypeLabel = '589';
                            if (user.isPublic()) {
                                userTypeLabel = '589';
                                label = pydio.MessageHash["public_link_user"];
                                iconClassName = 'mdi mdi-link';
                            }
                        } else {
                            userTypeLabel = '590';
                        }
                    } else {
                        userTypeLabel = '288';
                    }
                    break;
            }
            if (icon) {
                iconClassName = icon;
            }
            if (userTypeLabel) {
                userTypeLabel = pydio.MessageHash[userTypeLabel];
            }
            if (richCard) {
                avatarIcon = React.createElement(FontIcon, { className: iconClassName, style: { color: avatarsColor } });
                avatarColor = '#f5f5f5';
            } else {
                avatarColor = avatarsColor;
                if (iconClassName && !avatarLetters) {
                    avatarIcon = React.createElement(FontIcon, { className: iconClassName });
                } else {
                    avatarContent = label.split(' ').map(function (word) {
                        return word[0];
                    }).join('').substring(0, 2);
                    if (avatarContent.length < 2) {
                        avatarContent = label.substring(0, 2);
                    }
                }
            }
        }
        var reloadAction = undefined,
            onEditAction = undefined,
            onMouseOver = undefined,
            onMouseOut = undefined,
            onClick = undefined,
            popover = undefined;
        if (richCard) {
            (function () {

                displayAvatar = true;
                style = _extends({}, style, { flexDirection: 'column' });
                //avatarSize = cardSize ? cardSize : '100%';
                //avatarStyle = {borderRadius: 0};
                avatarSize = 100;
                avatarStyle = { marginTop: 20 };
                var localReload = function localReload() {
                    MetaCacheService.getInstance().deleteKey('user_public_data-graph', _this2.props.userId);
                    _this2.loadPublicData(_this2.props.userId, _this2.props.idmUser);
                };
                reloadAction = function () {
                    localReload();
                    if (_this2.props.reloadAction) {
                        _this2.props.reloadAction();
                    }
                };
                onEditAction = function () {
                    localReload();
                    if (_this2.props.onEditAction) {
                        _this2.props.onEditAction();
                    }
                };
            })();
        } else if (!local && !userNotFound && !userIsPublic && this.props.richOnHover) {
            (function () {

                onMouseOut = function () {
                    if (!_this2.lockedBySubPopover) {
                        _this2.setState({ showPopover: false });
                    }
                };
                onMouseOut = debounce(onMouseOut, 350);
                onMouseOver = function (e) {
                    _this2.setState({ showPopover: true, popoverAnchor: e.currentTarget });
                    onMouseOut.cancel();
                };
                var onMouseOverInner = function onMouseOverInner(e) {
                    _this2.setState({ showPopover: true });
                    onMouseOut.cancel();
                };

                var lockOnSubPopoverOpen = function lockOnSubPopoverOpen(status) {
                    _this2.lockedBySubPopover = status;
                    onMouseOverInner();
                };
                var _props3 = _this2.props;
                var style = _props3.style;

                var popoverProps = _objectWithoutProperties(_props3, ['style']);

                popover = React.createElement(
                    Popover,
                    {
                        open: _this2.state.showPopover,
                        anchorEl: _this2.state.popoverAnchor,
                        onRequestClose: function (reason) {
                            if (reason !== 'clickAway' || !_this2.lockedBySubPopover) {
                                _this2.setState({ showPopover: false });
                            }
                        },
                        anchorOrigin: { horizontal: "left", vertical: "center" },
                        targetOrigin: { horizontal: "right", vertical: "center" },
                        useLayerForClickAway: false
                    },
                    React.createElement(
                        Paper,
                        { zDepth: 2, style: { width: 220, height: 320, overflowY: 'auto' }, onMouseOver: onMouseOverInner, onMouseOut: onMouseOut },
                        React.createElement(UserAvatar, _extends({}, popoverProps, { richCard: true, richOnHover: false, cardSize: 220, lockOnSubPopoverOpen: lockOnSubPopoverOpen }))
                    )
                );
            })();
        } else if (!local && !userNotFound && !userIsPublic && this.props.richOnClick) {
            (function () {

                onMouseOut = function () {
                    if (!_this2.lockedBySubPopover) {
                        _this2.setState({ showPopover: false });
                    }
                };
                onMouseOut = debounce(onMouseOut, 350);
                onClick = function (e) {
                    _this2.setState({ showPopover: true, popoverAnchor: e.currentTarget });
                    onMouseOut.cancel();
                };
                var onMouseOverInner = function onMouseOverInner(e) {
                    _this2.setState({ showPopover: true });
                    onMouseOut.cancel();
                };

                var lockOnSubPopoverOpen = function lockOnSubPopoverOpen(status) {
                    _this2.lockedBySubPopover = status;
                    onMouseOverInner();
                };
                var _props4 = _this2.props;
                var style = _props4.style;

                var popoverProps = _objectWithoutProperties(_props4, ['style']);

                popover = React.createElement(
                    Popover,
                    {
                        open: _this2.state.showPopover,
                        anchorEl: _this2.state.popoverAnchor,
                        onRequestClose: function (reason) {
                            if (reason !== 'clickAway' || !_this2.lockedBySubPopover) {
                                _this2.setState({ showPopover: false });
                            }
                        },
                        anchorOrigin: { horizontal: "left", vertical: "bottom" },
                        targetOrigin: { horizontal: "left", vertical: "top" },
                        useLayerForClickAway: false
                    },
                    React.createElement(
                        Paper,
                        { zDepth: 2, style: { width: 220, height: 320, overflowY: 'auto' }, onMouseOver: onMouseOverInner, onMouseOut: onMouseOut },
                        React.createElement(UserAvatar, _extends({}, popoverProps, { richCard: true, richOnHover: false, cardSize: 220, lockOnSubPopoverOpen: lockOnSubPopoverOpen }))
                    )
                );
            })();
        }

        if (avatar) {
            avatarIcon = React.createElement(FontIcon, { style: {
                    backgroundImage: "url(" + avatar + "?dim=" + avatarSize + ")",
                    backgroundSize: 'cover',
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundPosition: 'center'
                } });
        }

        var avatarComponent = React.createElement(
            Avatar,
            {
                icon: avatarIcon,
                size: avatarSize,
                style: this.props.avatarOnly ? this.props.style : avatarStyle,
                backgroundColor: avatarColor
            },
            avatarContent
        );

        if (this.props.avatarOnly) {
            return avatarComponent;
        }

        if (richCard) {
            avatarComponent = React.createElement(
                'div',
                { style: { textAlign: 'center' } },
                avatarComponent
            );
        } else if (userNotFound) {
            //labelStyle = {...labelStyle, textDecoration:'line-through'};
            label = pydio.MessageHash['user.unknown'];
        }
        var labelChevron = undefined;
        if (displayLabel && displayLabelChevron) {
            labelChevron = React.createElement('span', { className: "mdi mdi-chevron-down", style: _extends({}, labelChevronStyle, { marginLeft: 4, fontSize: '0.8em' }) });
        }

        return React.createElement(
            'div',
            { className: className, style: style, onMouseOver: onMouseOver, onMouseOut: onMouseOut, onClick: onClick },
            displayAvatar && (avatar || avatarContent || avatarIcon) && avatarComponent,
            displayLabel && !richCard && React.createElement(
                'div',
                {
                    title: labelTitle,
                    className: labelClassName,
                    style: labelStyle },
                label
            ),
            labelChevron,
            displayLabel && richCard && React.createElement(CardTitle, { style: { textAlign: 'center' }, title: label, subtitle: userTypeLabel }),
            richCard && user && !noActionsPanel && React.createElement(_ActionsPanel2['default'], _extends({}, this.state, this.props, { reloadAction: reloadAction, onEditAction: onEditAction })),
            richCard && graph && !noActionsPanel && React.createElement(_GraphPanel2['default'], _extends({ graph: graph }, this.props, { userLabel: label, reloadAction: reloadAction, onEditAction: onEditAction })),
            this.props.children,
            popover
        );
    };

    return UserAvatar;
})(React.Component);

UserAvatar.propTypes = {
    /**
     * Id of the user to be loaded
     */
    userId: _propTypes2['default'].string.isRequired,
    /**
     * Pydio instance
     */
    pydio: _propTypes2['default'].instanceOf(Pydio),
    /**
     * Label of the user, if we already have it (otherwise will be loaded)
     */
    userLabel: _propTypes2['default'].string,
    /**
     * Type of user
     */
    userType: _propTypes2['default'].oneOf(['user', 'group', 'remote', 'team']),
    /**
     * Icon to be displayed in avatar
     */
    icon: _propTypes2['default'].string,
    /**
     * Display a rich card or a simple avatar+label chip
     */
    richCard: _propTypes2['default'].bool,
    /**
     * If not rich, display a rich card as popover on mouseover
     */
    richOnHover: _propTypes2['default'].bool,
    /**
     * If not rich, display a rich card as popover on click
     */
    richOnClick: _propTypes2['default'].bool,

    /**
     * Add edit action to the card
     */
    userEditable: _propTypes2['default'].bool,
    /**
     * Triggered after successful edition
     */
    onEditAction: _propTypes2['default'].func,
    /**
     * Triggered after deletion
     */
    onDeleteAction: _propTypes2['default'].func,
    /**
     * Triggered if a reload is required
     */
    reloadAction: _propTypes2['default'].func,

    /**
     * Display label element or not
     */
    displayLabel: _propTypes2['default'].bool,
    /**
     * Display label element or not
     */
    displayLocalLabel: _propTypes2['default'].bool,
    /**
     * Display avatar element or not
     */
    displayAvatar: _propTypes2['default'].bool,
    /**
     * Display only avatar
     */
    avatarOnly: _propTypes2['default'].bool,
    /**
     * Use default avatar
     */
    useDefaultAvatar: _propTypes2['default'].bool,
    /**
     * Avatar size, 40px by default
     */
    avatarSize: _propTypes2['default'].number,
    /**
     * If only the default icon is available, will display
     * the first letters of the name instead
     */
    avatarLetters: _propTypes2['default'].bool,
    /**
     * Do not display ActionsPanel in RichCard mode
     */
    noActionsPanel: _propTypes2['default'].bool,

    /**
     * Add class name to root element
     */
    className: _propTypes2['default'].string,
    /**
     * Add class name to label element
     */
    labelClassName: _propTypes2['default'].string,
    /**
     * Add class name to avatar element
     */
    avatarClassName: _propTypes2['default'].string,
    /**
     * Add style to root element
     */
    style: _propTypes2['default'].object,
    /**
     * Add style to label element
     */
    labelStyle: _propTypes2['default'].object,
    /**
     * Add style to avatar element
     */
    avatarStyle: _propTypes2['default'].object
};

UserAvatar.defaultProps = {
    displayLabel: true,
    displayAvatar: true,
    avatarSize: 40,
    userType: 'user',
    className: 'user-avatar-widget',
    avatarClassName: 'user-avatar',
    labelClassName: 'user-label'
};

exports['default'] = UserAvatar = muiThemeable()(UserAvatar);

exports['default'] = UserAvatar;
module.exports = exports['default'];
