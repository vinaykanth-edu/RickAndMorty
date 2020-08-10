import React, {Component} from 'react';
import axios from 'axios';
import Pagination from './Pagination';

class MainComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            episodes: [],
            pages: 0,
            search: ""
        }
    }

    componentDidMount(){
        // console.log("component did Mount")
        axios.get("https://rickandmortyapi.com/api/episode/")
            .then((res) => res.data)
            .then((res) => {
                this.setState({
                    episodes: res.results,
                    pages: res.info.pages
                })
            })
            .catch((error) => console.log(error))
    }

    handleClick = (ele) => {
        axios.get(`https://rickandmortyapi.com/api/episode/?page=${ele}`)
            .then((res) => res.data)
            .then((res) => {
                this.setState({
                    episodes: res.results,
                    pages: res.info.pages
                })
            })
            .catch((error) => console.log(error))
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    filterEpisodes = () => {
        axios.get(`https://rickandmortyapi.com/api/episode/?name=${this.state.search}`)
            .then((res) => res.data)
            .then((res) => {
                this.setState({
                    episodes : res.results,
                    pages: res.info.pages
                })
            })
            .catch((error) => alert("Invalid Episode name, Please type again!"))
        
        this.reset();
    }

    reset = () => {
        this.setState({
            search:""
        })
    }

    render(){
        return(
            <>
                <div className="container">
                    <h1>All Episodes</h1>
                    <div className="container">
                            
                            <div className="input-group mb-3">
                                <input type="text"  class="form-control"   placeholder="Enter the name of episode" aria-label="Search"  onChange = {this.handleChange}
                                            value = {this.state.search}aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit" onClick = {() => this.filterEpisodes()} id="button-addon2">Search</button>
                                </div>
                            </div>
                    </div>
                    <div className="container">
                    <Pagination 
                                pages={this.state.pages}
                                handleClick={(ele) => this.handleClick(ele)}
                            />
                    </div>
                    <div className="container ">
                        <div className="row">
                            {this.state.episodes.length !== 0 && this.state.episodes.map((ele) => (
                                <div className="offset-2 col-3">
                                    <div className="card border border-secondary my-2" style={{width: '18rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title ">Episode Name: {ele.name}</h5>
                                        <p className="card-text">Date: {ele.air_date}</p>
                                        <p className="card-text">Episode number: {ele.episode}</p>
                                    </div>
                                </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    <div>
                            <Pagination 
                                pages={this.state.pages}
                                handleClick={(ele) => this.handleClick(ele)}
                            />
                        </div>
                    
                </div>
            </>
        )
    }
}

export default MainComponent;