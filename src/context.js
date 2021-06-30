import React, {Component} from 'react'
// import items from './data'
import Client from './contentful'

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state={
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  componentDidMount(){
    this.getData()
  }

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: 'resortTutorial',
        order: '-fields.price'
      })
      console.log(response);
      const rooms = this.formatData(response.items)
      const featuredRooms = rooms.filter(room=> room.featured === true)
      const sortedRooms = rooms
      const maxPrice = Math.max(...rooms.map(item=>item.price))
      const maxSize = Math.max(...rooms.map(item=>item.size))
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms,
        loading: false,
        maxPrice,
        maxSize,
        price: maxPrice
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  formatData(items){
    const tempItems = items.map(item => {
      const id = item.sys.id
      const images = item.fields.images.map(image => image.fields.file.url)
      const room = { ...item.fields, images, id }
      return room
  })
  return tempItems
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms]
    const room = tempRooms.find((ro)=>ro.slug ===slug)
    return room
  }

  handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({[name]: value}, this.filterRooms)

  }

  filterRooms = () => {
    let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state
    let tempRooms = [...rooms]

    if(type !== 'all'){
      tempRooms = tempRooms.filter((room)=> room.type === type)
    }

    capacity = parseInt(capacity)
    if(capacity !== 1){
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    price = parseInt(price)
    tempRooms = tempRooms.filter(room => room.price <= price)
    tempRooms = tempRooms.filter(room => room.size <= maxSize && room.size >= minSize)

    if(breakfast) tempRooms = tempRooms.filter(room => room.breakfast === true)
    if(pets) tempRooms = tempRooms.filter(room => room.pets === true)

    this.setState({sortedRooms: tempRooms})
  }

  render(){
    return(
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }} >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props) {
        return(
          <RoomConsumer>
            {value=> <Component {...props} context={value} />}
          </RoomConsumer>
        )
    }
  }

export {RoomProvider, RoomConsumer , RoomContext};
