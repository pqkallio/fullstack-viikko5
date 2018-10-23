import React, { Component } from 'react';

class Togglable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }
        
        if (this.props.type === 'button') {
            return (
                <div className={this.props.className}>
                    <div style={hideWhenVisible}>
                        <button onClick={this.toggleVisibility}>
                            {this.props.toggleLabel}
                        </button>
                    </div>
                    <div style={showWhenVisible}>
                        {this.props.children}
                        <button onClick={this.toggleVisibility}>
                            {this.props.untoggleLabel}
                        </button>
                    </div>
                </div>
            );
        } else if (this.props.type === 'div') {
            return (
                <div className={this.props.className}>
                    <div onClick={this.toggleVisibility}>
                        {this.props.toggleLabel}
                    </div>
                    <div style={showWhenVisible}>
                        {this.props.children}
                    </div>
                </div>
            )
        }

        return null
    }
}

export default Togglable;