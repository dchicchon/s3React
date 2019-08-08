import React, { Component } from 'react';
import './App.css';
import API from './utils/API'
// import Axios from 'axios';
import axios from 'axios'

class App extends Component {
  state = {
    image: ''
  }

  onChange(e) {
    let files = e.target.files;
    // console.warn("data file", files)
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);

    // reader.onload = (e) => {
    //   console.warn("img data", e.target.result)
    // }
    const imgObj = {}
    let imgFormObj = new FormData();
    imgFormObj.append("imageName", "multer-image-" + Date.now())
    imgFormObj.append("imageData", e.target.files[0]);

    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    })
    axios.post(`/api/image`, imgFormObj)
      .then((data) => {
        if (data.data.success) {
          alert("IMAGE HAS BEEN SUCCESSFULLY UPLOADED")
        }
      })


    

    // const formData = {
    //   file: e.target.result
    // }
    // console.log(formData)
    // API.uploadPhoto(e.target.result).then(res => console.log(res))
    // return post("/api/image", formData)
    //   .then(res => console.warn("result", res))
  }

  render() {
    return (
      <div onSubmit={this.onFormSubmit}>
        <h1>React.js File Upload Tutorial</h1>
        <input type="file" name="file" onChange={(e) => this.onChange(e)} />
      </div>
    )
  }
}
// function App() {
//   return (

//   );
// }

export default App;
