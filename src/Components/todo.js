import React from 'react';
import db from '../firebase';
import './CSS/todo.css';
import AddTodo from './addTodo'

export default class Todo extends React.Component{

    state = {
        todos: []
    }

    componentDidMount(){
        db.collection("todo").get().then((snap)=>{
            snap.forEach((doc)=>{
                var obj ={};
                obj['id'] = doc.id;
                obj['data'] = doc.data();
                this.setState({
                    todos: [...this.state.todos, obj]
                })
            })
        })
        
    }

    dayConverter = () =>{
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[new Date().getDay()];
        return(day);
    }

    date = () => {
        const months = ['Januaury', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();
        return(months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()); 
    }

    handleDelete = (id) => {
        if(window.confirm("Are you sure ???")){
            db.collection("todo").doc(id).delete();
            this.setState({
                todos: this.state.todos.filter((todo) => (
                    todo.id!==id
                ))
            })
        }
    }

    handleClick = (item) => {
        db.collection("todo").add({
            taskName: item
        })

        db.collection("todo").get().then((snap)=>{
            snap.forEach((doc)=>{
                if(doc.data().taskName===item){
                    var obj = {};
                    obj['id'] = doc.id;
                    obj['data'] = doc.data();
                    this.setState({
                        todos: [...this.state.todos, obj]
                    })
                }
            })
        }
    )}

    editClick = () => {
        document.getElementsByClassName('text')[0].removeAttribute('disabled');
        document.getElementsByClassName('text')[0].focus();
        document.getElementsByClassName('post')[0].classList.add('fix');
        document.getElementsByClassName('fa-check')[0].style.display = 'inline-block';
        document.getElementsByClassName('fa-pencil')[0].style.display = 'none';
    }

    doneClick = (id) => {
        document.getElementsByClassName('text')[0].setAttribute('disabled', 'disabled');
        document.getElementsByClassName('text')[0].blur();
        document.getElementsByClassName('post')[0].classList.remove('fix');
        document.getElementsByClassName('fa-check')[0].style.display = 'none';
        document.getElementsByClassName('fa-pencil')[0].style.display = 'inline-block';
        var editText = document.getElementsByClassName('text')[0].value;
        
        if(editText!==''){
            this.state.todos.forEach((todo) => {
                if(todo.id===id){
                    todo.data.taskName = editText;
                    this.setState({
                        todo: [...this.state.todos]
                    })
                }
            })
        }

        db.collection("todo").get().then((snap)=>{
            snap.forEach((doc)=>{
                var obj ={};
                obj['id'] = doc.id;
                obj['data'] = doc.data();
                this.setState({
                    todos: [...this.state.todos, obj]
                })
            })
        })
    }

    render(){
        return(
            <div className="container">
                <header>
                    <h1 className="date-head">
                        {this.dayConverter()}
                    </h1>
                    <p className="date">
                        {this.date()}
                    </p>
                </header>
                <section>
                    <div className="list">
                        {
                            this.state.todos.map((todo) => (
                                <div className="post" key={todo.id}>
                                    <input type="text" className="text" value={todo.data.taskName} disabled/>
                                    <div className="actions">
                                        <i className="fa fa-pencil fa-1x" onClick={this.editClick} ></i>
                                        <i className="fa fa-check fa-1x" onClick={() => this.doneClick(todo.id)}></i>
                                        <i className="far fa-trash-alt fa-1x" onClick={()=>{this.handleDelete(todo.id)}} ></i>
                                    </div>
                                </div>
                            ))
                        }
                        <AddTodo handleClick={(item) => this.handleClick(item)} />
                    </div>
                </section>
            </div>
        )
    }
}