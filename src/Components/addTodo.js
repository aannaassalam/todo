import React from 'react';
import './CSS/addTodo.css'

export default class AddTodo extends React.Component{

    state = {
        taskName: ''
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
        if(value===''){
            document.getElementById('butn').classList.add('dis');
        }
        else{
            document.getElementById('butn').classList.remove('dis');
        }
    }

    handleSubmit = (item) => {
        if(document.getElementById('task').value===''){
            document.getElementById('butn').setAttribute('disabled', 'disabled');
        }
        else{
            document.getElementById('butn').classList.add('dis');
            this.props.handleClick(item);
            document.getElementById('task').value = '';
        }
    }

    render(){
        return(
            <div className="text-input">
                <input type="text" name="taskName" id="task" placeholder='Any new task???' onChange={this.handleChange} />
                <button id='butn' className='dis' type="submit" onClick={() => this.handleSubmit(this.state.taskName)} >Set</button>
            </div>
        )
    }
}