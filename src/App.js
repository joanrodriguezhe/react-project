import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

//function App() {
class App extends Component {
    state = {
        persons: [
            { id: 'asdads', name: 'José', age: 25 },
            { id: 'asdasds', name: 'Carla', age: 25 },
            { id: 'gththt', name: 'Ramón', age: 29 },
            { id: '56egf4', name: 'Mario', age: 26 },
            { id: '5tyhgfs', name: 'Luigi', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        }

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({ persons: persons });
    }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    //ADD render (){return JSX};
    render() {
        let persons = null;
        let btnClass = '';

        if (this.state.showPersons) {
            persons = (
                <div >
                    {this.state.persons.map((person, index) => {
                        return <ErrorBoundary key={person.id}>
                            <Person
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}
                                changed={(event) => this.nameChangedHandler(event, person.id)} />
                        </ErrorBoundary>
                    })}

                </div>
            );
            btnClass = classes.Red;
        }

        const assignedClasses = [];
        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }


        return (
            <div className={classes.App} >
                <h1 > Hi, I 'm a React App</h1>
                <p className={assignedClasses.join(' ')}>This is really working! </p>
                <button className={btnClass} onClick={this.togglePersonHandler}>
                    Toggle Persons
                </button>

                {persons}
            </div>
        );
    };
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi I\'m a React App!!!'));
};

export default App;


