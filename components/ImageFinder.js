import React, { Component } from 'react'
import axios from 'axios'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class ImageFinder extends Component {
  render() {
    return(
      <img src={this.state.image}/>
    )
  }
  constructor(props) {
    super(props)

    this.state = {
      image: ""
    }
  }

  componentDidMount() {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')
      .then(response => {
        const imageID = response.data.objectIDs[getRandomInt(response.data.total)]
        axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+ imageID)
          .then(response => {
            this.setState({
              image: response.data.primaryImageSmall
            })
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default ImageFinder
