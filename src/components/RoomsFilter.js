import React, { useContext } from 'react'
import { RoomContext } from '../context'
import Title from '../components/Title'

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter() {
  const context = useContext(RoomContext)
  let {
    rooms, handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast,pets
  } = context

    let types = getUnique(rooms, 'type')
    types = ['all', ...types]

    types = types.map((item, index)=>{
      return <option value={item} key={index}>{item}</option>
    })

    let people = getUnique(rooms, 'capacity')

    people = people.map((item, index)=>{
      return <option value={item} key={index}>{item}</option>
    })

    return (
      <section className='filter-container'>
        <Title title='search rooms' />
        <form className='filter-form'>
          {/* select type */}
          <div className='form-group'>
            <label htmlFor='type'>room type</label>
            <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
              {types}
            </select>
          </div>
          {/* select guests */}
          <div className='form-group'>
            <label htmlFor='capacity'>Guests</label>
            <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
              {people}
            </select>
          </div>
          {/* room price */}
          {/* select guests */}
          <div className='form-group'>
            <label htmlFor='price'>Room Price ${price}</label>
            <input name='price' type='range' id='price' value={price} min={minPrice} max={maxPrice} className='form-control' onChange={handleChange} />
          </div>
          {/* size */}
          <div className='form-group'>
            <label htmlFor='size'>Room Size</label>
            <input name='minSize' type='number' id='size' value={minSize} className='size-input' onChange={handleChange} />
            <input name='maxSize' type='number' id='size' value={maxSize} className='size-input' onChange={handleChange} />
          </div>
          {/* extras */}
          <div className='form-group'>
            <label htmlFor='size'>Extras</label>
            <div className='single-extra'>
              <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange}/>
                <label htmlFor='breakfast'>breakfast</label>
            </div>
            <div className='single-extra'>
              <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange}/>
                <label htmlFor='pets'>pets</label>
            </div>
          </div>

        </form>
      </section>
  )
}
