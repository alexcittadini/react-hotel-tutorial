import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }
  static contextType = RoomContext
  render(){
    const { getRoom } = this.context
    const room = getRoom(this.state.slug)
    if(!room) return (
      <div className='error'>
        <h3>No room found...</h3>
        <Link to ='/rooms' className='btn-primary'>
          Back To Rooms
        </Link>
      </div>
    )
    const {name, description, capacity, size, price, extras, breakfast, pets, images} = room

    return (
    <>
    <StyledHero img={images[0] || this.state.defaultBcg}>
      <Banner title={`${name} room`}>
        <Link to='/rooms' className='btn-primary' >
            back to rooms
        </Link>
      </Banner>
    </StyledHero>
    <section className='single-room'>
      <div className='single-room-images'>
        {images.map((item,index)=>
          <img key={index} src={item} alt={name} />
        )}
      </div>
      <div className='single-room-info'>
        <article className='desc'>
          <h3>Details</h3>
          <p>{description}</p>
        </article>
        <article className='info'>
          <h3>information</h3>
          <h6>price: ${price}</h6>
          <h6>size: {size}sqft</h6>
          <h6>max capacity: {capacity > 1 ? `${capacity} people` : `1 person` }</h6>
          <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
          <h6>{breakfast && "breakfast included"}</h6>
        </article>
      </div>
    </section>
    <section className="room-extras">
      <h6>extras</h6>
      <ul className='extras'>
        {extras.map((item,index)=>{
          return <li key={index}>{item}</li>
        })}
      </ul>
    </section>
    </>
  )
}
}
