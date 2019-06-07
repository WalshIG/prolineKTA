import React, { Component } from 'react';
import { Form, Label, Header, Divider} from 'semantic-ui-react';
import KeyPending from './KeyPending';
import CheckKeyOut from './CheckKeyOut';
import CheckKeyIn from './CheckKeyIn';
import {fetchKeyStatus } from '../../app/fetch/fetches';

class ScanKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableForm: false,
            scannedKey: null,
            keyPending: false,
            keyCheckedIn: true
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePending = this.handlePending.bind(this);
    }

    handleInput(e) {
        if (e.target.value) {
            this.setState({
                scannedKey: e.target.value
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const request = {
            id: this.state.scannedKey
        };
        fetchKeyStatus(request, "POST", (res) => {
            if (res.key_status === 1 && res.key && res.trans) {
                this.setState({
                    keyPending: true,
                    keyCheckedIn: true,
                    disableForm: true,
                    keyRecord: res.key,
                    keyTransaction: res.trans
                });
            } else if (res.key_status === 2 && res.key) {
                this.setState({
                    keyPending: false,
                    keyCheckedIn: true,
                    keyRecord: res.key,
                    disableForm: true
                });
            } else if (res.key_status === 0 && res.key && res.trans) {
                this.setState({
                    keyPending: false,
                    keyCheckedIn: false,
                    disableForm: true,
                    keyRecord: res.key,
                    keyTransaction: res.trans
                });
            }
        });
    }

    handlePending() {
        let request = {
            keyStatus: 1,
            keyId: this.state.scannedKey
        }
        fetchKeyStatus(request, "PUT", (res) => {
            if (res.status === 200) {
                this.setState({
                    disableForm: false,
                    keyPending: true
                });
                return 
            }
        });
    }

    render() {

        let { scannedKey, disableForm, keyPending, keyCheckedIn } = this.state;

        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10%'
        };

        if (!disableForm) {
            return (
                <div style={containerStyle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Header>Check Key Status</Header>
                        <Divider />
                        <Form.Field>
                            <Label pointing='below'>Select and Scan QR Code</Label>
                            <Form.Input id ='keyID' as='input' type='text' onChange={this.handleInput} />
                        </Form.Field>
                        <Divider />
                        <Form.Button content='Submit' />
                    </Form>
                </div>
            );
        } else if (!keyPending && keyCheckedIn) {

            return (
                <div style={{containerStyle}}>
                    <KeyPending isPending={this.handlePending} />
                </div>
            )

        } else if (keyPending && keyCheckedIn) {

            return (
                <div style={{containerStyle}}>
                    <CheckKeyOut key={scannedKey} />
                </div>
            )

        } else if (!keyPending && !keyCheckedIn) {
            
            return (
                <div style={{containerStyle}}>
                    <CheckKeyIn key={scannedKey} />
                </div>
            )
        }
    }
}

export default ScanKey;