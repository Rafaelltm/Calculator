import React, { Component } from 'react';

import './Calculator.css';
import Display from '../components/display/Display';
import Button from '../components/button/Button';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

export default class Calculator extends Component {

    state = {...initialState};

    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({...initialState});
        console.log('clear');
    }

    setOperation(op) {
        let current = this.state.current;

        if(op !== '=') {
            this.setState({ operation: op, current: ++current, clearDisplay: true });
        } else {
            let resultado;
            let values = this.state.values.slice();
            let operation = this.state.operation;

            switch(operation) {
                case '/':
                    resultado = parseFloat(values[0]) / parseFloat(values[1]);
                    break;
                case '*':
                    resultado = parseFloat(values[0]) * parseFloat(values[1]);
                    break;
                case '+':
                    resultado = parseFloat(values[0]) + parseFloat(values[1]);
                    break;
                case '-':
                    resultado = parseFloat(values[0]) - parseFloat(values[1]);
                    break;
                default:
                    alert('Algum erro ocorreu, por favor recarregue a página');
            }
            
            values = [resultado, 0];
            this.setState({ values: values, current: 0, displayValue: resultado, clearDisplay: true });
        }
    }

    addDigit(n) {
        if(n === ',' && this.state.displayValue.includes(',')){
            return;
        }

        const values = this.state.values.slice();
        const current = this.state.current;

        const clearDisplay = this.state.displayValue === '0' ||
            this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const newValue = currentValue + n;
        values[this.state.current] = newValue;

        this.setState({ values: values, displayValue: values[current], clearDisplay: false });
    }

    render() {
        return (
            <React.Fragment>
                <p className='title'>Calculadora</p>
                <div className='calculator'>
                    <Display value={this.state.displayValue} />
                    <Button type='button ac' label='ac' click={this.clearMemory} />
                    <Button type='button operation' label='/' click={this.setOperation} />
                    <Button type='button number' label='7' click={this.addDigit} />
                    <Button type='button number' label='8' click={this.addDigit} />
                    <Button type='button number' label='9' click={this.addDigit} />
                    <Button type='button operation' label='*' click={this.setOperation} />
                    <Button type='button number' label='4' click={this.addDigit} />
                    <Button type='button number' label='5' click={this.addDigit} />
                    <Button type='button number' label='6' click={this.addDigit} />
                    <Button type='button operation' label='+' click={this.setOperation} />
                    <Button type='button number' label='1' click={this.addDigit} />
                    <Button type='button number' label='2' click={this.addDigit} />
                    <Button type='button number' label='3' click={this.addDigit} />
                    <Button type='button operation' label='-' click={this.setOperation} />
                    <Button type='button number zero' label='0' click={this.addDigit} />
                    <Button type='button number' label=',' click={this.addDigit} />
                    <Button type='button operation' label='=' click={this.setOperation} />
                </div>
        </React.Fragment>
        );
    }
}