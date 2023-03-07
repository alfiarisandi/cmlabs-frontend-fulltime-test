import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';


function Home() {
  const [ingredients, setIngredients] = useState()
  const [searchIngredients, setSearchIngredients] = useState("")
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://www.themealdb.com/api/json/v1/1/list.php', {
      params: {
          i : 'list'
      }
    })
      .then(response => {
        setIngredients(response.data.meals)
      })
      .catch(error => {
        // handle error
      });
    },[])

  return (
    <>
        <div>

          <div className='px-3 header'>

            {/* Header */}
            <div className='container d-flex flex-row mt-5 breadcrumb'>       
                  <span className='fw-semibold' onClick={() => navigate('/')}>Home</span>
            </div>

            <div className='container'>
              <h3 className='text-center fw-bold mt-2'>List of Ingredients</h3>
            </div>

            {/* Search Ingredients */}
            <div className='container mt-3 mb-5 position-relative search'>
              <div className='d-flex flex-row align-items-center justify-content-center'>
                <Icon icon="material-symbols:search-rounded" width="35"/>
                <input type="text" className='ms-3' placeholder='Search Ingredients' value={searchIngredients} onChange={(e) => setSearchIngredients(e.target.value)}/>
                <Icon icon="ph:x-bold" width="20" className='delete-search' onClick={() => setSearchIngredients("")}/>
              </div>
            </div>

          </div>

          {/* Content */}
          {
              <>    
                <div className='container d-flex flex-row mt-5 gap-3 content'>
                  
                  {
                    ingredients?.filter(v => v.strIngredient.toLowerCase().includes(searchIngredients.toLowerCase())).slice(0,16).map((item) => {
                      return(
                        <>
                        <div className='card-ingredients' key={item.idIngredient} onClick={() => navigate('/meals/'+item.strIngredient)}>
                          <img src={"https://themealdb.com/images/ingredients/"+item.strIngredient+".png"} alt={item.strIngredient} />
                          <div className='overlay-img'></div>
                          <span className='position-absolute top-50 start-50 translate-middle fw-bold fs-4 text-white text-center'>{item.strIngredient}</span>
                        </div>
                        </>
                      )
                    })
                  }
                  {
                    ingredients?.filter(v => v.strIngredient.toLowerCase().includes(searchIngredients.toLowerCase())).length === 0 && (
                      <>
                        <h4 className='fw-bold'>no search results</h4>
                      </>
                    )
                  }
                      
                </div>
                <div className=' d-flex justify-content-center mt-5 mb-5'>
                    <span className='fs-4'>And <span className='fw-bold'>{ingredients?.length}</span> More Ingredients that can be searched</span>
                </div>
              </>
          }

        </div>
    </>
  )
}

export default Home