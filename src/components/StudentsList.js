import React, { Component } from 'react';
import axios from 'axios';
import Student from './Student';
import './default.css'

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            studentsArray: [],
            searchTerm: "",
            searchTag: "",
            show: false,
        }
        this.studentRef= React.createRef();
    }

    fetchData = () =>{
        const promise = axios.get('https://api.hatchways.io/assessment/students');
        promise
          .then((response) => {
            // Successful response
            console.log('SUCCESS!', response.data.students);
            this.setState({ studentsArray: response.data.students });
          })
          .catch((error) => {
            // Error
            console.log(this.state.hasError);
          });
    }

    componentDidMount() {
        this.fetchData();
    }

    avgCalc = (data) =>{
        let total = 0;
        for(let i = 0; i < data.length; i++){
            total += parseInt(data[i], 10);
        }

        const avg = total/data.length;
        
        return avg;
    }

    displayGrades = (grades) =>{
        for(let i = 0; i < grades.length; i++){

        }
    }

    handleChange = (e) =>{
        this.setState({ searchTerm: e.target.value });
        console.log(this.state.searchTerm);
    }

    render() { 
        return (
            <div id="mainContainer">
                <div id="studentContainer">
                    <input
                        id="sName" 
                        type="text" placeholder="Search by Name" 
                        onChange={event => this.setState({searchTerm: event.target.value})}>
                    </input>

                    <input
                        id="sTag" 
                        type="text" placeholder="Search By Tag" 
                        onChange={event => this.setState({searchTag: event.target.value})}>
                    </input>

                    <ul>
                        {this.state.studentsArray.filter((student) => {
                            let fullname = student.firstName + " " + student.lastName;
                            if(this.state.searchTerm == ""){
                                return student;
                            } else if( fullname.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ){ 
                                return student;
                            } 
                        }).map((student) => {
                            return (
                            <div id="student" key={student.id}>
                                <Student
                                    tag = {this.state.searchTag}
                                    fullName={student.firstName + " " +  student.lastName}
                                    email={student.email}
                                    company={student.company}
                                    skill={student.skill}
                                    avg={this.avgCalc(student.grades)}
                                    pic={student.pic}
                                    grades={student.grades}
                                /> 
                            </div>
                            );
                        })}
                    </ul>
                </div>
                
            </div>
            
        );
    }
}
 
export default StudentList;