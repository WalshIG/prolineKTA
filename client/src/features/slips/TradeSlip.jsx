import React from "react";
import {
  Grid,
  Segment,
  Radio,
  Checkbox,
  Label,
  Input,
  Button,
  Form,
  Divider,
  Header
} from "semantic-ui-react";
import ReactToPrint from "react-to-print";

class TradeSlip extends React.Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10%"
    };

    return (
      <div style={{ containerStyle }}>
        <Divider />
        <Grid columns={1}>
          <Grid.Row stretched>
            <Grid.Column />
            <Grid.Column>
              <Segment>
                <Form>
                  <Header textAlign="center">Trade</Header>
                  <Divider />

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" />
                  </Form.Field>

                  <Form.Field>
                    <label>Company</label>
                    <input type="text" id="company" />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Booked</label>
                        <input type="date" id="bookedOut" />
                      </div>
                      <div class="field">
                        <label>Due Date</label>
                        <input type="date" id="dueDate" />
                      </div>
                    </div>
                  </Form.Field>

                  <Divider />
                  <Header textAlign="center">
                    Please return to:
                    <br />
                    PROLINE MANAGEMENT LTD.
                    <br />
                    201 - 20 Burnside Road West, Victoria BC V9A 1B3
                    <Divider horizontal>
                      <i class="cut icon" />
                    </Divider>
                  </Header>
                  <Divider />

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" />
                  </Form.Field>

                  <Form.Field>
                    <label>Set</label>
                    <input id="setNumber" />
                  </Form.Field>

                  <Form.Field>
                    <label>Description</label>
                    <input type="number" id="description" />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName" />
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Company</label>
                    <input type="text" id="company" />
                  </Form.Field>

                  <Form.Field>
                    <label>Signature</label>
                    <input style={{ minHeight: "5em" }} disabled />
                  </Form.Field>

                  <Form.Field>
                    <label>Phone Number</label>
                    <input type="text" id="phone" />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <Checkbox
                          radio
                          label="To Return"
                          name="checkboxRadioGroup"
                          value="return"
                          checked={this.state.value === "return"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <Checkbox
                          radio
                          label="To Keep (No Charge)"
                          name="checkboxRadioGroup"
                          value="keep"
                          checked={this.state.value === "keep"}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Out</label>
                        <input type="date" id="dateOut" />
                      </div>
                      <div class="field">
                        <label>Date Due</label>
                        <input type="date" id="dueDate" />
                      </div>
                    </div>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const PrintSlip = () => {
  const slipRef = React.useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button color="purple">Print Slip</Button>}
        content={() => slipRef.current}
      />
      <TradeSlip style={{ marginLeft: "10px" }} ref={slipRef} />
    </div>
  );
};

export default PrintSlip;