import * as React from 'react';
let styled = require('./input.style');

interface Props { 
    onChange: (e: any) => void;
}


interface State { 

}

export class StyledInput extends React.Component<Props,State> {

    constructor(props: Props) {

        super(props);

        this.state = { 

        }
    }

    public render() {
        const { onChange } = this.props;

        return (
            <styled.Input onChange={onChange} type='text' placeholder={'Choose a Unit..'}/>
        )
    }
}