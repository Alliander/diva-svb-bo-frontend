import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

import { green500 } from 'material-ui/styles/colors';
import IconActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import IconAlertError from 'material-ui/svg-icons/alert/error';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Home extends React.Component {
  state = {
    tablecontents: [],
  };

  buttonColumnStyle = {
    width: '20em'
  };

  download(bsn) {
    axios
      .get(`/api/get-signature/${bsn}`)
      .then(signature => {
        fileDownload(signature.data, 'signature.irma');
      });
  }

  reply(row, status) {
    row.processed = true;
    row.status = status ? "confirmed" : "declined"

    const reply = {
      company: "SVB",
      reference: row.bsn,
      status: row.status,
    };
    axios
      .post("/api/huishoudboekje/incheck/update", reply)
      .then(ret => console.log(ret));

    this.setState({
      tablecontents: this.state.tablecontents,
    });
  }

  renderRow(row, index) {
    return (
      <TableRow key={index} selectable={false}>
        <TableRowColumn>{row.initials}</TableRowColumn>
        <TableRowColumn>{row.name}</TableRowColumn>
        <TableRowColumn>{row.bsn}</TableRowColumn>
        <TableRowColumn style={this.buttonColumnStyle}>
          <RaisedButton label="Accepteren" disabled={row.processed} primary={true} onClick={() => this.reply(row, true)} />
          <RaisedButton label="Weigeren" disabled={row.processed} secondary={true} onClick={() => this.reply(row, false)} style={{marginLeft: "20px"}} />
        </TableRowColumn>
        <TableRowColumn>{row.valid ? <IconActionCheckCircle color={green500}/> : <IconAlertError/>}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton label="Download" primary={true} onClick={() => this.download(row.bsn)} />
        </TableRowColumn>
      </TableRow>
    );
  }

  componentDidMount() {
    axios
      .get('/api/get-participants')
      .then(response => {
        this.setState({tablecontents: response.data});
      });
  }

  render() {
    const { tablecontents } = this.state;

    return (
      <div style={{ padding: '20px' }}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Initialen</TableHeaderColumn>
              <TableHeaderColumn>Naam</TableHeaderColumn>
              <TableHeaderColumn>BSN</TableHeaderColumn>
              <TableHeaderColumn style={this.buttonColumnStyle}>Acties</TableHeaderColumn>
              <TableHeaderColumn>Handtekening geldig</TableHeaderColumn>
              <TableHeaderColumn>Download</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tablecontents.map(this.renderRow.bind(this))}
          </TableBody>
        </Table>
      </div>
    );
  }
}