import React, {Component} from 'react';
import TechItem from './TechItem';
class TechList extends Component {
  static defaultProps ={
    tech: 'Teste Classe'
  };
  state = {
    newTech:'',
    techs: [],
  }
  //Asim que o componente aparece em tela
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs){
      this.setState({techs: JSON.parse(techs)});
    }

  }

  //Sempre que houver alterações nas props ou estado
  componentDidUpdate(_, prevState){
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }


  }


  //Executado quando o componente deixa de existir
  componentWillUnmount(){}

  handleInputChange = e =>{
    this.setState({newTech: e.target.value});

  }

  handleSubmit = e => {

    e.preventDefault();
    console.log(this.state.newTech);

    // o estado é imutavel, esse código cria um novo estado copiando o estado anterior e adicionando ou removendo informações.
    this.setState({ techs:[... this.state.techs, this.state.newTech],
      newTech:'',
    });

  }


  handleDelete =  (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech)
     
    });


  }
  render(){


    return (
      <form onSubmit ={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech=><TechItem key={tech} tech={tech} onDelete={()=>this.handleDelete(tech)}/>)}
          
        </ul>
        <input 
            type="text"
            onChange={this.handleInputChange} 
            value={this.state.newTech}
            />
            <button type="submit">enviar</button>
      </form>
    );

  }


}


export default TechList;