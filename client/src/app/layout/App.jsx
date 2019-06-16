import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import RecordDashboard from '../../features/record/RecordDashboard';
import ReportDashboard from '../../features/report/ReportDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import AddProperty from '../../features/property/AddProperty';
import AddKey from '../../features/key/AddKey';
import Testing from '../../features/testing/Testing';
import ScanKey from '../../features/key/ScanKey';
import EditKey from '../../features/key/EditKey';
import EditProperty from '../../features/property/EditPropety';
import PrintQRCode from '../../features/key/PrintQRCode';

const KeyRecordDashBoard = (props) => {
  return (
    <RecordDashboard tableType="keys" {...props} />
  )
}

const PropertyRecordDashBoard = (props) => {
  return (
    <RecordDashboard tableType="properties" {...props} />
  )
}

const PeopleRecordDashboard = (props) => {
  return (
    <RecordDashboard tableType="people" {...props} />
  )
}

const KeyReportDashboard = (props) => {
  return (
    <ReportDashboard tableType="keys" {...props} />
  )
}

const BuildingReportDashboard = (props) => {
  return (

    <ReportDashboard tableType="properties" {...props} />
  )
}

class App extends Component {
  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/keys" render={KeyRecordDashBoard} />
                  <Route path="/properties" render={PropertyRecordDashBoard} />
                  <Route path="/people" render={PeopleRecordDashboard} />
                  <Route path="/keyreports" render={KeyReportDashboard} />
                  <Route path="/buildingreports" render={BuildingReportDashboard} />
                  <Route path="/createkey" component={AddKey} />
                  <Route path="/createproperty" component={AddProperty} />
                  <Route path="/scankey" component={ScanKey} />
                  <Route path="/editkey" component={EditKey} />
                  <Route path="/editproperty" component={EditProperty} />
                  <Route path="/testing" component={PrintQRCode} />

                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
