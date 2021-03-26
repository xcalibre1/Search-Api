import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import "./App.css";
import Card from "./MyCard"
export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          offset: 0,
          data: [],
          perPage: 5,
          currentPage: 0,
          recipes:"",
          search:"",
          query:"chicken"
      };
      this.handlePageClick = this
          .handlePageClick
          .bind(this);
  }
  receivedData() {
    const APP_ID = "0633becd";
    const APP_KEY = "0e9a883fb63a5deabdc101beab7a59ca";
    
      axios
          .get(`https://api.edamam.com/search?q=${this.state.query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
          .then(res => {

              const data = res.data.hits;
              
              const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
              const postData = slice.map((pd,index) => <div className="Card-Collection" key={index}>
                  <Card  title={pd.recipe.label} img={pd.recipe.image}  />
                  
              </div>)

              this.setState({
                  pageCount: Math.ceil(data.length / this.state.perPage),
                 
                  postData
              })
          });
  }
  updateSearch = (e) => {
    this.setState({search:e.target.value});
    
  };

  getSearch = (e) => {
    e.preventDefault();
    this.setState({query:this.state.search},function(){
      this.receivedData();
    });

    this.setState({search:""});
    
  };
  handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;

      this.setState({
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.receivedData()
      });

  };

  componentDidMount() {
      this.receivedData()
  }
  
  render() {
      return (
        <>
        <div className="SearchBar">
        <input type="text" className="banner_input" value={this.state.search} onChange={this.updateSearch} />
        <div className="banner_buttons">
          <button className="banner_button" onClick={this.getSearch}>Search</button>
        </div>
        </div>
          <div>
              {this.state.postData}
              <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
          </div>
</>
      )
  }
}
