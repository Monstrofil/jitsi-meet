// @flow
/* eslint-disable */

import React, { Component } from 'react';
import { View } from 'react-native';

import { Container } from '../../../base/react';
import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';

import { isToolboxVisible } from '../../functions';
import { HANGUP_BUTTON_SIZE } from '../../constants';

import AudioMuteButton from '../AudioMuteButton';
import HangupButton from '../HangupButton';
import ToggleCameraButton from '../ToggleCameraButton';

import styles from './styles';
import ToggleNextUserButton from '../ToggleNextUserButton';

/**
 * The number of buttons other than {@link HangupButton} to render in
 * {@link Toolbox}.
 *
 * @private
 * @type number
 */
const _BUTTON_COUNT = 4;

/**
 * Factor relating the hangup button and other toolbar buttons.
 *
 * @private
 * @type number
 */
const _BUTTON_SIZE_FACTOR = 0.85;

/**
 * The type of {@link Toolbox}'s React {@code Component} props.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * The indicator which determines whether the toolbox is visible.
     */
    _visible: boolean,

    _chatMode: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * The type of {@link Toolbox}'s React {@code Component} state.
 */
type State = {

    /**
     * The detected width for this component.
     */
    width: number
};

/**
 * Implements the conference toolbox on React Native.
 */
class Toolbox extends Component<Props, State> {
    state = {
        width: 0
    };

    /**
     *  Initializes a new {@code Toolbox} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onLayout = this._onLayout.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Container
                onLayout = { this._onLayout }
                style = { styles.toolbox }
                visible = { this.props._visible }>
                { this._renderToolbar() }
            </Container>
        );
    }

    /**
     * Calculates how large our toolbar buttons can be, given the available
     * width. In the future we might want to have a size threshold, and once
     * it's passed a completely different style could be used, akin to the web.
     *
     * @private
     * @returns {number}
     */
    _calculateButtonSize() {
        const { _styles } = this.props;
        const { width } = this.state;

        if (width <= 0) {
            // We don't know how much space is allocated to the toolbar yet.
            return width;
        }

        const hangupButtonSize = HANGUP_BUTTON_SIZE;
        const { style } = _styles.buttonStyles;
        let buttonSize
            = (width

                    // Account for HangupButton without its margin which is not
                    // included in _BUTTON_COUNT:
                    - hangupButtonSize

                    // Account for the horizontal margins of all buttons:
                    - ((_BUTTON_COUNT + 1) * style.marginHorizontal * 2))
                / _BUTTON_COUNT;

        // Well, don't return a non-positive button size.
        if (buttonSize <= 0) {
            buttonSize = style.width;
        }

        // The button should be at most _BUTTON_SIZE_FACTOR of the hangup
        // button's size.
        buttonSize
            = Math.min(buttonSize, hangupButtonSize * _BUTTON_SIZE_FACTOR);

        // Make sure it's an even number.
        return 2 * Math.round(buttonSize / 2);
    }

    /**
     * Constructs the toggled style of the chat button. This cannot be done by
     * simple style inheritance due to the size calculation done in this
     * component.
     *
     * @param {Object} baseStyle - The base style that was originally
     * calculated.
     * @returns {Object | Array}
     */
    _getChatButtonToggledStyle(baseStyle) {
        const { _styles } = this.props;

        if (Array.isArray(baseStyle.style)) {
            return {
                ...baseStyle,
                style: [
                    ...baseStyle.style,
                    _styles.chatButtonOverride.toggled
                ]
            };
        }

        return {
            ...baseStyle,
            style: [
                baseStyle.style,
                _styles.chatButtonOverride.toggled
            ]
        };
    }

    _onLayout: (Object) => void;

    /**
     * Handles the "on layout" View's event and stores the width as state.
     *
     * @param {Object} event - The "on layout" event object/structure passed
     * by react-native.
     * @private
     * @returns {void}
     */
    _onLayout({ nativeEvent: { layout: { width } } }) {
        this.setState({ width });
    }

    /**
     * Renders the toolbar. In order to avoid a weird visual effect in which the
     * toolbar is (visually) rendered and then visibly changes its size, it is
     * rendered only after we've figured out the width available to the toolbar.
     *
     * @returns {React$Node}
     */
    _renderToolbar() {
        const { _styles, _chatMode } = this.props;
        const buttonSize = this._calculateButtonSize();
        let { buttonStyles, toggledButtonStyles } = _styles;

        if (buttonSize > 0) {
            const extraButtonStyle = {
                borderRadius: buttonSize / 2,
                height: buttonSize,
                width: buttonSize
            };

            // XXX The following width equality checks attempt to minimize
            // unnecessary objects and possibly re-renders.
            if (buttonStyles.style.width !== extraButtonStyle.width) {
                buttonStyles = {
                    ...buttonStyles,
                    style: [ buttonStyles.style, extraButtonStyle ]
                };
            }
            if (toggledButtonStyles.style.width !== extraButtonStyle.width) {
                toggledButtonStyles = {
                    ...toggledButtonStyles,
                    style: [ toggledButtonStyles.style, extraButtonStyle ]
                };
            }
        } else {
            // XXX In order to avoid a weird visual effect in which the toolbar
            // is (visually) rendered and then visibly changes its size, it is
            // rendered only after we've figured out the width available to the
            // toolbar.
            return null;
        }

        return (
            <View
                pointerEvents = 'box-none'
                style = { styles.toolbar }>
<<<<<<< HEAD
                <ToggleCameraButton
=======
                <AudioMuteButton
>>>>>>> d862443c79f3ca169b45df10dfb817f9e66f8c6e
                    styles = { buttonStyles }
                    toggledStyles = { toggledButtonStyles } />
                <HangupButton
                    styles = { _styles.hangupButtonStyles } />
<<<<<<< HEAD
                {_chatMode ? 
                    <ToggleNextUserButton
                        styles = { buttonStyles }
                        toggledStyles = { toggledButtonStyles } /> 
                        :
                    <AudioMuteButton
                        styles = { buttonStyles }
                        toggledStyles = { toggledButtonStyles } />
                }

=======
                <ToggleCameraButton
                    styles = { buttonStyles }
                    toggledStyles = { toggledButtonStyles } />
                <ToggleNextUserButton
                    styles = { buttonStyles }
                    toggledStyles = { toggledButtonStyles } />
>>>>>>> d862443c79f3ca169b45df10dfb817f9e66f8c6e
            </View>
        );
    }
}

/**
 * Maps parts of the redux state to {@link Toolbox} (React {@code Component})
 * props.
 *
 * @param {Object} state - The redux state of which parts are to be mapped to
 * {@code Toolbox} props.
 * @private
 * @returns {{
 *     _styles: StyleType,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state: Object): Object {
    const props = state['features/base/app'].app.props;

    return {
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _visible: isToolboxVisible(state),
        _chatMode: props.chatMode
    };
}

export default connect(_mapStateToProps)(Toolbox);
