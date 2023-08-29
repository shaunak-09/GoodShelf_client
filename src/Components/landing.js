import React,{useState,useEffect} from 'react'
import axios from "axios"
import { server } from '../server'

 function Landing() 
{
    const Card=({data})=>{
        return (
           <div className='h-auto mr-4 w-[15rem] flex flex-col rounded-md  bg-gray-50'>
              <div>
               <img src={data.image} className='w-[100%] h-[8rem] rounded-md '></img>
              </div>
              <div className='py-2 px-2 flex flex-col justify-start items-start text-left '>
                  <p className='py-2 font-semibold text-xl '>{data.productName}</p>
                  <p className='py-2 text-sm'>
                    {data.oneLiner}
                  </p>
                  <p className=' pt-[10px] font-semibold text-lg '>₹{data.price} / <span className=' text-gray-500'>{(data.quantity>=1000)?`${data.quantity/1000} kgs`:`${data.quantity} gms`}</span> </p>
              </div>
           </div>
        )
       }
   const [data1, setData1] = useState([])
   const [data2, setData2] = useState([])
   const [data3, setData3] = useState([])
   useEffect( ()=>{
    async function fetchData() {

    try {
        const response = await axios.get(`${server}/products`);
        const data = response.data;

        const data1 = data.filter(item => item.sectionName === "Value Deals");
        const data2 = data.filter(item => item.sectionName === "Kid Friendly");
        const data3 = data.filter(item => item.sectionName === "Millet Alternatives");

        setData1(data1);
        setData2(data2);
        setData3(data3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
   },[])
  
  
  return (
    <div className=' flex flex-col px-5'>
        <p className=' font-semibold text-xl py-4 text-left px-5'>good<span className=' text-pink-700  '>shelf</span></p>
        <div className=' flex flex-col  py-4  px-5 items-start '>
         <p className=' font-semibold text-2xl'>Value Deals</p>
         <div className='flex py-4  h-[25rem] overflow-x-scroll overflow-y-hidden w-[100%]'>
         {
            data1.map((item,index)=>{
                return(
                    <div key={index+1} >
                        <Card data={item}  />
                    </div>
                    
                )
               
            })
          }
            </div> 
         
        </div>
        <div className=' flex flex-col px-5 py-4 items-start '>
        <p className=' font-semibold text-2xl'>Kid Friendly</p> 
        <div className='flex py-4  h-[25rem] overflow-x-scroll overflow-y-hidden w-[100%]'>
 {
            data2.map((item,index)=>{
                return(
                    <div key={index+1}>
                        <Card data={item}  />
                    </div>
                )            
            })
          }
          </div>
        </div>
        <div className=' flex flex-col px-5 py-4 items-start'>
        <p className=' font-semibold text-2xl'>Millet Alternatives</p> 
        <div className='flex py-4  h-[25rem] overflow-x-scroll overflow-y-hidden w-[100%]' >    {
            data3.map((item,index)=>{
                return(
                    <div key={index+1}>
                    <Card data={item}  />
                </div>
                 )          
              })
          }
          </div>
        </div>
    </div>
  )
}

export default Landing