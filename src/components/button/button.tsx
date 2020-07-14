import * as React from 'react';
let styled = require('./button.style');

interface Props { 
    onClick: () => void;
    text: string;
}

interface State {
    hovered: boolean;
}

export class Button extends React.Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {
            hovered: false,
        }
    }

    mouseEnter = () => {
        this.setState({ hovered: true });
    }
    mouseLeave = () => {
        this.setState({ hovered: false });
    }

    public render() {
        const { onClick, text } = this.props;
        const { hovered } = this.state;

        return (
            <styled.Button
                hovered={hovered}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave} 
                onClick={() => onClick()}>
                {text}
            </styled.Button>
        )
    }
}