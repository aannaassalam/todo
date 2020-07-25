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
        db.collection("todo").doc(id).delete();
        this.setState({
            todos: this.state.todos.filter((todo) => (
                todo.id!==id
            ))
        })
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
                                    <p>{todo.data.taskName}</p>
                                    <i className="far fa-trash-alt fa-1x" onClick={()=>{this.handleDelete(todo.id)}} ></i>
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