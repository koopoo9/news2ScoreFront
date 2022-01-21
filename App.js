import { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';

import Form from 'react-bootstrap/Form'


class InputScore extends Component{


  render(){

    const changeSelectOptionHandler = (event) => {

      //console.log(event.target.value);

      if(event.target.value=='00'){

        document.getElementById("spo2Scale1Div").style.display="block"; 

        document.getElementById("spo2Scale2Div").style.display="none"; 

      }

      if(event.target.value=='01'){

        document.getElementById("spo2Scale1Div").style.display="none"; 

        document.getElementById("spo2Scale2Div").style.display="block"; 

      }

    };


    const submitJsonToApiServer = async () => {


      let custInfo = 

      {

        custId : document.getElementById("custId").value

        ,respirationRate : document.getElementById("respirationRate").value

        ,spcd : document.getElementById("spcd").value

        ,spo2Scale1 : document.getElementById("spo2Scale1").value

        ,spo2Scale2 : document.getElementById("spo2Scale2").value

        ,airOxy : document.getElementById("airOxy").value

        ,systolicBloodPressure : document.getElementById("systolicBloodPressure").value

        ,pulse : document.getElementById("pulse").value

        ,consciousness : document.getElementById("consciousness").value

        ,temperature : document.getElementById("temperature").value

      }

      ;

      let custInfoJsonString = JSON.stringify(custInfo);

      alert(custInfoJsonString);


      const response = await fetch('http://localhost:8888/cust/', {

        method: 'POST',

        headers:{

            'Content-Type' : 'application/json'  

        },

        body: custInfoJsonString

      });

      const body = await response.json();

      if(body.resultCd='0000'){

        alert('register success');

        alert('Result Score : '+body.resultScore);

        //TO-DO display result score on screen

      }else{

        alert('register fail');

      }

      

      

    };


    return(

      <div>

        <Form>

          <Form.Label>Cust ID</Form.Label>

          <Form.Control type="text" id="custId"></Form.Control>

          <Form.Label>Respiration rate</Form.Label>

          <Form.Control type="text" id="respirationRate"></Form.Control>

          <Form.Label>SpO2 Scale type</Form.Label>

          <Form.Select name ="spcd" id="spcd" onChange={changeSelectOptionHandler}>

              <option value="00">spO1</option>

              <option value="01">spO2</option>

          </Form.Select>

          <div id ="spo2Scale1Div">

            <Form.Label>SpO2 Scalet 1(%)</Form.Label>

            <Form.Control type = "text" id="spo2Scale1"></Form.Control>

          </div>

          <div id ="spo2Scale2Div" style={{display:'none'}}>

          <Form.Label>SpO2 Scalet 2(%):</Form.Label> 

          <Form.Control type = "text" id="spo2Scale2"></Form.Control>

          </div>

          <Form.Label>

          Air or Oxygen

          </Form.Label>

          <Form.Select name ="airOxy" id="airOxy">

              <option value="00">Air</option>

              <option value="01">Oxygen</option>

          </Form.Select>

          <Form.Label>Systolic blood pressure(mmHg)</Form.Label>

          <Form.Control type="text" id="systolicBloodPressure"></Form.Control>

          <Form.Label>Pulse(per minute)</Form.Label>

          <Form.Control type="text" id="pulse"></Form.Control>

          <Form.Label>Consciousness(per minute)</Form.Label>

          <Form.Select name ="consciousness" id="consciousness">

              <option value="00">Alert</option>

              <option value="01">CVPU</option>

          </Form.Select>

          <Form.Label>Temperature('c)</Form.Label>

          <Form.Control type="text" id="temperature"></Form.Control>

          <br></br>

          <Button onClick={submitJsonToApiServer} type="submit">Submit</Button>

        </Form>

      </div>

    )

  }

}


class App extends Component {

  render(){

    return (

      <div className='App'>

        <h1>news 2 score</h1>

        <InputScore></InputScore>

      </div>

    )

  }

}


export default App;