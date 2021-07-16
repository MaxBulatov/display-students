import React, { Component } from 'react';
import './default.css'

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            tags: [],
            tag: "",
            show: false
        }
    }

    handleChange = (e) =>{
        this.setState({tag: e.target.value})
    }
    
    submitOnEnter = (e) =>{
        if(this.state.tag == ""){
            return;
        }
        if (e.charCode === 13) {
            this.setState({
                tags: this.state.tags.concat({ id: Math.random(), name: this.state.tag}),
                tag: ""
            })
        }
    }

    search = (nameKey, myArray) =>{
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return true;
            }
        }
        return false;
    }
    render() { 
        return (
        <div>
            <div id="student">
            <img 
                src={this.props.pic} 
                alt=""
            />
            <div id="info">
                <h1>{this.props.fullName}</h1>
                <p>Email: {this.props.email}</p>
                <p>company: {this.props.company}</p>
                <p>Skill: {this.props.skill}</p>
                <p>Average: {this.props.avg} %</p>

                <div id="grades">
                    {this.state.show ? (
                        this.props.grades.map((score, i) => {
                            return(
                                <p>Test {i}: {score}</p>
                            );
                        })
                    )
                    :
                    null}   
                </div>

                <input type="text" placeholder="Add a Tag" 
                    name="tag"
                    value={this.state.tag}
                    onChange={this.handleChange}
                    onKeyPress={this.submitOnEnter}
                ></input>
                {console.log(this.state.tag)}


            <ul>
                {this.state.tags.map((tag) => {
                    return (
                    <span id="tagBox" key={tag.id}>
                        {tag.name + " "}
                    </span>
                    )
                })}
            </ul>
            </div>

            <div id="filler">
                <button onClick={() => this.setState({show: !this.state.show})}>Toggle</button>
            </div>
        </div>
        </div>
        );
    }
}
 
export default Student;